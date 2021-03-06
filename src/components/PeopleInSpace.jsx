import React from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../styles/PeopleInSpace.css';


export default class PeopleInSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namber_of_people: 0,
            people_in_space: [],
            dataIsLoading: false
        };
    }

    async getPeopleInSpace() {
        this.setState({dataIsLoading: true})
        const response = await axios.get("http://api.open-notify.org/astros.json");
        this.setState({dataIsLoading: false})
        this.setState({namber_of_people: response.data.number})
        this.setState({people_in_space: response.data.people})
    }
    componentDidMount () {
        this.getPeopleInSpace()
      }

    render() {
        return (
            <Container fluid className="h-75 margin-bottom">
                <Row>
                    <Col className="text-center my-5">
                        <h1 className="text-uppercase"> How Many People Are In Space Right Now? </h1>
                    </Col>
                </Row>
                {this.state.asteroidDataIsLoading ?
                    <Row>
                        <Spinner className="mx-auto my-5" animation="border"/> 
                    </Row> :   
                    <Row className="mt-5">
                        <Col>
                            <h1 className="large-text">{this.state.namber_of_people}</h1>
                        </Col>
                        <Col>
                            { this.state.people_in_space.map((person,index) => (
                                <ul key={index} className="mt-5">
                                    <li className="medium-text">{person.name} (craft: {person.craft})</li>
                                </ul>
                            ))}
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}
