import Link from 'next/link';
import React, { FC, useState } from 'react';
import logo from '../../assets/media/icons/Jupiter.png';
import Image from 'next/image';

interface MobileNavProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNav: FC<MobileNavProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen bg-white transform w-40 z-10 flex flex-col ${
        open ? '-translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex flex-col justify-center filter bg-white py-2">
        {' '}
        {/*logo container*/}
        <Image src={logo} alt="Jupiter" width={120} height={40}></Image>
        <div className="btn btn-ghost">
          <Link href="/">Explore</Link>
        </div>
      </div>
      <div className="flex flex-col ml-4">
        <Link passHref href="/about">
          <p
            className="text-xl font-medium my-4 btn btn-ghost"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            About
          </p>
        </Link>
        <Link passHref href="/contact">
          <p
            className="text-xl font-normal my-4 btn btn-ghost"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            Contact
          </p>
        </Link>
      </div>
    </div>
  );
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Temporary login/logout button
  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <div className="navbar bg-base-100">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="navbar-start">
        <Link href="/" passHref>
          <Image
            src={logo}
            alt="Jupiter"
            width={120}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <div className="hidden md:flex btn btn-ghost px-3">
          <Link href="/">Explore</Link>
        </div>
      </div>
      <div className="navbar-end">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? 'rotate-45 translate-y-3.5' : ''
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${
              open ? '-rotate-45 -translate-y-3.5' : ''
            }`}
          />
        </div>
        <div className="hidden md:flex">
          <div className="btn btn-ghost">
            <Link href="/directory">Directory</Link>
          </div>
          <div className="btn btn-ghost">
            <Link href="/events">Events</Link>
          </div>
          <div className="btn btn-ghost">
            <Link href="/about">About</Link>
          </div>
          <Profile handleLogin={handleLogin} loggedIn={loggedIn} />
        </div>
      </div>
    </div>
  );
}

interface ProfileProps {
  loggedIn: boolean;
  handleLogin: () => void;
}

const Profile: FC<ProfileProps> = ({ loggedIn, handleLogin }) => {
  return !loggedIn ? (
    <button className="btn btn-primary" onClick={handleLogin}>
      Sign In
    </button>
  ) : (
    <div className="flex items-center">
      {/* Temporary gray circle for user pfp */}
      <div className="bg-gray-400 rounded-full w-10 h-10 mx-4"></div>
      <button className="btn btn-secondary" onClick={handleLogin}>
        Sign Out
      </button>
    </div>
  );
};
