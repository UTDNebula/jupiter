import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { type SelectContact } from '@src/server/db/models';
import { type Dispatch, useReducer } from 'react';
import {
  Discord,
  Email,
  Facebook,
  Instagram,
  Twitter,
  Website,
  Youtube,
  type logoProps,
} from './ContactIcons';

type Contact = Omit<SelectContact, 'clubId'>;

const newContact = (platform: Contact['platform']): Contact => {
  return {
    platform: platform,
    url: '',
  };
};

type contactState = {
  used: Array<Contact>;
  available: Array<Contact['platform']>;
};
type action = {
  type: 'add' | 'remove';
  target: Contact['platform'];
};
function Reducer({ used, available }: contactState, action: action) {
  const target = action.target;
  switch (action.type) {
    case 'add':
      return {
        used: [...used, newContact(action.target)],
        available: available.filter((x) => x != target),
      };
    case 'remove':
      return {
        used: used.filter((x) => x.platform != target),
        available: [...available, target],
      };
  }
}
const startContacts: Array<Contact['platform']> = [
  'discord',
  'instagram',
  'website',
  'email',
  'twitter',
  'facebook',
];

const ContactSelector = () => {
  const [{ used, available }, dispatch] = useReducer<
    typeof Reducer,
    contactState
  >(Reducer, { used: [], available: startContacts }, (x) => {
    return x;
  });
  const contacts = used;
  return (
    <div>
      <div className="flex flex-row py-1">
        <h2>Contacts</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-auto rounded-lg bg-slate-200 p-2"
              type="button"
            >
              add new contact
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent>
              <ContactPopup available={available} dispatch={dispatch} />
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
      <div className="space-y-2">
        {contacts &&
          contacts.map((contact) => (
            <ContactInput
              key={contact.platform}
              contact={contact}
              dispatch={dispatch}
            />
          ))}
      </div>
    </div>
  );
};
export default ContactSelector;
type contactPopupProps = {
  available: Contact['platform'][];
  dispatch: Dispatch<action>;
};
const ContactPopup = ({ available, dispatch }: contactPopupProps) => {
  return (
    <DropdownMenuItem className="mb-2 flex h-fit w-40 flex-wrap rounded-lg bg-slate-200 p-2 drop-shadow-md">
      {available.map((plat) => (
        <div
          key={plat}
          className="group h-8 w-8"
          title={plat}
          onClick={() => {
            dispatch({ type: 'add', target: plat });
          }}
        >
          {logo[plat]}
        </div>
      ))}
    </DropdownMenuItem>
  );
};
const styling = 'fill-black transition-colors group-hover:fill-blue-primary';
const logo: logoProps = {
  discord: <Discord className={styling} />,
  youtube: <Youtube className={styling} />,
  twitch: '/nebula-logo.png',
  facebook: <Facebook className={styling} />,
  twitter: <Twitter className={styling} />,
  instagram: <Instagram className={styling} />,
  website: <Website className={styling} />,
  email: <Email className={styling} />,
  other: '/Jupiter.png',
};

type ContactInputProps = {
  contact: Contact;
  dispatch: Dispatch<action>;
};
const ContactInput = ({ contact, dispatch }: ContactInputProps) => {
  return (
    <div className="flex flex-row items-center bg-slate-200 p-2">
      <div className="flex w-fit flex-row items-center rounded-md bg-slate-300 p-2">
        <div className="box-content h-8 w-8">
          <div className="h-8 w-8">{logo[contact.platform]}</div>
        </div>
        <div className="text-xl">{contact.platform}</div>
      </div>
      <div>
        <div>Link here</div>
        <input type="text" />
      </div>
      <button
        className="ml-auto"
        onClick={() => {
          dispatch({ type: 'remove', target: contact.platform });
        }}
      >
        Remove
      </button>
    </div>
  );
};
