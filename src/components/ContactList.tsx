import type { FC } from "react";

interface ContactListProps {
  contactMethods: string[];
}

const ContactList: FC<ContactListProps> = ({ contactMethods }) => {
  return (
    <>
      {contactMethods.map((contact, i) => (
        <div
          key={i}
          className="m-3 flex cursor-pointer flex-row items-center justify-center rounded-2xl bg-gray-200 p-3 hover:bg-gray-300"
        >
          <p className="text-2xl font-bold">{contact}</p>
        </div>
      ))}
    </>
  );
};

export default ContactList;
