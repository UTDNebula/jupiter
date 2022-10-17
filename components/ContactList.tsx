import React, { FC } from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';

interface ContactListProps {
  contactMethods: string[];
}

const ContactList: FC<ContactListProps> = ({ contactMethods }) => {
  return (
    <>
      {contactMethods.map((contact, i) => (
        <div
          key={i}
          className="flex flex-row justify-center items-center p-3 m-3 rounded-2xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
        >
          <p className="text-2xl font-bold">{contact}</p>
        </div>
      ))}
    </>
  );
};

export default ContactList;
