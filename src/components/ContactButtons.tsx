import type { SelectContact as Contacts } from '@src/server/db/models';
import type { FC } from 'react';
import Image from 'next/image';

type logoProps = {
  discord: string;
  youtube: string;
  twitch: string;
  facebook: string;
  twitter: string;
  instagram: string;
  website: string;
  email: string;
  other: string;
};

const logo: logoProps = {
  discord: '/favicon-16x16.png',
  youtube: '/nebula-logo.png',
  twitch: '/nebula-logo.png',
  facebook: '/nebula-logo.png',
  twitter: '/nebula-logo.png',
  instagram: '/nebula-logo.png',
  website: '/nebula-logo.png',
  email: '/nebula-logo.png',
  other: '/Jupiter.png',
};

const ContactButtons: FC<{ contact: Contacts[] }> = ({ contact }) => {
  return (
    <>
      {contact.map((item) => (
        <button
          key={item.url}
          className="relative mx-2 my-5 rounded-full bg-slate-100 px-4 py-1 transition-colors hover:bg-slate-300"
        >
          <a target="__blank__" href={item.url}>
            <div className="relative h-6 w-6 ">
              <Image
                src={logo[item.platform]}
                alt={item.platform}
                fill
                priority
              />
            </div>
          </a>
        </button>
      ))}
    </>
  );
};

export default ContactButtons;
