import React from "react";
import ReactDOM from "react-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "603891319985-14n6khd2qqbi2ibv03ulkv6v7e533geq.apps.googleusercontent.com";

function LoginGoogle() {
  const responseGoogle = function (res) {
    console.log(res);
  };

  return (
    <div className="d-grid gap-2 mt-4">
      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button
            variant="outline-success"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign in with Google
          </Button>
        )}
      />
    </div>
  );
}

function LogoutGoogle() {
  const onSuccess = () => {
    alert("Logout successfully");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

class SignIn extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { validated: false };
  }

  handleSubmit(event) {
    console.log("handle submit");
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({ validated: true});
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-lg-center">
          <Col xs lg="5">
            <h1>Sign In</h1>
            <hr />
            <LoginGoogle />
            <Form
              onSubmit={this.handleSubmit}
              noValidate
              validated={this.state.validated}
              className="mt-3"
            >
              <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="email"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Email address is invalid.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="PasswordInput">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  name="password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Password is invalid.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success">
                  Sign In with Email
                </Button>
              </div>
              <div>
                <a href="/#/sign-up">Don't have account? sign up</a>
              </div>
            </Form>
            <hr />
            <LogoutGoogle />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignIn;
