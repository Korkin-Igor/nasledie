const REVEAL_STATE = Symbol('reveal-state')

function normalizeConfig(value) {
  if (typeof value === 'string') {
    return {
      name: value,
    }
  }

  if (value && typeof value === 'object') {
    return value
  }

  return {}
}

function applyReveal(el, binding) {
  const config = normalizeConfig(binding.value)
  const name = config.name || 'fade-up'
  const delay = config.delay ?? 0
  const duration = config.duration ?? 820
  const threshold = config.threshold ?? 0.18
  const rootMargin = config.rootMargin ?? '0px 0px -10% 0px'
  const once = config.once ?? true

  el.classList.add('scroll-reveal', `reveal-${name}`)
  el.style.setProperty('--reveal-delay', `${delay}ms`)
  el.style.setProperty('--reveal-duration', `${duration}ms`)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.classList.add('is-visible')
    return
  }

  if (el[REVEAL_STATE]?.observer) {
    el[REVEAL_STATE].observer.disconnect()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')

          if (once) {
            observer.unobserve(el)
          }

          return
        }

        if (!once) {
          el.classList.remove('is-visible')
        }
      })
    },
    {
      threshold,
      rootMargin,
    },
  )

  observer.observe(el)
  el[REVEAL_STATE] = { observer }
}

export const revealDirective = {
  mounted(el, binding) {
    applyReveal(el, binding)
  },
  updated(el, binding) {
    applyReveal(el, binding)
  },
  unmounted(el) {
    el[REVEAL_STATE]?.observer?.disconnect()
    delete el[REVEAL_STATE]
  },
}
