import emailjs from "@emailjs/browser";
import { companies, contactInfo, faqs, getWhatsAppLink, socialLinks } from "~/data";

export const useContact = () => {
  const config = useRuntimeConfig();

  const openFaq = ref<number | null>(null);

  const toggleFaq = (index: number) => {
    openFaq.value = openFaq.value === index ? null : index;
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

      submitSuccess.value = true;
      form.name = "";
      form.email = "";
      form.subject = "";
      form.message = "";

      setTimeout(() => {
        submitSuccess.value = false;
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
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
  };
};
