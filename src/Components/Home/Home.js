import React, { Component } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Button from "@material-ui/core/Button";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: []
    };

    this.updateQueryString = this.updateQueryString.bind(this);
  }

  convertObjectToQueryString(params) {
    return Object.entries(params).map(([k, v]) => {
      return encodeURIComponent(k) + "=" + encodeURIComponent(v !== undefined ? v : "")
    }).join("&");
  }


  updateQueryString(newValues) {
    let currentQs = queryString.parse(this.props.location.search);
    let newQS = { ...currentQs, ...newValues };
    this.props.history.push("/?" + this.convertObjectToQueryString(newQS));
  }

  async fetchData() {

    this.setState({ loading: true });

    let qsAsObject = queryString.parse(this.props.location.search);
    let searchItem = qsAsObject.term != null ? qsAsObject.term : '';
    let data = await Api.getItems(searchItem);
    let results = {'data' : data, 'totalLength': data.length};

    this.setState({
      items: results.data,
      loading: false,
      totalItemsCount: results.totalLength
    });
  }

  componentDidMount() {
    this.fetchData();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {

    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search)

    let check1 = Object.entries(currentQS).some(([k, v]) => v !== oldQS[k]);
    let check2 = Object.entries(oldQS).some(([k, v]) => v !== currentQS[k]);
    let isDifferent = check1 || check2;

    if (isDifferent) {
      this.fetchData();
    }
  }

  handleSortChange = e => {
    this.updateQueryString({ sortValue: e.value });
  };

  

  render() {
   // let qs = queryString.parse(this.props.location.search);
  

    if (this.state.loading)
      return (
        <CircularProgress className="circular" />
      );

    return (
      <div
      >
        <div className="left-part">
            <input
            required
              placeholder="Search film"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              style={{ marginLeft: 30 ,border: "none",width:"30%",padding:"10px"}}
            />

            <Button
              style={{ marginLeft: 20,background: "purple",
                
                color: "white" }}
              variant="outlined"
              color="primary"
              onClick={() => {
                this.props.history.push(
                  "/?term=" +
                  this.state.searchTerm
                );
              }}
            >
              {" "}
              Search
            </Button>
          </div>
        <div style={{ padding: 10, display: "flex", alignItems: "center" }}>
          <div style={{ flex: 1, fontSize: 24 ,color : 'white',textAlign:"center"}}>
            <div>Search Result</div>
            {!this.state.loading && (
              <div style={{ fontSize: 12, color: "gray", marginTop: 5 }}>
                Total results found: {this.state.totalItemsCount}
              </div>)}
          </div>    
          
        </div>
        {/* Here go the items */}
        {
          this.state.items.map(item => {
            return <Item style={{display: "grid", alignItems:"center"}}  key={item.show.id} item={item} />;
          })
        }
        
      </div >
    );
  }
}

export default Home;
