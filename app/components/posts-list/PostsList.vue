<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-2xl">Posts</CardTitle>
    </CardHeader>

    <CardContent class="space-y-4">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import PostCard from './components/PostCard.vue';

const posts = ref([
  {
    id: 1,
    author: 'Patrick Luz',
    time: 'há 12 dias',
    category: 'Anúncios',
    pinned: true,
    badge: 'lucide:zap',
    status: true,
    title: 'Como construir uma Newsletter SaaS com IA usando Next.js 16!',
    description: 'Junte-se a mim enquanto mostro como construir uma aplicação SaaS de Newsletter com IA do zero usando o mais recente Next.js 16 - Este tutorial abrangente cobre tudo que você precisa',
    likes: 7,
    comments: 2,
    commenters: [
      { initial: 'J', color: '#FF6B6B' },
      { initial: 'M', color: '#4ECDC4' }
    ],
    lastComment: 'há 11 dias',
    thumbnail: 'https://placehold.co/96x96/6366f1/white?text=IA'
  },
  {
    id: 2,
    author: 'Patrick Luz',
    time: 'há 6 dias',
    category: 'Discussão geral',
    badge: 'lucide:message-circle',
    status: true,
    title: 'Alguma ideia 💡?',
    description: 'Construí um aplicativo para um cliente, mas não consigo entregá-lo ainda porque o timer de sessão não para automaticamente quando estou a mais de 300m do endereço alvo. O app',
    likes: 1,
    comments: 6,
    commenters: [
      { initial: 'A', color: '#95E1D3' },
      { initial: 'B', color: '#F38181' },
      { initial: 'C', color: '#AA96DA' }
    ],
    lastComment: 'há 22h',
    thumbnail: 'https://placehold.co/96x96/8b5cf6/white?text=App'
  },
  {
    id: 3,
    author: 'Patrick Luz',
    time: 'há 9 dias',
    category: 'Discussão geral',
    badge: 'lucide:message-circle',
    status: true,
    title: 'OS 4 ESTÁGIOS DA ASCENSÃO DA IA — ONDE NÓS, COMO DESENVOL...',
    description: 'E aí pessoal 👋 Acabei de ler uma reflexão incrível sobre como a IA está mudando o valor das habilidades, especialmente para nós desenvolvedores. Um framework que realmente se destacou para mim',
    likes: 2,
    comments: 1,
    commenters: [
      { initial: 'T', color: '#4ECDC4' }
    ],
    lastComment: 'há 1 dia',
    thumbnail: 'https://placehold.co/96x96/06b6d4/white?text=IA'
  },
  {
    id: 4,
    author: 'Patrick Luz',
    time: 'há 6 dias',
    category: 'Discussão geral',
    badge: 'lucide:briefcase',
    status: true,
    title: 'Agência de Apps Web Fintech',
    description: 'E aí galera; Onde podemos encontrar leads valiosos como uma agência fintech operando tanto em web2 quanto web3? Já completamos projetos e ganhamos mais de 100k mas gostaria de saber se vale',
    likes: 0,
    comments: 2,
    commenters: [
      { initial: 'R', color: '#FF6B6B' },
      { initial: 'S', color: '#95E1D3' }
    ],
    lastComment: 'há 2 dias',
    thumbnail: null
  }
])
</script>
