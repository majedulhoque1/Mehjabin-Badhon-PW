import { useEffect } from 'react'

/**
 * Fades and lifts any [data-reveal] element into place as it enters the viewport.
 * Runs once per mount (re-run happens because each page is a fresh component tree
 * on route change). No-ops entirely under prefers-reduced-motion.
 */
export function useReveal(deps: readonly unknown[] = []) {
  useEffect(() => {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-revealed'))
      return
    }

    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach(el => io.observe(el))

    // Safety net: content must never stay invisible if the observer is slow
    // or never fires (throttled background tabs, some screenshot tooling,
    // odd viewport-resize timing). Far-below-the-fold sections just lose
    // their entrance animation in that case, which nobody notices.
    const fallback = setTimeout(() => {
      els.forEach(el => el.classList.add('is-revealed'))
      io.disconnect()
    }, 900)

    return () => {
      io.disconnect()
      clearTimeout(fallback)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
