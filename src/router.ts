import { useCallback, useEffect, useState } from 'react'

export type Go = (to: string) => void

export type RouteState = {
  path: string
  query: URLSearchParams
  hash: string
}

function parse(): RouteState {
  return {
    path: location.pathname,
    query: new URLSearchParams(location.search),
    hash: location.hash.replace(/^#/, ''),
  }
}

const titles: Record<string, string> = {
  '/': "Mehjabin Badhon — Better business starts with better understanding",
  '/about': 'About — Mehjabin Badhon',
  '/work-with-me': 'Work With Me — Mehjabin Badhon',
  '/ideas': 'Ideas — Mehjabin Badhon',
  '/book': 'Book a Consultation — Mehjabin Badhon',
  '/start': 'Start Here — Mehjabin Badhon',
  '/admin': 'Dashboard — Business OS (demo)',
  '/admin/crm': 'Leads & CRM — Business OS (demo)',
  '/admin/clients': 'Clients — Business OS (demo)',
  '/admin/content': 'Content Studio — Business OS (demo)',
}

function titleFor(path: string): string {
  if (path.startsWith('/ideas/')) return 'Ideas — Mehjabin Badhon'
  return titles[path] ?? 'Mehjabin Badhon — Business Strategy & Advisory'
}

/** A tiny history-backed router. No dependency is worth pulling in for six routes. */
export function useRoute() {
  const [route, setRoute] = useState<RouteState>(parse)

  useEffect(() => {
    const onPop = () => setRoute(parse())
    addEventListener('popstate', onPop)
    return () => removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    document.title = titleFor(route.path)
  }, [route.path])

  const go = useCallback<Go>(to => {
    const url = new URL(to, location.origin)
    history.pushState({}, '', url)
    setRoute(parse())

    const targetHash = url.hash.replace(/^#/, '')
    // Wait two frames so the destination page has painted before we scroll to it.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = targetHash ? document.getElementById(targetHash) : null
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        else scrollTo({ top: 0, behavior: 'smooth' })
      })
    })
  }, [])

  return { ...route, go }
}
