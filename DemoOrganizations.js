import React from 'react';
import OrgList from './demoOrganizations.json';

const DemoOrganizations = () => {
    return(
        <Row>
        <div className="organizations">
            <Col>
            {orgList.map(org => <div>{org.name}</div>)}
            </Col>
        </div>
        </Row>
    )
}

export default DemoOrganizations;