import React from 'react';
import { Container, Row, Col, Figure, Spinner } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ImageOfTheDay.css';



export default class ImageOfTheDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture_info : {},
            imageDataIsLoading: false
        };
    }

    async getThePictureOfTheDay() {
        this.setState({imageDataIsLoading: true})
        const key = ""
        const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=" + key);
        this.setState({imageDataIsLoading: false})
        this.setState({ picture_info: response.data})
    }

    componentDidMount (){
        this.getThePictureOfTheDay()
    }
     
    render() {
        return (
            <Container fluid className="h-75 margin-bottom"> 
                <Row>
                    <Col className="text-center my-5">
                        <h1 className="text-uppercase"> Astronomy Picture of the Day </h1>
                        <p className="mx-3"> Each day a different image of our fascinating universe is featured, along with a brief explanation written by a professional astronomer. </p>
                    </Col>
                </Row>   
                {this.state.imageDataIsLoading ?
                    <Row>
                        <Spinner className="mx-auto my-5" animation="border"/>
                    </Row> :
                    <Row className="mt-5">
                        <Col sm={5} >
                            <Figure.Image rounded className="image_size" src={this.state.picture_info.url} alt="Picture of the cosmos"/>                            <Figure.Caption className="text-center"> Digital Illustration Credit:<a href="https://www.nasa.gov/"> NASA</a>, {this.state.picture_info.date} </Figure.Caption>
                        </Col>
                        <Col sm={7} className="d-flex mx-0">
                            <div  className="px-5">
                                <h1 className="text-center mb-3"> {this.state.picture_info.title} </h1>
                                <p className="medium-size-font"> {this.state.picture_info.explanation} </p>
                            </div>
                        </Col>
                    </Row>
                }    
            </Container>            
        )
    }
}