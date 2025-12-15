import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/speakers', label: 'Speakers' },
    { to: '/team', label: 'Team' },
    { to: '/partners', label: 'Partners' },
    { to: '/contact', label: 'Contact' },
  ];

  // linkClass removed; using inline className callbacks for NavLink

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-lg font-bold text-white">TEDxUOK</a>
          </div>

          {/* Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `text-white hover:text-red-400 ${isActive ? 'border-b-2 border-red-600' : ''}`}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 w-64 bg-black text-white transform transition-transform duration-300 ease-in-out z-50 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="text-lg font-bold">Menu</div>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="px-4 pt-2">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `block px-3 py-2 rounded text-white ${isActive ? 'underline decoration-red-600' : 'hover:text-red-400'}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when drawer open */}
      {open && (
        <button
          onClick={() => setOpen(false)}
          aria-hidden
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}
    </header>
  );
}
