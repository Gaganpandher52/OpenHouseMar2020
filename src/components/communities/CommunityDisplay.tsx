import * as React from "react";
import "./CommunityDisplay.css";
const defaulImage = "https://homestaymatch.com/images/no-image-available.png";

 //***** This method sort the array of names *********//
function sortNames(a: { name: string; }, b: { name: string; }) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

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

  //************************** These two method does all the fetching data fom api *****************************//
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
          communityNames: JSON.parse(result).sort(sortNames)
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
  //**************************These two method does all the fetching data fom api  *********************************//

  //********** returnSpecificPrice method handles and returns the average price given the parameter ***********//
  returnSpecificPrice(incoming:string){
    const {communityNames, communityPrices} = this.state;
    let initialState:any[] = [];
    let prices:any[] = [];

    if(communityNames.length > 0 && communityPrices.length > 0  ){
      communityNames.forEach(
          (e1:{ id: any; }) =>
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
    if (prices.length === 0) {
      return " Coming Soon";
    }
    return (
      "$" +
      (prices.reduce((a, b) => a + b, 0) / prices.length)
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  }
  render() {
    const {communityNames, communityPrices, errors, isLoaded} = this.state;
    if(errors){
      return <h3 style={{color:'white', textAlign:'center'}}> *** Sorry! There seems to be something Wrong on our End ***</h3>
    }
    if(communityNames.length === 0 || communityPrices.length === 0   ){
      return (
        <h4 style={{color:'white', textAlign:'center'}}> Sorry, Currenly no home to view</h4>
        );
    }
    if(communityNames && communityPrices){
      return (<div>
              <p className="name-items">
                {this.state.communityNames.map((name:any) => (
                  <p key={name}>
                    <div className="new-container">
                      {
                        <img
                        src={name.imgUrl === "" ? defaulImage : name.imgUrl}
                        ></img>
                      }
                      <div className="text-block">
                        <h4 style={{background:'black',color:'white'}}>{name.name}</h4>
                        <h5 style={{background:'black',color:'white'}}>Average Price {this.returnSpecificPrice(name.id)}</h5>
                      </div>
                    </div>
                  </p>
                ))}
              </p>
            </div>
            )
    }
  }
}

export default CommunityDisplay;