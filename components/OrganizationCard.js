import React from 'react';
import OrgDirectoryTag from './tag'


export default function OrganizationCard({name, imageLink}) {
    return(
        <div className="org-card">
            <p>{name}</p>
            <div className="rectangle">
                <img src={`${imageLink}`} width="100%"/>
            </div>
            <OrgDirectoryTag title='Tag' />
        </div>
    )
}