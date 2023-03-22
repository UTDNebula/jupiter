import Link from 'next/link';
import React, { FC, useState } from 'react';
import logo from '../../assets/media/icons/Jupiter.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';

interface MobileNavProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const links = [
  { href: '/directory', label: 'Directory' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
];

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
        <div>Explore</div>
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

const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
        <Link href="/" passHref className="hidden md:block select-none">
          <div className="flex m-2 items-center cursor-pointer">Explore</div>
        </Link>
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
        <div className="hidden md:flex select-none">
          {links.map(({ href, label }) => (
            <Link href={href} passHref key={href}>
              <div className="flex m-2 items-center cursor-pointer">
                {label}
              </div>
            </Link>
          ))}
          <Profile />
        </div>
      </div>
    </nav>
  );
};

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const handleProfileClick = () => setMenuOpen((prev) => !prev);

  return status === 'unauthenticated' ? (
    <button
      className="bg-blue-700 text-white px-4 py-2 rounded-lg ml-4 align-middle"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  ) : (
    <div className="flex items-center">
      {/* Temporary gray circle for user pfp */}
      <div className="flex flex-col justify-start text-center items-center relative">
        <Image
          src={session?.user?.image || logo}
          alt="User Profile Picture"
          width={40}
          height={40}
          className="rounded-full"
          onClick={handleProfileClick}
        />
        <div
          className={`${
            menuOpen ? 'visible' : 'invisible'
          } absolute mt-14 bg-white w-32 p-1 rounded-sm border-2 border-gray-200`}
        >
          <div>{session?.user?.name}</div>
          <Link href="/settings" passHref>
            <div className="hover:bg-gray-100 cursor-pointer">Settings</div>
          </Link>
          <button
            className="hover:bg-gray-100 w-full select-none"
            onClick={() => signOut()}
          >
            Log Out
          </button>
        </div>
      </div>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded-lg ml-4 align-middle select-none"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
