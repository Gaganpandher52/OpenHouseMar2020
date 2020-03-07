import * as React from "react";
import CommunityDisplay from '../communities/CommunityDisplay'

interface props {
  communityNames: Array<any>,
  communityPrices: Array<any>,
  errors: boolean,
  loadInfo: boolean

}

class FetchData extends React.Component<{}, props> {
  constructor(props:{}){
    super(props);
    this.state = {
      communityNames: [],
      communityPrices: [],
      errors: false,
      loadInfo: false
    }
  }

  componentDidMount(){
    const requestedData = {
      method: 'GET',
      redirect: 'follow'
    };

    this.CommunityDataFetch({requestedData: requestedData})
    this.PriceDataFetch({requestedData: requestedData})
  }

  CommunityDataFetch = ({requestedData,}:{requestedData:any}) =>{
    fetch("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities", requestedData)
      .then(response => {
        this.setState({
        });
        return response.text();
      })
      .then((result) => {
        this.setState({
          loadInfo: true,
          communityNames: JSON.parse(result)
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          errors: true
        })
      });
  }

  PriceDataFetch = ({requestedData}:{requestedData:any}) =>{
    fetch("https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes", requestedData)
      .then(response => {
        this.setState({
        });
        return response.text();
      })
      .then((result) => {
        this.setState({
          loadInfo: true,
          communityPrices: JSON.parse(result)
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          errors: true
        })
      });
  }
  

  render() {
    interface props {
      communityNames: Array<any>,
      communityPrices: Array<any>,
      errors: boolean,
      loadInfo: boolean
    
    }
    return (
      <div>
        <CommunityDisplay/>
        
      </div>
    );
  }
}

export default FetchData;