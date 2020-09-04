import React from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import axios from 'axios';
// import api from './../api'
import '../styles/ImageOfTheDay.css';



export default class ImageOfTheDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture_info : {},
        };
        // this.getThePictureOfTheDay = this.getThePictureOfTheDay.bind(this);
    }

    async getThePictureOfTheDay() {
        const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=");
        this.setState({ picture_info: response.data})
    }

    async getComets() {
        const response = await axios.get("https://spaceflightnewsapi.net/api/v1/articles");
    }

    componentDidMount (){
        this.getThePictureOfTheDay()
        this.getComets()
    }
     
    render() {
        return (
                <Container fluid className="r2"> 
                    <Row>
                        <Col className="text-center my-5">
                            <h1> Astronomy Picture of the Day </h1>
                            <p className="grey_text"> Each day a different image of our fascinating universe is featured, along with a brief explanation written by a professional astronomer. </p>
                        </Col>
                    </Row>   
                    <Row >
                        <Col sm={5}>
                            <Figure.Image rounded className="image_size" src={this.state.picture_info.url} alt="Picture of the cosmos"/>
                            <Figure.Caption className="text-center"> Digital Illustration Credit:<a href="https://www.nasa.gov/"> NASA</a>, {this.state.picture_info.date} </Figure.Caption>
                        </Col>
                        <Col sm={7} className="d-flex mx-0">
                            {/* <Card className="p-5"> */}
                            <div  className="p-5">
                                <h1 className="text-center mb-3"> {this.state.picture_info.title} </h1>
                                <p className="text-monospace"> {this.state.picture_info.explanation} </p>
                            </div>
                            {/* </Card> */}
                        </Col>
                    </Row>
                </Container>            
        )
      }
}