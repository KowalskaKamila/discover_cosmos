import React from 'react';
import AsteroidTable from './components/AsteroidTable';
import ImageOfTheDay from './components/ImageOfTheDay';
import Title from './components/Title';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Container className="px-0" fluid>
        <Col>
          <Row>
            <Title/>
          </Row>
          <Row>
            <ImageOfTheDay/>
          </Row>
          <Row>
            <AsteroidTable/>
          </Row>
        </Col>
      </Container>
       
      </header>
    </div>
  );
}

export default App;
