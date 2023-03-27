import Link from 'next/link';
import { type FC, useState } from 'react';
import logo from '../../../assets/media/icons/Jupiter.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface MobileNavProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const MobileNav: FC<MobileNavProps> = ({ open, setOpen }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen transform bg-white ${
        open ? '-translate-x-0' : '-translate-x-full'
      } drop-shadow-md filter transition-transform duration-300 ease-in-out `}
    >
      <div className="flex h-20 items-center justify-center bg-white filter">
        {' '}
        {/*logo container*/}
        <Image src={logo} alt="Jupiter" width={120} height={40}></Image>
        <NavLink to="/">Explore</NavLink>
      </div>
      <div className="ml-4 flex flex-col">
        <Link passHref href="/about">
          <p
            className="my-4 text-xl font-medium"
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
            className="my-4 text-xl font-normal"
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
    <nav className="flex h-20 items-center bg-white px-4 py-4 align-middle filter">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="flex w-3/12 items-center">
        <Image
          src={logo}
          alt="Jupiter"
          width={120}
          height={40}
          onClick={() => void router.push('/')}
          className="cursor-pointer"
        />
        <div className="hidden md:block">
          <NavLink to="/">Explore</NavLink>
        </div>
      </div>
      <div className="flex w-9/12 items-center justify-end">
        <div
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-between md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full transform rounded-lg bg-black transition duration-300 ease-in-out ${
              open ? 'translate-y-3.5 rotate-45' : ''
            }`}
          />
          <span
            className={`h-1 w-full rounded-lg bg-black transition-all duration-300 ease-in-out ${
              open ? 'w-0' : 'w-full'
            }`}
          />
          <span
            className={`h-1 w-full transform rounded-lg bg-black transition duration-300 ease-in-out ${
              open ? '-translate-y-3.5 -rotate-45' : ''
            }`}
          />
        </div>
        <div className="hidden align-middle md:flex">
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
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return !loggedIn ? (
    <button
      className="ml-4 rounded-lg bg-blue-700 px-4 py-2 align-middle text-white"
      onClick={handleLogin}
    >
      Sign In
    </button>
  ) : (
    <div className="flex items-center">
      {/* Temporary gray circle for user pfp */}
      <div className="relative flex flex-col items-center justify-start text-center">
        <div
          className="h-10 w-10 rounded-full bg-gray-400"
          onClick={handleProfileClick}
        ></div>
        <div
          className={`${
            menuOpen ? 'visible' : 'invisible'
          } absolute mt-14 w-32 rounded-sm border-2 border-gray-200 bg-white p-1`}
        >
          <DropDownLink to="/">Username</DropDownLink>
          <DropDownLink to="/">Settings</DropDownLink>
          <DropDownLink to="/">Sign Out</DropDownLink>
        </div>
      </div>
      <button
        className="ml-4 rounded-lg bg-blue-700 px-4 py-2 align-middle text-white"
        onClick={handleLogin}
      >
        Sign Out
      </button>
    </div>
  );
};

interface DropDownLinkProps {
  to: string;
}

function DropDownLink({
  to,
  children,
}: React.PropsWithChildren<DropDownLinkProps>) {
  return (
    <Link href={to} passHref>
      <button className="w-full hover:bg-gray-100">{children}</button>
    </Link>
  );
}

interface NavLinkProps {
  to: string;
}

function NavLink({ to, children }: React.PropsWithChildren<NavLinkProps>) {
  return (
    <Link href={to} passHref>
      <button className="mx-4 cursor-pointer text-blue-700">{children}</button>
    </Link>
  );
}
