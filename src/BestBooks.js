import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap/";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
    };
  }
  componentDidMount = () => {
    const { user, isAuthenticated } = this.props.auth0;

    axios
      .get(`http://localhost:3010/get?email=${user.email}`)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        // console.log(result.data)
      })
      .catch((err) => {
        console.log("err in getting");
      });
  };

  postdata = (element) => {
    const { user} = this.props.auth0;
    const email=user.email
    console.log(element);
    const obj={...element,email}
    console.log(obj)
    axios
      .post(`http://localhost:3010/postdata`, obj)
      .then((result) => {
        
      })
      .catch((err) => {
        console.log("err in getting");
      });
  };

  // updatedata = (event) => {
  //   event.preventDefault();
  //   const obj = {
  //     instructions: event.target.instructions.value,
  //     name: event.target.name.value,
  //   };

  //   axios
  //     .put(`http://localhost:3010/updatedata/id`, obj)
  //     .then((result) => {
  //       this.setState({
  //         arr: result.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log("err in getting");
  //     });
  // };

  render() {
    return (
      <>
        {this.state.arr.map((element) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={`${element.photo}`} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>{element.instructions}</Card.Text>
                  <Button
                    onClick={() => {
                      this.postdata(element);
                    }}
                    variant="primary"
                  >
                    add to fav
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default withAuth0(BestBooks);
