import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface SiteHeaderProps {
  readonly admin?: boolean
  readonly onNavigate: (path: string) => void
  readonly currentPath?: string
}

export function SiteHeader({ admin, onNavigate, currentPath = '/' }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = (path: string) => {
    setMobileOpen(false)
    onNavigate(path)
  }

  if (admin) {
    return (
      <header className="site-header admin-header">
        <button className="wordmark" onClick={() => nav('/admin')}>
          mehjabin badhon<br /><i>business os</i>
        </button>
        <nav>
          <button onClick={() => nav('/admin')} className={currentPath === '/admin' ? 'active' : ''}>Dashboard</button>
          <button onClick={() => nav('/admin/crm')} className={currentPath === '/admin/crm' ? 'active' : ''}>CRM</button>
          <button onClick={() => nav('/admin/clients')} className={currentPath === '/admin/clients' ? 'active' : ''}>Clients</button>
          <button onClick={() => nav('/admin/content')} className={currentPath === '/admin/content' ? 'active' : ''}>Content Studio</button>
          <button onClick={() => nav('/admin/analytics')} className={currentPath === '/admin/analytics' ? 'active' : ''}>Analytics</button>
        </nav>
        <button className="header-exit" onClick={() => nav('/')}>↗ Public site</button>
      </header>
    )
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Work With Me', path: '/work-with-me' },
    { label: 'Ideas', path: '/ideas' },
    { label: 'Start Here', path: '/start-here' },
    { label: 'Let\'s Talk', path: '/book' },
  ]

  return (
    <>
      <header className="site-header">
        <button className="wordmark" onClick={() => nav('/')}>
          mehjabin badhon<br /><i>let's talk business</i>
        </button>
        <nav className="main-nav">
          {navLinks.map(link => (
            <button
              key={link.path}
              onClick={() => nav(link.path)}
              className={currentPath === link.path ? 'active' : ''}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button className="book-btn" onClick={() => nav('/book')}>
            Book a Consultation
          </button>
          <button className="hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-nav" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-top">
              <button className="wordmark" onClick={() => nav('/')}>
                mehjabin badhon<br /><i>let's talk business</i>
              </button>
              <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav>
              {navLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => nav(link.path)}
                  className={currentPath === link.path ? 'active' : ''}
                >
                  <span>{link.label}</span>
                  {currentPath === link.path && <span className="active-dot">●</span>}
                </button>
              ))}
            </nav>
            <button className="primary mobile-book" onClick={() => nav('/book')}>
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </>
  )
}
