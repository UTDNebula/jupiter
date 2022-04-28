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
import orgData from '../demoOrgPageData.json';

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
