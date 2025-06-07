'use client';

import { useState } from 'react';

/**
 * Navbar is a component that displays a navigation bar with a logo, navigation links, and a dropdown menu.
 * @returns {React.FC<NavbarProps>} Navbar component
 */
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-transparent backdrop-blur-md border-b border-border/20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div
                className="w-8 h-8 bg-black flex items-center justify-center relative"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              >
                <div className="w-4 h-4 bg-white rounded-full absolute top-6"></div>
              </div>
              <span className="text-lg font-semibold text-foreground">
                Estbel
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/dashboard"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/projects"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Eventos
              </a>
              <a
                href="/analytics"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Miembros
              </a>
              <a
                href="/analytics"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Asistencia
              </a>
            </nav>
          </div>

          {/* Right side - Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  U
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={closeDropdown}
                ></div>
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg border border-border z-20">
                  <div className="py-1">
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      onClick={closeDropdown}
                    >
                      Configuración
                    </a>
                    <button
                      onClick={() => {
                        closeDropdown();
                        // Add logout logic here
                        console.log('Logout clicked');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
