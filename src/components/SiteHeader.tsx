import { useState, useEffect } from 'react'
import {
  Menu, X, Home, User, Briefcase, BookOpen, Calendar,
  LayoutDashboard, Users, FolderKanban, FileText, BarChart3
} from 'lucide-react'

interface SiteHeaderProps {
  readonly admin?: boolean
  readonly onNavigate: (path: string) => void
  readonly currentPath?: string
}

export function SiteHeader({ admin, onNavigate, currentPath = '/' }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const nav = (path: string) => {
    setMobileOpen(false)
    onNavigate(path)
  }

  const adminNavLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'CRM', path: '/admin/crm', icon: Users },
    { label: 'Clients', path: '/admin/clients', icon: FolderKanban },
    { label: 'Content', path: '/admin/content', icon: FileText },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ]

  if (admin) {
    return (
      <>
        <header className="site-header admin-header">
          <button className="wordmark" onClick={() => nav('/admin')}>
            mehjabin badhon<br /><i>business os</i>
          </button>
          <nav className="admin-desktop-nav">
            {adminNavLinks.map(link => (
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
            <button className="header-exit" onClick={() => nav('/')}>↗ Public site</button>
            <button className="hamburger admin-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </header>

        {mobileOpen && (
          <div className="mobile-overlay" onClick={() => setMobileOpen(false)}>
            <div className="mobile-nav admin-mobile-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-nav-top">
                <button className="wordmark" onClick={() => nav('/admin')}>
                  mehjabin badhon<br /><i>business os</i>
                </button>
                <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <nav>
                {adminNavLinks.map(link => (
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
              <button className="primary mobile-book" onClick={() => nav('/')}>
                ↗ Exit to Public Site
              </button>
            </div>
          </div>
        )}

        {/* Mobile Persistent Bottom Nav Bar (Admin) */}
        <nav className="mobile-bottom-bar admin-bottom-bar" aria-label="Admin Navigation">
          {adminNavLinks.map(link => {
            const Icon = link.icon
            const isActive = currentPath === link.path
            return (
              <button
                key={link.path}
                onClick={() => nav(link.path)}
                className={`bottom-tab ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </button>
            )
          })}
        </nav>
      </>
    )
  }

  const navLinks = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'About', path: '/about', icon: User },
    { label: 'Work', path: '/work-with-me', icon: Briefcase },
    { label: 'Ideas', path: '/ideas', icon: BookOpen },
    { label: 'Book', path: '/book', icon: Calendar },
  ]

  const headerNavLinks = [
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
          {headerNavLinks.map(link => (
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
              {headerNavLinks.map(link => (
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

