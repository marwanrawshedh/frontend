import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Modal, Form } from "react-bootstrap/";
import "./BestBooks.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
class Fav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      show: false,
      id: "",
      instructions: "",
      photo: "",
      name:""
    };
  }
  componentDidMount = () => {
    const { user } = this.props.auth0;

    axios
      .get(`http://localhost:3010/getdata?email=${user.email}`)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
        console.log(result.data);
      })
      .catch((err) => {
        console.log("err in getting");
      });
  };
  updatedata = (event) => {
      
    event.preventDefault();
    const { user} = this.props.auth0;
    const email1=user.email
    const obj = {
      instructions: event.target.instructions.value,
      name: event.target.name.value,
      email:email1,
      photo: event.target.photo.value
    };

    axios
      .put(`http://localhost:3010/updatedata/${this.state.id}`, obj)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
      })
      .catch((err) => {
        console.log("err in getting");
      });
  };

  deleteedata = (id) => {
    const { user } = this.props.auth0;
    const email = user.email;
    console.log(id);
    axios
      .delete(`http://localhost:3010/deletedata/${id}?email=${email}`)
      .then((result) => {
        this.setState({
          arr: result.data,
        });
      })
      .catch((err) => {
        console.log("err in getting");
      });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = (element) => {
      console.log(element)
    this.setState({
      show: true,
      id: element._id,
      name:element.name,
      instructions:element.instructions,
      photo:element.photo
    });
  };
  render() {
    return (
      <>
        {this.state.arr.map((element) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={`${element.photo}`} />
                <Card.Body>
                  <Card.Title>name:{element.name}</Card.Title>
                  <Card.Text>instructions:{element.instructions}</Card.Text>
                  <Button
                    onClick={() => {
                      this.deleteedata(element._id);
                    }}
                    variant="primary"
                  >
                    delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => this.handleShow(element)}
                  >
                    update
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Form onSubmit={this.updatedata}>
            <Form.Label>name:</Form.Label>
            <Form.Control defaultValue ={this.state.name} type="text" name="name" />
            <Form.Label>url photo:</Form.Label>
            <Form.Control defaultValue ={this.state.photo} type="text" name="photo" />


            <Form.Label>instructions:</Form.Label>
            <Form.Control defaultValue ={this.state.instructions} type="text" name="instructions" />
            <Button type="submit" variant="primary">
              submit
            </Button>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Form>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default withAuth0(Fav);
