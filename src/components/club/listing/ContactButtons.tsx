import type { SelectContact as Contacts } from '@src/server/db/models';
import { logo } from '@src/icons/ContactIcons';
import Link from 'next/link';

type contentButtonProps = {
  contacts: Array<Contacts>;
};
const ContactButtons = ({ contacts }: contentButtonProps) => {
  return (
    <div className="flex flex-row content-center gap-x-4">
      {contacts.map((item) => (
        <button
          key={item.url}
          className="group relative h-min self-center rounded-full bg-slate-100 p-2.5 transition-colors hover:bg-blue-700"
        >
          <Link href={item.url} target="_blank">
            <div className="relative h-8 w-8">{logo[item.platform]}</div>
          </Link>
        </button>
      ))}
    </div>
  );
};

export default ContactButtons;
