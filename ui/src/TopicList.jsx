import React from "react";
import ReactDOM from "react-dom";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { withRouter } from "react-router";
import graphQLFetch from "./graphQLFetch.js";

const topics = [];

class TopicList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserTopics = this.updateUserTopics.bind(this);
    this.state = {
      userId: null,
      userEmail: null,
      topics: [],
    };
  }

  async loadData() {
    console.log("load data");
    const query = `query {
      topicList{
        _id,
        name,
        description,
        imagePath
      }
    }`;

    try {
      const data = await graphQLFetch(query);
      if (data) {
        this.setState({
          topics: data.topicList,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    const userData = this.props.location.state;
    if (userData != null) {
      this.setState({ userId: userData.userId, userEmail: userData.userEmail });
      this.loadData();
    } else {
      // redirect back to sign in page if user enter the topic list page directly by url without sign in
      this.props.history.push({
        pathname: "/sign-in",
      });
    }
  }

  async updateUserTopics(topics) {
    const query = `mutation updateUserTopics($userId: ID!, $topics: [String!]!) {
      updateUserTopics(userId:$userId, topics:$topics)
    }`;
    const userId = localStorage.getItem("userId");
    try {
      const data = await graphQLFetch(query, { userId, topics });
      console.log(data);
      //if (data) {
      //  this.props.history.push("/hashtag-list");
      //}
    } catch (err) {
      console.log(err);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectionList = [];
    for (let [name, value] of formData) {
      selectionList.push(
        document.getElementsByName(`${name}`)[0].getAttribute("data-title")
      );
    }

    this.updateUserTopics(selectionList);
  };

  // checkbox onchange function - disable Done button if none of the topics is selected

  render() {
    const topics = this.state.topics;
    console.log(topics);

    if (topics != null && topics.length > 0) {
      console.log(topics);
      return (
        <Container>
          <Form onSubmit={this.handleSubmit} id="TopicForm">
            <Row className="mb-4">
              <h1>Tell us what you're interested in</h1>
            </Row>
            <Row xs={2} md={3} className="g-4">
              {topics.map((topic) => (
                <Col key={topic._id}>
                  <Card variant="top" className="bg-dark text-white">
                    <Card.Img src={`${topic.imagePath}`} alt="Card image" />
                    <Card.ImgOverlay>
                      <Form.Check
                        inline
                        name={`topic_${topic.id}`}
                        type="checkbox"
                        id={`inline-checkbox-${topic.id}`}
                        data-title={`${topic.name}`}
                      />
                      <Card.Title>{`${topic.name}`}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row>
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success">
                  Done
                </Button>
              </div>
            </Row>
          </Form>
        </Container>
      );
    } else {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
  }
}

export default withRouter(TopicList);
