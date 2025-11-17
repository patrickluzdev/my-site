import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Limpar dados existentes
  console.log('🧹 Cleaning existing data...')
  await prisma.commentLike.deleteMany()
  await prisma.postLike.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.postCategory.deleteMany()
  await prisma.projectImage.deleteMany()
  await prisma.projectTechnology.deleteMany()
  await prisma.client.deleteMany()
  await prisma.project.deleteMany()
  await prisma.projectCategory.deleteMany()
  await prisma.technology.deleteMany()
  await prisma.socialAccount.deleteMany()
  await prisma.user.deleteMany()
  await prisma.contactMessage.deleteMany()
  await prisma.newsletterSubscription.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.workExperience.deleteMany()
  await prisma.education.deleteMany()
  await prisma.siteSetting.deleteMany()

  // ============================================================================
  // USUÁRIOS
  // ============================================================================
  console.log('👤 Creating users...')
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Patrick Luz',
        email: 'patrick@example.com',
        passwordHash: faker.internet.password(),
        avatarUrl: faker.image.avatar(),
        bio: 'Desenvolvedor Full Stack apaixonado por criar soluções inovadoras',
        role: 'admin',
        isActive: true,
        emailVerifiedAt: new Date(),
      },
    }),
    ...Array.from({ length: 5 }, () =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          avatarUrl: faker.image.avatar(),
          bio: faker.person.bio(),
          role: faker.helpers.arrayElement(['user', 'editor']),
          isActive: faker.datatype.boolean(),
          emailVerifiedAt: faker.date.past(),
        },
      })
    ),
  ])

  // ============================================================================
  // SOCIAL ACCOUNTS
  // ============================================================================
  console.log('🔗 Creating social accounts...')
  const providers = ['google', 'github', 'linkedin']
  for (const user of users.slice(0, 3)) {
    await prisma.socialAccount.create({
      data: {
        userId: user.id,
        provider: faker.helpers.arrayElement(providers),
        providerUserId: faker.string.uuid(),
        providerEmail: user.email,
        accessToken: faker.string.alphanumeric(64),
        refreshToken: faker.string.alphanumeric(64),
        expiresAt: faker.date.future(),
      },
    })
  }

  // ============================================================================
  // POST CATEGORIES
  // ============================================================================
  console.log('📁 Creating post categories...')
  const postCategories = await Promise.all([
    prisma.postCategory.create({
      data: {
        name: 'Anúncios',
        slug: 'anuncios',
        description: 'Novidades e anúncios importantes',
        color: '#3B82F6',
        icon: 'megaphone',
        displayOrder: 1,
      },
    }),
    prisma.postCategory.create({
      data: {
        name: 'Discussão geral',
        slug: 'discussao-geral',
        description: 'Conversas sobre desenvolvimento e tecnologia',
        color: '#8B5CF6',
        icon: 'message-circle',
        displayOrder: 2,
      },
    }),
    prisma.postCategory.create({
      data: {
        name: 'Tutoriais',
        slug: 'tutoriais',
        description: 'Guias e tutoriais práticos',
        color: '#10B981',
        icon: 'book-open',
        displayOrder: 3,
      },
    }),
    prisma.postCategory.create({
      data: {
        name: 'Projetos',
        slug: 'projetos',
        description: 'Showcase de projetos interessantes',
        color: '#F59E0B',
        icon: 'folder',
        displayOrder: 4,
      },
    }),
    prisma.postCategory.create({
      data: {
        name: 'Dicas',
        slug: 'dicas',
        description: 'Dicas rápidas e úteis',
        color: '#EC4899',
        icon: 'lightbulb',
        displayOrder: 5,
      },
    }),
  ])

  // ============================================================================
  // POSTS
  // ============================================================================
  console.log('📝 Creating posts...')
  const posts = await Promise.all(
    Array.from({ length: 20 }, (_, i) => {
      const isPublished = faker.datatype.boolean()
      return prisma.post.create({
        data: {
          authorId: faker.helpers.arrayElement(users).id,
          categoryId: faker.helpers.arrayElement(postCategories).id,
          title: faker.lorem.sentence(),
          slug: faker.helpers.slugify(faker.lorem.words(3)) + `-${i}`,
          description: faker.lorem.paragraph(),
          content: faker.lorem.paragraphs(5, '\n\n'),
          thumbnailUrl: faker.image.url(),
          badge: faker.helpers.maybe(() => faker.helpers.arrayElement(['Novo', 'Atualizado', 'Popular'])),
          isPinned: i < 2,
          isPublished,
          viewsCount: faker.number.int({ min: 0, max: 1000 }),
          likesCount: faker.number.int({ min: 0, max: 100 }),
          commentsCount: 0, // Será atualizado depois
          publishedAt: isPublished ? faker.date.past() : null,
        },
      })
    })
  )

  // ============================================================================
  // COMMENTS
  // ============================================================================
  console.log('💬 Creating comments...')
  const comments = []
  for (const post of posts.slice(0, 10)) {
    const numComments = faker.number.int({ min: 1, max: 5 })
    for (let i = 0; i < numComments; i++) {
      const comment = await prisma.comment.create({
        data: {
          postId: post.id,
          userId: faker.helpers.arrayElement(users).id,
          content: faker.lorem.paragraph(),
          isApproved: faker.datatype.boolean(),
          likesCount: faker.number.int({ min: 0, max: 50 }),
        },
      })
      comments.push(comment)

      // Criar algumas respostas
      if (faker.datatype.boolean()) {
        await prisma.comment.create({
          data: {
            postId: post.id,
            userId: faker.helpers.arrayElement(users).id,
            parentCommentId: comment.id,
            content: faker.lorem.sentences(2),
            isApproved: true,
            likesCount: faker.number.int({ min: 0, max: 20 }),
          },
        })
      }
    }
  }

  // ============================================================================
  // POST LIKES
  // ============================================================================
  console.log('👍 Creating post likes...')
  for (const post of posts.slice(0, 15)) {
    const numLikes = faker.number.int({ min: 1, max: 5 })
    for (let i = 0; i < numLikes; i++) {
      try {
        await prisma.postLike.create({
          data: {
            postId: post.id,
            userId: faker.helpers.arrayElement(users).id,
          },
        })
      } catch (e) {
        // Ignorar duplicatas
      }
    }
  }

  // ============================================================================
  // COMMENT LIKES
  // ============================================================================
  console.log('💙 Creating comment likes...')
  for (const comment of comments.slice(0, 20)) {
    const numLikes = faker.number.int({ min: 0, max: 3 })
    for (let i = 0; i < numLikes; i++) {
      try {
        await prisma.commentLike.create({
          data: {
            commentId: comment.id,
            userId: faker.helpers.arrayElement(users).id,
          },
        })
      } catch (e) {
        // Ignorar duplicatas
      }
    }
  }

  // ============================================================================
  // PROJECT CATEGORIES
  // ============================================================================
  console.log('📂 Creating project categories...')
  const projectCategories = await Promise.all([
    prisma.projectCategory.create({
      data: { name: 'SaaS', slug: 'saas', icon: 'cloud', displayOrder: 1 },
    }),
    prisma.projectCategory.create({
      data: { name: 'E-commerce', slug: 'e-commerce', icon: 'shopping-cart', displayOrder: 2 },
    }),
    prisma.projectCategory.create({
      data: { name: 'Dashboard', slug: 'dashboard', icon: 'layout-dashboard', displayOrder: 3 },
    }),
    prisma.projectCategory.create({
      data: { name: 'Landing Page', slug: 'landing-page', icon: 'layout', displayOrder: 4 },
    }),
    prisma.projectCategory.create({
      data: { name: 'Mobile', slug: 'mobile', icon: 'smartphone', displayOrder: 5 },
    }),
  ])

  // ============================================================================
  // TECHNOLOGIES
  // ============================================================================
  console.log('🛠️ Creating technologies...')
  const techData = [
    { name: 'React', category: 'frontend', color: '#61DAFB' },
    { name: 'Next.js', category: 'frontend', color: '#000000' },
    { name: 'Vue.js', category: 'frontend', color: '#4FC08D' },
    { name: 'Nuxt', category: 'frontend', color: '#00DC82' },
    { name: 'TypeScript', category: 'frontend', color: '#3178C6' },
    { name: 'Tailwind CSS', category: 'frontend', color: '#06B6D4' },
    { name: 'Node.js', category: 'backend', color: '#339933' },
    { name: 'Express', category: 'backend', color: '#000000' },
    { name: 'NestJS', category: 'backend', color: '#E0234E' },
    { name: 'PostgreSQL', category: 'backend', color: '#4169E1' },
    { name: 'MongoDB', category: 'backend', color: '#47A248' },
    { name: 'Prisma', category: 'backend', color: '#2D3748' },
    { name: 'Docker', category: 'devops', color: '#2496ED' },
    { name: 'AWS', category: 'devops', color: '#FF9900' },
    { name: 'Vercel', category: 'devops', color: '#000000' },
  ]

  const technologies = await Promise.all(
    techData.map((tech) =>
      prisma.technology.create({
        data: {
          name: tech.name,
          slug: faker.helpers.slugify(tech.name.toLowerCase()),
          iconUrl: faker.image.url(),
          category: tech.category,
          color: tech.color,
        },
      })
    )
  )

  // ============================================================================
  // PROJECTS
  // ============================================================================
  console.log('🚀 Creating projects...')
  const projects = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.project.create({
        data: {
          categoryId: faker.helpers.arrayElement(projectCategories).id,
          title: faker.company.catchPhrase(),
          slug: faker.helpers.slugify(faker.company.buzzPhrase()) + `-${i}`,
          description: faker.company.catchPhraseDescriptor() + ' ' + faker.company.buzzPhrase(),
          content: faker.lorem.paragraphs(3, '\n\n'),
          imageUrl: faker.image.url(),
          status: faker.helpers.arrayElement(['concluido', 'em-desenvolvimento', 'arquivado']),
          isFeatured: i < 3,
          demoUrl: faker.internet.url(),
          githubUrl: `https://github.com/${faker.internet.username()}/${faker.helpers.slugify(faker.company.buzzNoun())}`,
          starsCount: faker.number.int({ min: 0, max: 500 }),
          usersCount: faker.helpers.arrayElement(['10+', '100+', '1k+', '10k+']),
          performanceScore: faker.helpers.arrayElement(['95%', '98%', 'A+', '100%']),
          displayOrder: i,
        },
      })
    )
  )

  // ============================================================================
  // PROJECT TECHNOLOGIES
  // ============================================================================
  console.log('🔗 Linking projects to technologies...')
  for (const project of projects) {
    const numTechs = faker.number.int({ min: 3, max: 6 })
    const selectedTechs = faker.helpers.arrayElements(technologies, numTechs)

    for (let i = 0; i < selectedTechs.length; i++) {
      await prisma.projectTechnology.create({
        data: {
          projectId: project.id,
          technologyId: selectedTechs[i].id,
          displayOrder: i,
        },
      })
    }
  }

  // ============================================================================
  // PROJECT IMAGES
  // ============================================================================
  console.log('🖼️ Creating project images...')
  for (const project of projects.slice(0, 5)) {
    const numImages = faker.number.int({ min: 2, max: 5 })
    for (let i = 0; i < numImages; i++) {
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          imageUrl: faker.image.url(),
          caption: faker.lorem.sentence(),
          displayOrder: i,
          isCover: i === 0,
        },
      })
    }
  }

  // ============================================================================
  // CLIENTS
  // ============================================================================
  console.log('🤝 Creating clients...')
  const clients = await Promise.all(
    Array.from({ length: 8 }, () =>
      prisma.client.create({
        data: {
          projectId: faker.helpers.maybe(() => faker.helpers.arrayElement(projects).id),
          name: faker.person.fullName(),
          companyName: faker.company.name(),
          companyType: faker.helpers.arrayElement(['Startup', 'E-commerce', 'Agência', 'Corporativo']),
          initial: faker.person.firstName()[0],
          avatarColor: faker.color.rgb(),
          emoji: faker.helpers.arrayElement(['🚀', '💼', '🎨', '⚡', '🌟', '💡']),
          testimonial: faker.lorem.paragraph(),
          rating: faker.number.float({ min: 4.0, max: 5.0, fractionDigits: 1 }),
          isFeatured: faker.datatype.boolean(),
          displayOrder: faker.number.int({ min: 0, max: 10 }),
        },
      })
    )
  )

  // ============================================================================
  // CONTACT MESSAGES
  // ============================================================================
  console.log('📧 Creating contact messages...')
  await Promise.all(
    Array.from({ length: 15 }, () =>
      prisma.contactMessage.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          subject: faker.lorem.sentence(),
          message: faker.lorem.paragraphs(2),
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          status: faker.helpers.arrayElement(['new', 'read', 'replied', 'archived']),
          readAt: faker.helpers.maybe(() => faker.date.recent()),
          repliedAt: faker.helpers.maybe(() => faker.date.recent()),
        },
      })
    )
  )

  // ============================================================================
  // NEWSLETTER SUBSCRIPTIONS
  // ============================================================================
  console.log('📬 Creating newsletter subscriptions...')
  await Promise.all(
    Array.from({ length: 30 }, () =>
      prisma.newsletterSubscription.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          status: faker.helpers.arrayElement(['active', 'unsubscribed', 'bounced']),
          ipAddress: faker.internet.ip(),
          verificationToken: faker.string.uuid(),
          verifiedAt: faker.helpers.maybe(() => faker.date.past()),
          unsubscribedAt: faker.helpers.maybe(() => faker.date.recent()),
        },
      })
    )
  )

  // ============================================================================
  // SKILLS
  // ============================================================================
  console.log('💪 Creating skills...')
  const skillsData = [
    { name: 'JavaScript', category: 'frontend', level: 9 },
    { name: 'TypeScript', category: 'frontend', level: 8 },
    { name: 'React', category: 'frontend', level: 9 },
    { name: 'Vue.js', category: 'frontend', level: 8 },
    { name: 'Node.js', category: 'backend', level: 9 },
    { name: 'PostgreSQL', category: 'backend', level: 8 },
    { name: 'MongoDB', category: 'backend', level: 7 },
    { name: 'Docker', category: 'devops', level: 7 },
    { name: 'AWS', category: 'devops', level: 6 },
    { name: 'Git', category: 'outras', level: 9 },
  ]

  await Promise.all(
    skillsData.map((skill, i) =>
      prisma.skill.create({
        data: {
          name: skill.name,
          category: skill.category,
          proficiencyLevel: skill.level,
          icon: faker.helpers.slugify(skill.name),
          displayOrder: i,
        },
      })
    )
  )

  // ============================================================================
  // WORK EXPERIENCES
  // ============================================================================
  console.log('💼 Creating work experiences...')
  await Promise.all([
    prisma.workExperience.create({
      data: {
        companyName: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        location: 'São Paulo, SP - Remote',
        employmentType: 'full-time',
        description: 'Desenvolvimento de aplicações web escaláveis usando React, Node.js e AWS',
        startDate: new Date('2022-01-01'),
        endDate: null,
        isCurrent: true,
        displayOrder: 0,
      },
    }),
    prisma.workExperience.create({
      data: {
        companyName: 'Digital Solutions',
        position: 'Full Stack Developer',
        location: 'São Paulo, SP',
        employmentType: 'full-time',
        description: 'Desenvolvimento de sistemas web e APIs RESTful',
        startDate: new Date('2020-06-01'),
        endDate: new Date('2021-12-31'),
        isCurrent: false,
        displayOrder: 1,
      },
    }),
  ])

  // ============================================================================
  // EDUCATION
  // ============================================================================
  console.log('🎓 Creating education records...')
  await Promise.all([
    prisma.education.create({
      data: {
        institutionName: 'Universidade de São Paulo',
        degree: 'Bacharelado',
        fieldOfStudy: 'Ciência da Computação',
        location: 'São Paulo, SP',
        description: 'Foco em Engenharia de Software e Desenvolvimento Web',
        startDate: new Date('2016-03-01'),
        endDate: new Date('2020-12-01'),
        isCurrent: false,
        displayOrder: 0,
      },
    }),
  ])

  // ============================================================================
  // SITE SETTINGS
  // ============================================================================
  console.log('⚙️ Creating site settings...')
  await Promise.all([
    prisma.siteSetting.create({
      data: {
        key: 'site_name',
        value: 'Patrick Luz',
        type: 'string',
        description: 'Nome do site',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'site_description',
        value: 'Desenvolvedor Full Stack',
        type: 'string',
        description: 'Descrição do site',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'contact_email',
        value: 'contato@patrickluz.dev',
        type: 'string',
        description: 'Email de contato principal',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'whatsapp_number',
        value: '5511999999999',
        type: 'string',
        description: 'Número do WhatsApp',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'linkedin_url',
        value: 'https://linkedin.com/in/patrickluz',
        type: 'string',
        description: 'URL do LinkedIn',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'github_url',
        value: 'https://github.com/patrickluz',
        type: 'string',
        description: 'URL do GitHub',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'newsletter_enabled',
        value: 'true',
        type: 'boolean',
        description: 'Newsletter habilitada',
      },
    }),
    prisma.siteSetting.create({
      data: {
        key: 'comments_require_approval',
        value: 'true',
        type: 'boolean',
        description: 'Comentários requerem aprovação',
      },
    }),
  ])

  console.log('✅ Seed completed successfully!')
  console.log('\n📊 Summary:')
  console.log(`   - ${users.length} users`)
  console.log(`   - ${postCategories.length} post categories`)
  console.log(`   - ${posts.length} posts`)
  console.log(`   - ${comments.length}+ comments`)
  console.log(`   - ${projectCategories.length} project categories`)
  console.log(`   - ${technologies.length} technologies`)
  console.log(`   - ${projects.length} projects`)
  console.log(`   - ${clients.length} clients`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
