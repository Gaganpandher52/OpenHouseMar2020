import React from 'react';
import CommunityDisplay from '../components/communities/CommunityDisplay'


const MainRender = () => {
  return (
    <div>
      <h4 style={{color:'white', textAlign:'center'}}>Geographical Communities of Calgary</h4>
      <CommunityDisplay/>
    </div>
  );
};

export default MainRender;