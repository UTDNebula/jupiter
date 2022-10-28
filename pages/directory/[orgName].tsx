import React from 'react';
import Router, { useRouter } from 'next/router';

const OrganizationPage = () => {
  const router = useRouter();
  const orgName = router.query.orgName as string;
  return <div>{orgName}</div>;
};

export default OrganizationPage;
