import React, { FC } from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';
import contactStyles from '../contactButtonStyles.json';

type methods = keyof typeof contactStyles;
interface ContactListProps {
  contactMethods: methods[];
}

const ContactList: FC<ContactListProps> = ({ contactMethods }) => {
  return (
    <>
      {contactMethods.map((contact, i) => {
        const style = contactStyles[contact];
        let color = 'text-gray-800';
        let bgColor = '#D3D3D3'; //Default to gray
        // Assert that the style has keys of text and bg
        if (style && 'text' in style && 'bg' in style) {
          color = style.text;
          bgColor = style.bg;
        }
        return (
          <a href="https://www.utdnebula.com" key={i}>
            <div
              className={`flex flex-row justify-center items-center p-3 m-3 rounded-2xl cursor-pointer ${color}`}
              style ={{backgroundColor: bgColor}}
            >
              <p className="text-2xl font-bold">{contact}</p>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default ContactList;
