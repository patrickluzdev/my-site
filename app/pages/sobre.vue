<template>
  <div>
    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="mb-12">
        <h1 class="text-4xl font-bold mb-4">Sobre Mim 👨‍💻</h1>
        <p class="text-muted-foreground text-xl">
          Conheça mais sobre minha trajetória, habilidades e experiências.
        </p>
      </div>

      <div class="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:user" class="w-5 h-5" />
              Quem sou eu
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-muted-foreground leading-relaxed">
              Sou desenvolvedor full-stack apaixonado por criar soluções inovadoras e eficientes.
              Com experiência em diversas tecnologias e frameworks modernos, trabalho para
              transformar ideias em produtos digitais de alta qualidade.
            </p>
            <p class="text-muted-foreground leading-relaxed">
              Meu foco está em desenvolver aplicações escaláveis, com código limpo e
              experiências de usuário excepcionais. Adoro aprender novas tecnologias e
              compartilhar conhecimento com a comunidade.
            </p>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:code" class="w-5 h-5" />
              Tecnologias & Habilidades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="lucide:layout" class="w-4 h-4" />
                  Frontend
                </h3>
                <div class="flex flex-wrap gap-2">
                  <Badge variant="secondary">Vue.js</Badge>
                  <Badge variant="secondary">Nuxt</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </div>
              <div>
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="lucide:server" class="w-4 h-4" />
                  Backend
                </h3>
                <div class="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">Prisma</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Redis</Badge>
                </div>
              </div>
              <div>
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="lucide:cloud" class="w-4 h-4" />
                  DevOps & Cloud
                </h3>
                <div class="flex flex-wrap gap-2">
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">Git</Badge>
                </div>
              </div>
              <div>
                <h3 class="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="lucide:sparkles" class="w-4 h-4" />
                  Outras
                </h3>
                <div class="flex flex-wrap gap-2">
                  <Badge variant="secondary">RESTful APIs</Badge>
                  <Badge variant="secondary">GraphQL</Badge>
                  <Badge variant="secondary">WebSockets</Badge>
                  <Badge variant="secondary">Testing</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:briefcase" class="w-5 h-5" />
              Experiência
            </CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="border-l-2 border-primary pl-4 space-y-4">
              <div>
                <h3 class="font-semibold">Desenvolvedor Full-Stack</h3>
                <p class="text-sm text-muted-foreground">2022 - Presente</p>
                <p class="text-muted-foreground mt-2">
                  Desenvolvimento de aplicações web escaláveis utilizando tecnologias modernas.
                  Foco em performance, UX e melhores práticas de desenvolvimento.
                </p>
              </div>
              <div>
                <h3 class="font-semibold">Desenvolvedor Frontend</h3>
                <p class="text-sm text-muted-foreground">2020 - 2022</p>
                <p class="text-muted-foreground mt-2">
                  Criação de interfaces responsivas e interativas. Trabalho em equipe utilizando
                  metodologias ágeis.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Icon name="lucide:graduation-cap" class="w-5 h-5" />
              Formação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div>
                <h3 class="font-semibold">Ciência da Computação</h3>
                <p class="text-sm text-muted-foreground">Bacharelado - 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'

definePageMeta({
  layout: 'default'
})
</script>
