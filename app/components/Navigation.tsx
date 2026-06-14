'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HackClubBrand } from '../config/branding';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Members', href: '/members' },
    { label: 'Projects', href: '/projects' },
  ];

  return (
    <nav
      className="border-b"
      style={{
        backgroundColor: HackClubBrand.colors.darkBackground,
        borderBottomColor: HackClubBrand.colors.darkBorder,
        boxShadow: HackClubBrand.shadows.card,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img 
              src={HackClubBrand.logos.iconRounded} 
              alt="Hack Club" 
              className="h-10 w-auto rounded-full" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white hover:bg-opacity-10 transition"
                style={{
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-white hover:bg-opacity-10 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#ffffff' }}
          >
            <span className="sr-only">Open main menu</span>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white hover:bg-opacity-10 transition"
                style={{ color: '#ffffff' }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
