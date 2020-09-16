import React from 'react';
import Carousel from "react-multi-carousel";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import moment from 'moment';
import "react-multi-carousel/lib/styles.css";
import '../styles/Carousel.css';


const responsive = {
    desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 
    },
    tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 
    },
    mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
    }
};

export default class ImageOfTheDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    convertDateToUtc(timestamp) {
        const utc = new Date(timestamp * 1000)  
        return moment(utc).format('LL');
    }

    render() {
        return (
            <Container fluid className={!this.props.isNews ? "r4-events" : "r4-news" } >
                <Row>
                    <Col className="text-center my-5">
                        <h1 className="text-uppercase"> {this.props.title} </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Carousel
                            swipeable={false}
                            draggable={false}
                            showDots={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={false}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                        >
                            { this.props.carousel_items.map((item,index) => (         
                                <Card key={index} className="mx-2 border-0">
                                    <Card.Img variant="top" src={item.featured_image} />
                                    <Card.Body className={`grey-blue-background ${this.props.isNews ? "card-body-news" : "card-body-events"}`}>
                                        <Card.Title className="font-weight-bold">{item.title}</Card.Title>
                                            {!this.props.isNews  &&
                                                <Card.Subtitle >
                                                    <span className="mt-5"> {item.description}</span>
                                                </Card.Subtitle>
                                            }
                                        <Row className="positioning w-100">
                                            <Col md={5}>
                                            {item.url &&
                                                <Button href={item.url} variant="primary" className="text-uppercase" >Read More</Button>
                                            }
                                            </Col>
                                            <Col md={7}>
                                                <Card.Text>
                                                    <span className="mt-5"> {this.props.isNews ? this.convertDateToUtc(item.date_published) + " | " + item.news_site_long : item.news_site_long}</span>
                                                </Card.Text>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )) }
                        </Carousel>
                    </Col>
                </Row>
            </Container>
        )
    }    
}