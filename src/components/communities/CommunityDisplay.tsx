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

  returnSpecificPrice(incoming:any){
    const {communityNames, communityPrices} = this.state;
    let initialState:any[] = [];
    let prices:any[] = [];

    if(communityNames.length > 0 && communityPrices.length > 0  ){
      communityNames.forEach(
        (e1:any) =>
        communityPrices.forEach((e2:any) => {
          if (e1.id === e2.communityId) {
            initialState.push({
              id: e1.id,
              price: e2.price
            });
          } //if
        }) //nested
        ); //forEach
        //this forEach compare the incoming id with stored in initial State
        initialState.forEach(i => {
          if (incoming === i.id) {
            prices.push(i.price);
          }
        });
      }
      /* return the price. Uses reduce to sum the array and tofixed and else for easy readability*/
    if (prices.length === 0 || initialState.length === 0 ) {
      return "*coming soon";
    }
    console.log(initialState);
    console.log(prices);

    return (
      "$" +
      (prices.reduce((a, b) => a + b, 0) / prices.length)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }
  


  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default CommunityDisplay;