import React from 'react';
import CommunityDisplay from '../components/communities/CommunityDisplay'
import FetchData from '../components/FetchData/FetchData'

const MainRender = () => {
  return (
    <div>
      <CommunityDisplay/>
      <FetchData/>
    </div>
  );
};

export default MainRender;