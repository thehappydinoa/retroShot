import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
// import ls from "local-storage";
import { getRandomShot } from "../../utils";

import "./home.css";

const Home = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shot, setShot] = useState(null);
  const [message, setMessage] = useState(null);
  const [points, setPoints] = useState(0);
  // let prevYearDiff = 0;
  const [prevYearDiff, setPrevYearDiff] = useState(0);

  useEffect(() => {
    if (!shot) {
      setLoading(true);
      getRandomShot()
        .then((response) => response.json())
        .then((results) => {
          setShot(results.data);
          setLoading(false);
          const { year, decade } = results.data;
          console.log(`${year} or ${decade}`);
        });
    }
  }, [shot, setShot, setLoading]);

  const nextShot = () => {
    formRef.current.reset();
    setShot(null);
    setMessage(null);
  };

  const checkYear = (year) => {
    if (shot.year) {
      return shot.year === year;
    } else if (shot.decade) {
      return shot.decade <= year <= shot.decade + 10;
    }
    return false;
  };

  const checkWarmerColder = (yearDiff) => {
    if (prevYearDiff > yearDiff) {
      return "Warmer!";
    } else {
      return "Colder!";
    }
  };

  const handleSubmit = (event) => {
    setLoading(true);
    const form = event.currentTarget;
    const guess = parseInt(form[0].value);
    let hint = "";
    if (guess && checkYear(guess)) {
      setMessage("Correct!");
      addPoint(1);
      setTimeout(nextShot, 2000);
    } else {
      let currentYearDiff = Math.abs(guess - shot.year);
      if (prevYearDiff) {
        console.log("IN IF");
        hint = checkWarmerColder(currentYearDiff);
        console.log("Hint!: " + hint);
      }
      setPrevYearDiff(currentYearDiff);
      console.log("Prev Year Diff: " + prevYearDiff);
      const message = `Incorrect! ${hint}`;
      setMessage(message);
    }
    event.preventDefault();
    event.stopPropagation();
    setLoading(false);
  };

  const addPoint = (newPoints = 1) => setPoints(points + newPoints);

  const round = (n, to) => n - (n % to);

  const Title = () => (
    <Row className="justify-content-md-center">
      <Col xs="auto">
        <h1>Can you guess what year this picture was taken?</h1>
        <p>
          With pictures taken from{" "}
          <a
            href="https://www.reddit.com/r/OldSchoolCool/"
            target="_blank"
            rel="noreferrer"
          >
            r/OldSchoolCool
          </a>
        </p>
      </Col>
    </Row>
  );

  const Score = () => (
    <Row className="justify-content-md-center">
      <Col xs="auto">
        <h3>Score: {points}</h3>
      </Col>
    </Row>
  );

  const Shot = () => (
    <Row className="justify-content-md-center">
      <Col xs="auto">
        {shot ? (
          <>
            <Image
              className="shot-img"
              src={shot.imgUrl}
              alt="Retro shot"
              onError={nextShot}
              rounded
            />
            <p>
              Photo submitted by{" "}
              <a href={shot.postUrl} target="_blank" rel="noreferrer">
                u/{shot.user}
              </a>
            </p>
          </>
        ) : (
          <>Loading shot...</>
        )}
      </Col>
    </Row>
  );

  const Guess = () => (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <Form.Row className="justify-content-md-center">
        {/* <Col xs="auto"> */}
        <Col xs="auto" className="tr">
          Year
        </Col>
        <Col xs="auto">
          <Form.Control
            placeholder={
              (shot && `${round(shot.year || shot.decade, 100)}`) || "1900"
            }
            style={{ width: 100 }}
          />
        </Col>
        {/* <Form.Label></Form.Label> */}

        {/* </Col> */}
      </Form.Row>
      <br />
      <Form.Row className="justify-content-md-center">
        <Col xs="auto">
          <Button variant="warning" disabled={loading} onClick={nextShot}>
            Skip
          </Button>
        </Col>
        <Col xs="auto">
          <Button type="submit" disabled={loading}>
            Check
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );

  return (
    <div className="home-container">
      <Container>
        <Title />
        <Score />
        <Shot />
        <Guess />
        <br />
        {message && (
          <Alert variant={message === "Correct!" ? "success" : "warning"}>
            {message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Home;
