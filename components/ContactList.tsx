import React, { FC } from 'react';

interface ContactListProps {
  contactMethods: string[];
}

const ContactList: FC<ContactListProps> = ({ contactMethods }) => {
  return (
    <>
      {contactMethods.map((contact, i) => (
        <div
          key={i}
          className="flex flex-row justify-center items-center p-3 m-3 rounded-2xl bg-gray-200"
        >
          <p className="contactButton">{contact}</p>
        </div>
      ))}
    </>
  );
};

export default ContactList;
