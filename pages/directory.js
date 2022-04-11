import React from "react";
import OrganizationCard from '../components/OrganizationCard'
import DemoOrganizations from '../DemoOrganizations';
import orgList from '../demoOrganizations.json';
import { Row, Col } from 'react-simple-flex-grid';
import "react-simple-flex-grid/lib/main.css";
import Link from 'next/link'

export default function Directory() {
    return(
        <div>
            <p style={{position: 'relative', paddingLeft: 20, fontSize:22, fontWeight:"450"}}>Organization Directory</p>
        <Row justify="left">
        <div className="organizations-grid">
            {orgList.map(org => 
                <Col xs={{ span: 2 }} sm={{ span: 3 }} md={{ span: 3 }}
                lg={{ span: 3 }} xl={{ span: 2 }}>
                    <div class="OrgListing">
                    <Link href="/organization">
                        <a><OrganizationCard name={org.name} imageLink={org.imageLink}/></a>
                    </Link>
                    </div>
                </Col>
            )}
         </div>
         </Row>
         </div>
    )
}