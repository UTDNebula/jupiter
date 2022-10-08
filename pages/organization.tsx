<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import ContactList from '../components/ContactList';
import orgData from '../demoOrgPageData.json';

export default function Directory() {
  return (
    <div>
      <p
        style={{
          position: 'relative',
          paddingLeft: 20,
          paddingTop: 10,
          fontSize: 35,
          fontWeight: '450',
        }}
      >
        {orgData.name}
      </p>
      <div
        style={{
          justifyItems: 'left',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <div>
          <p
            style={{
              position: 'relative',
              paddingLeft: 20,
              paddingTop: 10,
              fontSize: 25,
              fontWeight: '450',
            }}
          >
            About Us
          </p>
          <div className="detail-org-image-container">
            <div className="detail-org-image" />
          </div>
        </div>
        <p style={{ paddingTop: 40, fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec
          ligula vel lacus iaculis egestas. Donec tincidunt bibendum mattis.
          Morbi leo lorem, dapibus eget purus vitae, pellentesque porta tortor.
          Duis molestie molestie venenatis. Sed id porttitor ante. Ut pretium,
          sapien sed venenatis tristique, eros nunc vulputate elit, eu malesuada
          lacus metus sit amet urna. Vivamus placerat eros ipsum. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; <br /> Aliquam sed nisi sed nunc vestibulum vestibulum. Integer
          at aliquet augue, dapibus facilisis nisi. Maecenas sit amet rhoncus
          magna. Mauris fringilla vel lorem nec luctus. Donec tincidunt ante et
          mi malesuada bibendum. In mattis porta nisl ut tincidunt. Aenean vel
          orci erat. Duis feugiat augue purus, vel mattis odio maximus finibus.
          Etiam est justo, semper quis mattis vel, mattis sed orci. Ut sed
          facilisis magna, eget sagittis metus. Proin in pharetra mauris, id
          egestas ligula. Donec venenatis arcu mauris, et tempus massa convallis
          id. Donec feugiat a ante id suscipit. Nulla condimentum non odio in
          feugiat. Donec euismod risus in ipsum dignissim pharetra.
        </p>
        <div style={{ paddingLeft: 20 }}>
          <p
            style={{
              position: 'relative',
              paddingTop: 10,
              fontSize: 25,
              fontWeight: '450',
            }}
          >
            Contact
          </p>
          <ContactList contactMethods={['Discord', 'Instagram', 'Email']} />
        </div>
      </div>
      <p
        style={{
          position: 'relative',
          paddingLeft: 20,
          paddingTop: 20,
          fontSize: 25,
          fontWeight: '400',
        }}
      >
        Upcoming Events
      </p>
    </div>
  );
}
=======
import React from "react";
=======
import DirectoryOrgHeader from './../DirectoryOrgHeader';
import React, { FC } from 'react';
import ContactList from '../components/ContactList';
import DirectoryOrgTags from '../components/DirectoryOrgTags';
>>>>>>> 4727fe7 (Update grid to be more responsive and further break down org cards and org tags with small updates)
import orgData from '../demoOrgPageData.json';
import Image from 'next/image';

<<<<<<< HEAD
export default function Directory() {
    return(
        <div>
            <p style={{position: 'relative', paddingLeft: 20, paddingTop: 10, fontSize:35, fontWeight:"450"}}>{orgData.name}</p>

            <p style={{position: 'relative', paddingLeft: 20, paddingTop: 10, fontSize:25, fontWeight:"450"}} >About Us</p>
            <div style={{display:"grid",  gridTemplateColumns:"1fr 1fr"}}>
            <div class="detail-org-image-container">
                <div class="detail-org-image"/>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec ligula vel lacus iaculis egestas. Donec tincidunt bibendum mattis. Morbi leo lorem, dapibus eget purus vitae, pellentesque porta tortor. Duis molestie molestie venenatis. Sed id porttitor ante. Ut pretium, sapien sed venenatis tristique, eros nunc vulputate elit, eu malesuada lacus metus sit amet urna. Vivamus placerat eros ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; <br /> Aliquam sed nisi sed nunc vestibulum vestibulum. Integer at aliquet augue, dapibus facilisis nisi. Maecenas sit amet rhoncus magna. Mauris fringilla vel lorem nec luctus. Donec tincidunt ante et mi malesuada bibendum. In mattis porta nisl ut tincidunt. Aenean vel orci erat. Duis feugiat augue purus, vel mattis odio maximus finibus. Etiam est justo, semper quis mattis vel, mattis sed orci. Ut sed facilisis magna, eget sagittis metus. Proin in pharetra mauris, id egestas ligula. Donec venenatis arcu mauris, et tempus massa convallis id. Donec feugiat a ante id suscipit. Nulla condimentum non odio in feugiat. Donec euismod risus in ipsum dignissim pharetra.</p>
            </div>
        </div>
    )
}
>>>>>>> e94679d (Add existing skeleton layout)
=======
// Creating props for the component so that they can be passed in
// Whenever we are able to hook up the backend to the frontend
// To get org data from the backend, we can just pass in the org data
interface Props {
  org: typeof orgData;
}

// Replace orgData with org when we are able to get org data from the backend
const Directory: FC<Props> = ({ org }) => {
  return (
    <main>
      <div className="grid grid-cols-6 gap-4 p-3 align-middle">
        <DirectoryOrgHeader name={orgData.name} tags={orgData.tags} />
        <div className="col-span-2 p-3">
          <h1 className="text-3xl font-bold">About Us</h1>
          <Image
            src={orgData.imageLink}
            width="100%"
            height="100%"
            alt={orgData.name}
          />
        </div>
        <div className="flex col-span-3 p-3 justify-center">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
            ut. Aliquid est et laboriosam nulla minima deleniti id, nostrum sint
            obcaecati! Repellat molestiae non facere nisi quis omnis ex optio.
          </p>
        </div>
        <div className="col-span-2 p-3">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <ContactList contactMethods={['Discord', 'Instagram', 'Email']} />
        </div>
      </div>
    </main>
  );
};

export default Directory;
>>>>>>> 4727fe7 (Update grid to be more responsive and further break down org cards and org tags with small updates)
