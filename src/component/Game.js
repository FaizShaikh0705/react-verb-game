import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import verbs from './verbs';
import './Game.css'

const Game = () => {
  const [usedVerbs, setUsedVerbs] = useState([]);
  const [currentVerb, setCurrentVerb] = useState({});
  const [userAnswers, setUserAnswers] = useState({
    past: '',
    participle: '',
  });
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const generateRandomVerb = () => {
    const availableVerbs = verbs.filter(
      (verb) => !usedVerbs.includes(verb.base)
    );
    if (availableVerbs.length === 0) {
      // All verbs have been used, reset the used verbs array
      setUsedVerbs([]);
    }
    const randomIndex = Math.floor(Math.random() * availableVerbs.length);
    const randomVerb = availableVerbs[randomIndex];
    setCurrentVerb(randomVerb);
    setUsedVerbs([...usedVerbs, randomVerb.base]);
    setShowResult(false);
  };

  const checkAnswer = () => {
    if (
      userAnswers.past === currentVerb.past &&
      userAnswers.participle === currentVerb.participle
    ) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  useEffect(() => {
    generateRandomVerb();
  }, []);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" >
        <Container>
          <Navbar.Brand href="#home" align="start">
            <img
              alt=""
              src="../images/protest.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <span className='tittle'>English Spoken</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <div>
          <div className='d-flex justify-content-center header'>
            <h1>English Verb Game</h1>
          </div>
          <div className='d-flex justify-content-center header'>
            <p className='red'>Score: {score}</p>
          </div>
          <div className='d-flex justify-content-center header'>
            <p className='verbss'>1<sup>st</sup> Verb is {currentVerb.base}</p>
          </div>
          {currentVerb.base && (
            <>
              <div className='d-flex justify-content-center'>
                <div class="row g-2">
                  <div class="col-md">
                    <div class="form-floating">
                      <input
                        id="floatingInputGrid"
                        class="form-control"
                        type="text"
                        value={userAnswers.past}
                        onChange={(e) =>
                          setUserAnswers({ ...userAnswers, past: e.target.value })
                        }
                      />
                      <label for="floatingInputGrid">Enter past tense</label>
                    </div>
                  </div>
                  <div class="col-md">
                    <div class="form-floating">
                      <input
                        id="floatingInputGrid"
                        class="form-control"
                        type="text"
                        value={userAnswers.participle}
                        onChange={(e) =>
                          setUserAnswers({ ...userAnswers, participle: e.target.value })
                        }
                      />
                      <label for="floatingInputGrid">Enter past participle</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <button type="button" class="btn btn-success submit-btn" onClick={checkAnswer}>Submit</button>
              </div>
            </>
          )
          }
          {
            showResult && (
              <>
                <div className='d-flex justify-content-center report'>
                  <div>
                    <p>
                      Your answer is {userAnswers.past} / {userAnswers.participle}
                    </p>
                    <p>
                      Correct answer is {currentVerb.past} / {currentVerb.participle}
                    </p>
                  </div>
                </div>
                <div className='d-flex justify-content-center'>
                  <button type="button" class="btn btn-dark" onClick={generateRandomVerb}>Next Verb</button>
                </div>
              </>
            )
          }
        </div >
      </Container>
    </>
  );
};

export default Game;
