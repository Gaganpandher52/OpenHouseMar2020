import * as React from "react";
import CommunityDisplay from '../communities/CommunityDisplay'

class FetchData extends React.Component<{}, any> {
  constructor(props:{}){
    super(props);
    this.state = {
      communityNames: [],
      communityPrices: [],
      errors: null,
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

  CommunityDataFetch = ({requestedData}:{requestedData:any}) =>{
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
          error: true
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
          error: true
        })
      });
  }



  render() {
    return (
      <div>
        <CommunityDisplay />
        
      </div>
    );
  }
}

export default FetchData;