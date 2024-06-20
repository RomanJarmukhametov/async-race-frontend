'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Wrapper from '@/components/custom/Wrapper';
import Logo from '@/components/custom/Logo';

const links = [
  { href: '/garage', label: 'Garage' },
  { href: '/winners', label: 'Winners' },
];

/**
 * The `Header` function in TypeScript React renders a header component with a logo and navigation
 * links that change color based on the current pathname.
 * @returns The `Header` component is being returned. It consists of a header element with a background
 * color of gray and white text. Inside the header, there is a flex container with a logo on the left
 * and a navigation menu on the right. The navigation menu contains a list of links with hover effects
 * and active link styling based on the current pathname.
 */
function Header() {
  const pathname = usePathname();

  return (
    <Wrapper
      as="header"
      className="bg-gray-800 text-white"
    >
      <div className="flex items-center justify-between">
        <Logo />
        <nav>
          <ul className="flex space-x-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`hover:text-yellow-400 transition-colors duration-300 ease-in-out ${
                    pathname === href ? 'text-yellow-400' : ''
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Wrapper>
  );
}

export default Header;
