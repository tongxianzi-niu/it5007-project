import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import graphQLFetch from "./graphQLFetch.js";
import { withRouter } from "react-router";
import TopicList from "./TopicList.jsx";

class SignUp extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { validated: false };
    this.createUser = this.createUser.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  async createUser(user) {
    const query = `mutation addUser($user: userInputs!) {
      addUser(user: $user) {
        email, _id
      }
    }`;

    try {
      const data = await graphQLFetch(query, { user });
      console.log('after graphQLFetch')
      console.log(data);
      if (data) {
        // set user session
        this.setState({ userId: data.addUser._id, userEmail: data.addUser._id });
        this.props.history.push({
          pathname: "/topic-list",
          state: this.state
        });
        localStorage.setItem("userId", data.addUser._id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  validateForm = (form) => {
    // validate if email address exist
    let isEmailExist = false;
    // TO-DO: API call to check if email address exist
    if (isEmailExist === true) {
      form.email.setCustomValidity(
        "Email address already exist. Please sign in."
      );
    } else {
      form.email.setCustomValidity("");
    }

    // validate password same as confirm password
    if (form.password.value != form.cfmPassword.value) {
      form.cfmPassword.setCustomValidity(
        "Password and confirm password does not match."
      );
    } else {
      form.cfmPassword.setCustomValidity("");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit");
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("cfmpassword"),
    });

    const form = e.currentTarget;
    this.validateForm(form);
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };
      this.createUser(user);
    }

    this.setState({ validated: true });
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs lg="5">
            <h1>Sign Up</h1>
            <Form
              onSubmit={this.handleSubmit}
              noValidate
              validated={this.state.validated}
            >
              <Form.Group
                className="mb-3"
                controlId="emailInput"
                id="EmailInputGroup"
              >
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  type="email"
                  className="form-control"
                  name="email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email address is invalid.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="PasswordInput"
                id="PasswordInputGroup"
              >
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="password"
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <Form.Control.Feedback type="invalid">
                  Password must contain at least one number and one uppercase
                  and lowercase letter, and at least 8 or more characters.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="CfmPasswordInput"
                id="CfmPasswordInputGroup"
              >
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="cfmPassword"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password and confirm password does not match.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="success">
                  Sign Up
                </Button>
              </div>
              <div>
                <a href="/#/sign-in">Already has account? sign in</a>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
