export const useAnalytics = () => {
  const { gtag } = useGtag()

  const trackContactFormStart = () => {
    gtag('event', 'contact_form_start', {
      event_category: 'contact',
      event_label: 'form_interaction',
    })
  }

  const trackContactSubjectSelected = (subject: string) => {
    gtag('event', 'contact_subject_selected', {
      event_category: 'contact',
      event_label: subject,
      subject_value: subject,
    })
  }

  const trackContactFormSubmit = () => {
    gtag('event', 'contact_form_submit', {
      event_category: 'contact',
      event_label: 'form_submission',
    })
  }

  const trackContactFormSuccess = () => {
    gtag('event', 'contact_form_success', {
      event_category: 'contact',
      event_label: 'success',
    })
  }

  const trackContactFormError = (errorType?: string) => {
    gtag('event', 'contact_form_error', {
      event_category: 'contact',
      event_label: 'error',
      error_type: errorType || 'unknown',
    })
  }

  const trackCtaClick = (ctaText: string, ctaLocation: string, destinationPage: string) => {
    gtag('event', 'cta_click', {
      event_category: 'cta',
      event_label: ctaText,
      cta_text: ctaText,
      cta_location: ctaLocation,
      destination_page: destinationPage,
    })
  }

  const trackHeroCtaClick = (ctaButton: string) => {
    gtag('event', 'hero_cta_click', {
      event_category: 'cta',
      event_label: ctaButton,
      cta_button: ctaButton,
    })
  }

  const trackProjectGithubClick = (projectId: string, projectTitle: string) => {
    gtag('event', 'project_github_click', {
      event_category: 'project',
      event_label: projectTitle,
      project_id: projectId,
      project_title: projectTitle,
    })
  }

  const trackProjectDemoClick = (projectId: string, projectTitle: string) => {
    gtag('event', 'project_demo_click', {
      event_category: 'project',
      event_label: projectTitle,
      project_id: projectId,
      project_title: projectTitle,
    })
  }

  const trackProjectCaseStudyClick = (projectId: string, projectTitle: string) => {
    gtag('event', 'project_case_study_click', {
      event_category: 'project',
      event_label: projectTitle,
      project_id: projectId,
      project_title: projectTitle,
    })
  }

  const trackProjectFilterClick = (filterType: 'type' | 'tech', filterValue: string, selected: boolean) => {
    gtag('event', 'project_filter_click', {
      event_category: 'project',
      event_label: filterValue,
      filter_type: filterType,
      filter_value: filterValue,
      selected: selected,
    })
  }

  const trackProjectSearch = (searchQuery: string, resultCount: number) => {
    gtag('event', 'project_search', {
      event_category: 'project',
      event_label: searchQuery,
      search_query: searchQuery,
      result_count: resultCount,
    })
  }

  const trackProjectClearFilters = (activeFiltersCount: number) => {
    gtag('event', 'project_clear_filters', {
      event_category: 'project',
      event_label: 'clear_filters',
      active_filters_count: activeFiltersCount,
    })
  }

  const trackSocialClick = (platform: string) => {
    gtag('event', 'social_click', {
      event_category: 'social',
      event_label: platform,
      social_platform: platform,
    })
  }

  const trackWhatsappClick = (fromPage: string) => {
    gtag('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label: 'whatsapp',
      from_page: fromPage,
    })
  }

  const trackEmailClick = () => {
    gtag('event', 'email_click', {
      event_category: 'contact',
      event_label: 'email',
    })
  }

  const trackPhoneClick = () => {
    gtag('event', 'phone_click', {
      event_category: 'contact',
      event_label: 'phone',
    })
  }

  const trackFaqOpen = (faqIndex: number, questionText: string) => {
    gtag('event', 'faq_open', {
      event_category: 'faq',
      event_label: questionText,
      faq_index: faqIndex,
      question_text: questionText,
    })
  }

  const trackFaqClose = (faqIndex: number) => {
    gtag('event', 'faq_close', {
      event_category: 'faq',
      event_label: `faq_${faqIndex}`,
      faq_index: faqIndex,
    })
  }

  const trackScrollDepth = (percentScrolled: number, pagePath: string) => {
    gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentScrolled}%`,
      percent_scrolled: percentScrolled,
      page_path: pagePath,
    })
  }

  const trackTimeOnPage = (timeSpent: number, pagePath: string) => {
    gtag('event', 'time_on_page', {
      event_category: 'engagement',
      event_label: pagePath,
      time_spent_seconds: timeSpent,
      page_path: pagePath,
    })
  }

  return {
    // Formulário de contato
    trackContactFormStart,
    trackContactSubjectSelected,
    trackContactFormSubmit,
    trackContactFormSuccess,
    trackContactFormError,
    // CTAs
    trackCtaClick,
    trackHeroCtaClick,
    // Projetos
    trackProjectGithubClick,
    trackProjectDemoClick,
    trackProjectCaseStudyClick,
    trackProjectFilterClick,
    trackProjectSearch,
    trackProjectClearFilters,
    // Social e contato
    trackSocialClick,
    trackWhatsappClick,
    trackEmailClick,
    trackPhoneClick,
    // FAQ
    trackFaqOpen,
    trackFaqClose,
    // Engajamento
    trackScrollDepth,
    trackTimeOnPage,
  }
}
