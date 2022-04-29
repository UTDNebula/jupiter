import React from 'react';
import OrgDirectoryTag from './OrgDirectoryTag';

interface ContactListProps {
  contactMethods: string[];
}

export default function ContactList({
  contactMethods
}: ContactListProps) {
  return (
    <div>
      {contactMethods.map((contact) => (
          <div>
            <p className="contactButton">{contact}</p>
          </div>
      ))}
    </div>
  );
}
