import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";
import { connect } from "react-redux";
import Markup  from 'interweave';




class ConnectedDetails extends Component {
  constructor(props) {
    super(props);

    this.isCompMounted = false;

    this.state = {
      item: null,
      loading: false
    };
  }

  async fetchItemUsingID(id) {
    this.setState({ loading: true });
    let item = Api.getItemUsingID(id);

    if (this.isCompMounted) {
      this.setState({
        item,
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchItemUsingID(this.props.match.params.id);

    }
  }


  componentDidMount() {
    this.isCompMounted = true;
    this.fetchItemUsingID(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }



  render() {
    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div style={{ padding: 10 }}>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 24,
            textAlign : "center",
            color: "#f9748f"
  
          }}
        >
          {this.state.item.show.name}
        </div>
        <div style={{ display: "flex" }}>
        
          <img src={this.state.item.show.image ? this.state.item.show.image.original :'https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg'} alt="" width={400} height={600} style={{ borderRadius: "5%", objectFit: "cover" }} />
          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <fieldset>
              <legend style={{ fontSize: 18, marginTop: 10, color : "purple" }}
              >General Informations
              </legend>
            <ul>
            <li>
              <div style={{ fontSize: 18, marginTop: 10 ,color : "white" }}>
            Score: {parseFloat(this.state.item.score).toFixed(2)} /20
            </div>
            </li>
            <li>
            <div style={{ fontSize: 18, marginTop: 10 ,color : "white" }}>
            Language: {this.state.item.show.language} 
            </div>
            </li>
            <li>
            <div style={{ fontSize: 18, marginTop: 10 ,color : "white"  }}>
            Running time: {this.state.item.show.runtime} 
            </div>
            </li>
            <li>
            <div style={{ fontSize: 18, marginTop: 10,color : "white"  }}>
            Release date: {this.state.item.show.premiered} 
            </div>
            </li>
            <li>
            <div style={{ fontSize: 18, marginTop: 10,color : "white" }}>
            Website: <a href={this.state.item.show.officialSite} style={{color:"black"}}> {this.state.item.show.officialSite}</a>
            </div>
            </li>
            </ul>
            </fieldset>
            <div
          style={{
            marginTop: 30,
            marginBottom: 20,
            fontSize: 24,
            color : "white"
          }}
        >
           Description :
        </div>
        <div
          style={{
            marginLeft: 5,
            maxHeight: 200,
            fontSize: 20,
            overflow: "auto",
            color : "white"
          }}
        >
          <Markup  content={this.state.item.show.summary?this.state.item.show.summary : "Not Available " }  />
        </div>
          </div>
          
        </div>

        {/* Item description */}
        
      </div >
    );
  }
}

let Details = connect()(ConnectedDetails);
export default Details;
