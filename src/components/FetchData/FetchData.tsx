import * as React from "react";
import CommunityDisplay from '../communities/CommunityDisplay'

class FetchData extends React.Component<{}, any> {
  constructor(props:{}){
    super(props);
    this.state = {
      communityNames: [],
      communityPrices: [],
      errors: null,
      isLoaded: false
    }
  }

  componentDidMount(){
    
  }



  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default FetchData;