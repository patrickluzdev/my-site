export default defineNuxtPlugin(() => {
  const router = useRouter()
  const { trackScrollDepth, trackTimeOnPage } = useAnalytics()

  const scrollMilestones = [25, 50, 75, 100]
  let reachedMilestones: number[] = []
  let scrollHandler: (() => void) | null = null

  const setupScrollTracking = () => {
    reachedMilestones = []

    scrollHandler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0

      scrollMilestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !reachedMilestones.includes(milestone)) {
          reachedMilestones.push(milestone)
          trackScrollDepth(milestone, window.location.pathname)
        }
      })
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
  }

  const cleanupScrollTracking = () => {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
      scrollHandler = null
    }
  }

  let startTime: number | null = null
  let timeTrackingInterval: NodeJS.Timeout | null = null
  const timeThresholds = [30, 60, 120, 300] // seconds
  let reachedTimeThresholds: number[] = []

  const setupTimeTracking = () => {
    startTime = Date.now()
    reachedTimeThresholds = []

    timeTrackingInterval = setInterval(() => {
      if (!startTime) return

      const timeSpent = Math.floor((Date.now() - startTime) / 1000)

      timeThresholds.forEach((threshold) => {
        if (timeSpent >= threshold && !reachedTimeThresholds.includes(threshold)) {
          reachedTimeThresholds.push(threshold)
          trackTimeOnPage(threshold, window.location.pathname)
        }
      })
    }, 5000)
  }

  const cleanupTimeTracking = () => {
    if (timeTrackingInterval) {
      clearInterval(timeTrackingInterval)
      timeTrackingInterval = null
    }
    startTime = null
  }

  if (import.meta.client) {
    setupScrollTracking()
    setupTimeTracking()

    router.afterEach(() => {
      cleanupScrollTracking()
      cleanupTimeTracking()

      setTimeout(() => {
        setupScrollTracking()
        setupTimeTracking()
      }, 100)
    })

    window.addEventListener('beforeunload', () => {
      cleanupScrollTracking()
      cleanupTimeTracking()
    })
  }
})
