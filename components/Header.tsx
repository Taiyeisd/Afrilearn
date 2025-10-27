"use client";
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useState } from 'react';

const navigation = [
  { name: 'Solutions', href: '/solutions' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Insights', href: '/insights' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-blue-600 backdrop-blur-sm z-50 border-b border-zinc-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link href="/" className="font-bold text-xl text-white">
              Soteria Learning
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white transition-all duration-200 ease-out hover:text-orange-300 relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-300 transform scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
            <button className="text-sm font-bold text-blue-600 bg-white px-2 py-1 rounded-lg transition-all duration-200 ease-out hover:bg-orange-400 hover:text-zinc-900 hover:scale-105 active:scale-95">
              Get Started
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-300"
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-white transition-all duration-200 ease-out hover:bg-orange-500 hover:text-zinc-900 hover:pl-4 relative overflow-hidden group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span className="absolute inset-0 bg-orange-500 transform -translate-x-full transition-transform duration-200 ease-out group-hover:translate-x-0" />
                </Link>
              ))}
              <button className="block w-full px-3 py-2 text-left text-base font-medium text-orange-500 transition-all duration-200 ease-out hover:bg-orange-500 hover:text-white rounded-md">
                EN
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}