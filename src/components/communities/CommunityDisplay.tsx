import * as React from "react";

class CommunityDisplay extends React.Component<{}, any> {

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

export default CommunityDisplay;