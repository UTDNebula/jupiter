import Link from 'next/link';
import React, { FC, useState } from 'react';
import logo from '../../assets/media/icons/Jupiter.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MobileNavProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNav: FC<MobileNavProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${
        open ? '-translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter bg-white h-20">
        {' '}
        {/*logo container*/}
        <Image src={logo} alt="Jupiter" width={120} height={40}></Image>
        <NavLink to="/">Explore</NavLink>
      </div>
      <div className="flex flex-col ml-4">
        <Link passHref href="/about">
          <p
            className="text-xl font-medium my-4"
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
            className="text-xl font-normal my-4"
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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Temporary login/logout button
  const handleLogin = () => {
    setLoggedIn(!loggedIn);
  };

  return (
    <nav className="flex filter bg-white px-4 py-4 h-20 items-center align-middle">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <Image
          src={logo}
          alt="Jupiter"
          width={120}
          height={40}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />
        <div className="hidden md:block">
          <NavLink to="/">Explore</NavLink>
        </div>
      </div>
      <div className="w-9/12 flex justify-end items-center">
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
        <div className="hidden md:flex align-middle">
          <NavLink to="/directory">Directory</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/about">About</NavLink>
          <Profile handleLogin={handleLogin} loggedIn={loggedIn} />
        </div>
      </div>
    </nav>
  );
}

interface ProfileProps {
  loggedIn: boolean;
  handleLogin: () => void;
}

const Profile: FC<ProfileProps> = ({ loggedIn, handleLogin }) => {
  return !loggedIn ? (
    <button
      className="bg-blue-700 text-white px-4 py-2 rounded-lg ml-4 align-middle"
      onClick={handleLogin}
    >
      Sign In
    </button>
  ) : (
    <div className="flex items-center">
      {/* Temporary gray circle for user pfp */}
      <div className="bg-gray-400 rounded-full w-10 h-10 ml-4"></div>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-lg ml-4 align-middle"
        onClick={handleLogin}
      >
        Sign Out
      </button>
    </div>
  );
};

interface NavLinkProps {
  to: string;
}

function NavLink({ to, children }: React.PropsWithChildren<NavLinkProps>) {
  return (
    <Link href={to} passHref>
      <button className="mx-4 text-blue-700 cursor-pointer">{children}</button>
    </Link>
  );
}
