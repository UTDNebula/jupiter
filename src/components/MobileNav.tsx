'use client';

import { useState } from 'react';
import MobileNavMenu from './MobileNavMenu';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <div className="block md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-black-500 hover:text-black-400 flex items-center rounded px-3 py-2 ${
            isOpen ? 'hidden' : 'block'
          }`}
        >
          <svg
            className={`h-6 w-6 fill-current ${isOpen ? 'hidden' : 'block'}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    );

  return <MobileNavMenu setIsOpen={setIsOpen} />;
};

export default MobileNav;
