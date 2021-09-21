import React, { Component } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  AppBar,
} from "@material-ui/core";
export default class tekkom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tekkom: [],
      visible: false,
    };
  }

  handleButton = (albumId) => {
    alert("Album ID : " + albumId);
  };

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:3000/photo",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        console.log(data.data);
        this.setState({
          tekkom: data.data.slice(0, 20),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <AppBar style={{ padding: "10px", marginBottom: "100px" }}>
          <Typography style={{ margin: "auto" }}>List Nama</Typography>
        </AppBar>

        <Grid
          container
          md={11}
          spacing={4}
          style={{ marginTop: "50px", marginLeft: "10px" }}
        >
          {this.state.tekkom.map((results) => {
            return (
              <Grid item key={results.id} md={3}>
                <Card>
                  <CardActionArea
                    onClick={() => this.handleButton(results.albumId)}
                  >
                    <CardContent style={{ backgroundColor: "#cfe8fc" }}>
                      <Typography>Album ID : {results.albumId}</Typography>
                      <Typography>URL : {results.url}</Typography>
                      <Typography>
                        Thumbnail URL : {results.thumbnailUrl}
                      </Typography>
                      <img
                        src={results.thumbnailUrl}
                        alt="Gambar"
                        style={{ height: 64, width: 64 }}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}
