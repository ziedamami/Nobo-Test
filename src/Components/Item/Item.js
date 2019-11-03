import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";


class ConnectedItem extends Component {
  render() {
    return (
      <Card
        style={{ width: 200, height: 300, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.show.id);
          }}
        >
          <CardMedia
            style={{ height: 220 }}
            image={this.props.item.show.image ? this.props.item.show.image.medium :'image-unavailable.jpg'}
          />
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {this.props.item.show.name}
            </div>
            <div style={{ margin: 5 }}>Score: {parseFloat(this.props.item.score).toFixed(2)} /20</div>
            <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
              {this.props.item.popular && "Popular"}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 45 }}
        >
          
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(ConnectedItem));
