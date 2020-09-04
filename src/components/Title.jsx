import React from 'react';
import '../styles/Title.css';
import { Container, Row, Col } from 'react-bootstrap';

const Title = () => {
    return (
        <Container fluid>
        <Row className="background">
            <Col>
                <div className="blinking_text">
                    <h3 className="pt-3 mr-2">DISCOVER</h3>
                    <span id="C">C</span>
                    <span id="O1">O</span>
                    <span id="S1">S</span>
                    <span id="M">M</span>
                    <span id="O2">O</span>
                    <span id="S2">S</span>
                </div>
            </Col>
        </Row>
        </Container>
    );
}

export default Title;