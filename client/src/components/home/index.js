import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  ButtonGroup,
  Alert,
  ToggleButton,
} from "react-bootstrap";
import { useAuthContext } from "../firebase";
import { getRandomShot, setScore } from "../../utils";

import "./home.css";

const radioButtons = [
  { name: "Guess year", value: "year" },
  { name: "Guess decade", value: "decade" },
];

const Home = () => {
  const { user } = useAuthContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [shot, setShot] = useState(null);
  const [message, setMessage] = useState(null);
  const [points, setPoints] = useState(0);
  const [prevYearDiff, setPrevYearDiff] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const [type, setType] = useState("year");

  const isDecade = type === "decade";

  useEffect(() => {
    if (user && points != null) {
      if (!user.score || points > user.score) {
        setScore(points).then(console.debug).catch(console.warn);
      } else {
        setPoints(user.score);
      }
    }
  }, [user, points]);

  useEffect(() => {
    if (!shot) {
      setLoading(true);
      getRandomShot(type)
        .then((response) => response.json())
        .then((results) => {
          if (results) {
            if (results.success) {
              setShot(results.data);
              console.log(
                isDecade
                  ? `Decade: ${results.data.decade}`
                  : `Year: ${results.data.year}`
              );
            } else {
              setMessage({ message: results.error, variant: "warning" });
            }
          } else {
            setMessage({
              message: "Could not load shot. Trying again in 3 seconds...",
              variant: "warning",
            });
            setLoading(false);
          }

          setLoading(false);
        });
    }
  }, [shot, type, isDecade]);

  const nextShot = () => {
    formRef.current.reset();
    setShot(null);
    setMessage(null);
    setGuessCount(0);
  };

  const checkYear = (year) => {
    if (shot.year) {
      return shot.year === year;
    }
    if (shot.decade) {
      return shot.decade <= year && year < shot.decade + 10;
    }
    return false;
  };

  const checkWarmerColder = (yearDiff) => {
    if (prevYearDiff >= yearDiff) {
      return "Warmer!";
    } else {
      return "Colder!";
    }
  };

  const correctAlert = (points) => {
    setMessage({
      message: (
        <>
          <Alert.Heading>Correct! +{points} points</Alert.Heading>
          <p>This is: "{shot.title}"</p>
          <div className="d-flex justify-content-end">
            <Button onClick={nextShot} variant="outline-success">
              Next!
            </Button>
          </div>
        </>
      ),
      variant: "success",
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const guess = parseInt(form[0].value);
    if (!guess) {
      setMessage({ message: "Please enter a valid year", variant: "danger" });
      return;
    }
    let hint = "";
    setGuessCount(guessCount + 1);
    if (checkYear(guess)) {
      const points = calcScore(guessCount);
      correctAlert(points);
      addPoint(points);
    } else {
      let currentYearDiff = Math.abs(guess - shot.year);
      if (prevYearDiff) {
        hint = checkWarmerColder(currentYearDiff);
      }
      setPrevYearDiff(currentYearDiff);
      setMessage({ message: `Incorrect! ${hint}`, variant: "warning" });
    }
    event.preventDefault();
    event.stopPropagation();
  };

  const addPoint = (newPoints = 1) => setPoints(points + newPoints);

  const round = (n, to) => n - (n % to);

  // Maximum & minimum points allotted for a correct answer
  const maxPoints = 10;
  const minPoints = 1;
  const calcScore = (guessCnt) => Math.max(maxPoints - guessCnt, minPoints);

  const Title = () => (
    <Row className="justify-content-md-center">
      <Col xs="auto">
        <h1>
          Can you guess what {isDecade ? "decade" : "year"} this picture was
          taken?
        </h1>
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
          {isDecade ? "Decade" : "Year"}
        </Col>
        <Col xs="auto">
          <Form.Control
            placeholder={
              (shot && `${round(shot.year || shot.decade, 100)}`) || "1900"
            }
            style={{ width: 100 }}
          />
        </Col>
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

  const Toggle = () => (
    <Row className="justify-content-md-center">
      <Col xs="auto">
        <br />
        <ButtonGroup toggle>
          {radioButtons.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={type === radio.value}
              onChange={(e) => {
                setType(e.target.value);
                nextShot();
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Col>
    </Row>
  );

  return (
    <div className="home-container">
      <Container>
        <Title />
        <Score />
        <Shot />
        <Guess />
        <Toggle />
        <br />
        {message && (
          <Alert variant={message.variant || "success"}>
            {message.message || message}
          </Alert>
        )}
      </Container>
    </div>
  );
};

export default Home;
