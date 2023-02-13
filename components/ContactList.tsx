import React, { FC } from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';
import contactStyles from '../contactButtonStyles.json';

interface ContactListProps {
  contactMethods: string[];
}

const ContactList: FC<ContactListProps> = ({ contactMethods }) => {
  return (
    <>
      {contactMethods.map((contact, i) => (
        <a href="https://www.utdnebula.com">
        <div
          key={i}
          className="flex flex-row justify-center items-center p-3 m-3 rounded-2xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
          style={{backgroundColor:(contactStyles[contact] ?? contactStyles["Default"]).bg, color:(contactStyles[contact] ?? contactStyles["Default"]).text}}  >
          <p className="text-2xl font-bold">{contact}</p>
        </div>
        </a>
      ))}
    </>
  );
};

export default ContactList;
