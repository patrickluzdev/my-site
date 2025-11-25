<template>
  <div>
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-2xl font-semibold text-stone-900 mb-1">Contato</h1>
      <p class="text-stone-500 italic text-[15px]">
        Vamos conversar sobre seu projeto?
      </p>
    </header>

    <!-- Availability Status -->
    <div
      class="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 border border-green-100 mb-8"
    >
      <span class="relative flex h-2.5 w-2.5">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"
        ></span>
      </span>
      <p class="text-sm text-green-700">
        <span class="font-medium">Disponível para novos projetos</span>
        <span class="text-green-600 ml-1">· Respondo em até 24h</span>
      </p>
    </div>

    <!-- Description -->
    <p class="text-stone-600 leading-relaxed mb-10 text-[15px]">
      Tem um projeto em mente ou quer tirar alguma dúvida? Preencha o formulário
      abaixo ou entre em contato diretamente pelo WhatsApp.
    </p>

    <!-- Contact Form -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        Envie uma mensagem
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="name" class="block text-sm text-stone-600 mb-1.5"
              >Nome</label
            >
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Seu nome"
              required
              class="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors"
              @focus="handleFormStart"
            />
          </div>
          <div>
            <label for="email" class="block text-sm text-stone-600 mb-1.5"
              >E-mail</label
            >
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="seu@email.com"
              required
              class="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>
        </div>

        <div>
          <label for="subject" class="block text-sm text-stone-600 mb-1.5"
            >Assunto</label
          >
          <div class="relative">
            <select
              id="subject"
              v-model="form.subject"
              required
              class="w-full px-4 py-2.5 pr-10 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors bg-white appearance-none cursor-pointer"
            >
              <option value="" disabled>Selecione um assunto</option>
              <option value="Novo projeto">Novo projeto</option>
              <option value="Trabalho freelance">Trabalho freelance</option>
              <option value="Consultoria">Consultoria</option>
              <option value="Dúvida">Dúvida</option>
              <option value="Outro">Outro</option>
            </select>
            <Icon
              name="lucide:chevron-down"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none"
            />
          </div>
        </div>

        <div>
          <label for="message" class="block text-sm text-stone-600 mb-1.5"
            >Mensagem</label
          >
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Conte um pouco sobre seu projeto ou dúvida..."
            required
            class="w-full px-4 py-2.5 text-sm border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full sm:w-auto px-6 py-2.5 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!isSubmitting">Enviar mensagem</span>
          <span v-else class="flex items-center gap-2">
            <Icon name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            Enviando...
          </span>
        </button>
      </form>

      <!-- Success Message -->
      <div
        v-if="submitSuccess"
        class="mt-4 p-4 rounded-xl bg-green-50 border border-green-100"
      >
        <p class="text-sm text-green-700">
          Mensagem enviada com sucesso! Retornarei em breve.
        </p>
      </div>

      <!-- Error Message -->
      <div
        v-if="submitError"
        class="mt-4 p-4 rounded-xl bg-red-50 border border-red-100"
      >
        <p class="text-sm text-red-700">
          Erro ao enviar mensagem. Tente novamente ou entre em contato pelo
          WhatsApp.
        </p>
      </div>
    </section>

    <!-- Direct Contact -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        Ou fale diretamente
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <!-- WhatsApp -->
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-3 py-3 px-4 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 transition-colors"
          @click="trackWhatsappClick('contato')"
        >
          <div
            class="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shrink-0"
          >
            <Icon name="mdi:whatsapp" class="w-5 h-5 text-white" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-green-800 text-sm">WhatsApp</p>
            <p class="text-xs text-green-600">Resposta mais rápida</p>
          </div>
        </a>

        <!-- Email -->
        <a
          href="mailto:eu@patrickluz.dev"
          class="flex items-center gap-3 py-3 px-4 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-100 transition-colors"
          @click="trackEmailClick"
        >
          <div
            class="w-9 h-9 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0"
          >
            <Icon name="lucide:mail" class="w-4 h-4 text-stone-500" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-stone-800 text-sm">eu@patrickluz.dev</p>
            <p class="text-xs text-stone-400">E-mail</p>
          </div>
        </a>

        <!-- Phone -->
        <a
          href="tel:+5549999487330"
          class="flex items-center gap-3 py-3 px-4 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-100 transition-colors"
          @click="trackPhoneClick"
        >
          <div
            class="w-9 h-9 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0"
          >
            <Icon name="lucide:phone" class="w-4 h-4 text-stone-500" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-stone-800 text-sm">+55 49 99948-7330</p>
            <p class="text-xs text-stone-400">Telefone</p>
          </div>
        </a>

        <!-- Location -->
        <div
          class="flex items-center gap-3 py-3 px-4 rounded-xl border border-stone-100 bg-stone-50/50"
        >
          <div
            class="w-9 h-9 rounded-full bg-white border border-stone-100 flex items-center justify-center shrink-0"
          >
            <Icon name="lucide:map-pin" class="w-4 h-4 text-stone-500" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-stone-800 text-sm">Canoas, RS</p>
            <p class="text-xs text-stone-400">Localização</p>
          </div>
        </div>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- FAQ Section -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">
        Perguntas frequentes
      </h2>
      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="rounded-xl border border-stone-100 overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
            @click="toggleFaq(index)"
          >
            <span class="text-sm font-medium text-stone-800">{{
              faq.question
            }}</span>
            <Icon
              name="lucide:chevron-down"
              class="w-4 h-4 text-stone-400 transition-transform"
              :class="{ 'rotate-180': openFaq === index }"
            />
          </button>
          <div
            v-show="openFaq === index"
            class="px-4 pb-4 text-sm text-stone-600 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </section>

    <!-- Social Links -->
    <section class="mb-10">
      <h2 class="text-lg font-semibold text-stone-900 mb-4">Redes sociais</h2>
      <div class="flex flex-wrap gap-2">
        <a
          v-for="social in socials"
          :key="social.name"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 py-2 px-3 rounded-lg border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-all text-sm text-stone-600 hover:text-stone-800"
          @click="trackSocialClick(social.name)"
        >
          <Icon :name="social.icon" class="w-4 h-4" />
          {{ social.name }}
        </a>
      </div>
    </section>

    <div class="h-px bg-stone-100 my-10" />

    <!-- Business Info -->
    <section>
      <h2 class="text-sm font-medium text-stone-400 mb-3">
        Informações empresariais
      </h2>
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-500">
        <div class="flex items-center gap-2">
          <Icon name="lucide:building" class="w-4 h-4 text-stone-400" />
          <span>CNPJ: 47.383.701/0001-10</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon name="lucide:map-pin" class="w-4 h-4 text-stone-400" />
          <span>Canoas, RS - Brasil</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useSeoMeta({
  title: "Contato - Patrick Luz",
  description:
    "Entre em contato para discutir seu projeto. Disponível para desenvolvimento web, APIs, automações e consultoria. Resposta em até 24h.",
  keywords:
    "contato, orçamento, freelancer, consultoria, projeto, whatsapp, email",
});

defineOgImage({
  component: "OgImageTemplate",
  props: {
    title: "Entre em Contato",
    description: "Disponível para novos projetos. Resposta em até 24h.",
  },
});

const {
  socialLinks: socials,
  faqs,
  whatsappLink,
  openFaq,
  toggleFaq,
  form,
  isSubmitting,
  submitSuccess,
  submitError,
  handleSubmit,
  handleFormStart,
  handleSubjectChange,
} = useContact();

const {
  trackWhatsappClick,
  trackEmailClick,
  trackPhoneClick,
  trackSocialClick,
} = useAnalytics();

watch(
  () => form.subject,
  (newSubject) => {
    handleSubjectChange(newSubject);
  }
);
</script>
