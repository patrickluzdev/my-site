import { companies, contactInfo, faqs, getWhatsAppLink, socialLinks } from "~/data";

export const useContact = () => {
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

  const handleSubmit = async () => {
    isSubmitting.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    isSubmitting.value = false;
    submitSuccess.value = true;

    form.name = "";
    form.email = "";
    form.subject = "";
    form.message = "";

    setTimeout(() => {
      submitSuccess.value = false;
    }, 5000);
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
    handleSubmit,
    resetForm,
  };
};
