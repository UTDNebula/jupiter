import type { SelectContact as Contacts } from '@src/server/db/models';
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

type contentButtonProps = {
  contacts: Array<Contacts>;
};
const ContactButtons = ({ contacts }: contentButtonProps) => {
  return (
    <div className="flex flex-row content-center gap-x-4">
      {contacts.map((item) => (
        <button
          key={item.url}
          className="relative h-min self-center rounded-full bg-slate-100 p-2.5 transition-colors hover:bg-slate-300"
        >
          <a target="__blank__" href={item.url}>
            <div className="relative h-8 w-8 ">
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
    </div>
  );
};

export default ContactButtons;
