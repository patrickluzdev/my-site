import emailjs from "@emailjs/browser";
import { companies, contactInfo, faqs, getWhatsAppLink, socialLinks } from "~/data";

export const useContact = () => {
  const config = useRuntimeConfig();
  const {
    trackContactFormStart,
    trackContactSubjectSelected,
    trackContactFormSubmit,
    trackContactFormSuccess,
    trackContactFormError,
    trackFaqOpen,
    trackFaqClose,
  } = useAnalytics();

  const openFaq = ref<number | null>(null);
  const formStarted = ref(false);

  const toggleFaq = (index: number) => {
    const wasOpen = openFaq.value === index;
    openFaq.value = wasOpen ? null : index;

    if (wasOpen) {
      trackFaqClose(index);
    } else {
      const faq = faqs[index];
      if (faq) {
        trackFaqOpen(index, faq.question);
      }
    }
  };

  const handleFormStart = () => {
    if (!formStarted.value) {
      formStarted.value = true;
      trackContactFormStart();
    }
  };

  const handleSubjectChange = (subject: string) => {
    if (subject) {
      trackContactSubjectSelected(subject);
    }
  };

  const form = reactive({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const isSubmitting = ref(false);
  const submitSuccess = ref(false);
  const submitError = ref(false);

  const handleSubmit = async () => {
    isSubmitting.value = true;
    submitError.value = false;

    trackContactFormSubmit();

    try {
      await emailjs.send(
        config.public.emailjsServiceId,
        config.public.emailjsTemplateId,
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        config.public.emailjsPublicKey
      );

      trackContactFormSuccess();

      submitSuccess.value = true;
      form.name = "";
      form.email = "";
      form.subject = "";
      form.message = "";
      formStarted.value = false;

      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);

      trackContactFormError(error instanceof Error ? error.message : 'unknown');

      submitError.value = true;

      setTimeout(() => {
        submitError.value = false;
      }, 5000);
    } finally {
      isSubmitting.value = false;
    }
  };

  const resetForm = () => {
    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";
    submitSuccess.value = false;
  };

  return {
    socialLinks,
    companies,
    contactInfo,
    faqs,
    whatsappLink: getWhatsAppLink(),
    getWhatsAppLink,
    openFaq,
    toggleFaq,
    form,
    isSubmitting,
    submitSuccess,
    submitError,
    handleSubmit,
    resetForm,
    handleFormStart,
    handleSubjectChange,
  };
};
