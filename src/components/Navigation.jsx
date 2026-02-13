import { useState, useEffect } from 'react';

const SECTIONS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'];

export default function Navigation({ activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setActiveSection(section.toLowerCase());
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="nav"
      style={{
        background: scrolled ? 'rgba(26, 27, 38, 0.98)' : 'rgba(26, 27, 38, 0.95)',
      }}
    >
      <div className="container">
        <div className="nav-content">
          <a href="#home" className="nav-logo">
            GM
          </a>
          <ul className="nav-menu">
            {SECTIONS.map((section) => (
              <li key={section}>
                <a
                  href={`#${section.toLowerCase()}`}
                  className={`nav-link ${activeSection === section.toLowerCase() ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, section)}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
