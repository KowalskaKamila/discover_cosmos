import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../styles/AsteroidTable.css';
import moment from 'moment';


export default class AsteroidTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            headers : ["Asteroid Name", "Estimated Diameter", "Close Approach Date & Time", "Velocity", "Distance to Earth", "Potentiall hazard"],
            asteroids_data: [],
            table_data : [],

        };
    }

    async asteoridWatch() {
        const today = moment().format("YYYY-MM-DD")
        const response = await axios.get("https://api.nasa.gov/neo/rest/v1/feed?start_date="+ today + "&end_date=" + today + "&api_key=rRrzSpxY8WVmhsmfYml0fXtSq5bLhTVBb7rhjL8v")
        this.setState({asteroids_data: response.data.near_earth_objects[today]})
        this.setTableData()
    }

    setTableData(){
        const asteroids = this.state.asteroids_data
        const steroids_new_data = []
        for (let i=0; i < asteroids.length; i++ ) {
            const id = asteroids[i].neo_reference_id
            const estimated_diameter = Math.round((asteroids[i].estimated_diameter.meters.estimated_diameter_min + asteroids[i].estimated_diameter.meters.estimated_diameter_max)/2).toString() + " meters"
            const name = asteroids[i].name;
            const velocity = Math.round(asteroids[i].close_approach_data[0].relative_velocity.kilometers_per_hour).toString() + " km/h"
            const close_approach_date_time = moment(asteroids[i].close_approach_data[0].close_approach_date_full).format("LLL")
            const distance_to_earth =  Math.round(asteroids[i].close_approach_data[0].miss_distance.kilometers).toString() + " km" 
                                    + " (" + Math.round(asteroids[i].close_approach_data[0].miss_distance.lunar) + " lunar)"
            let potentiall_hazard 
            if (asteroids[i].is_potentially_hazardous_asteroid === true) {
                potentiall_hazard = "This asteroid could be dangerous to planet Earth!"
            }  
            else if (asteroids[i].is_potentially_hazardous_asteroid === false) {
                potentiall_hazard = "This asteroid poses not threat to planet Earth!"
            }
            else {
                potentiall_hazard = "Unable to access all data."
            }
            const asteroid = {"id":id, "name":name, "estimated_diameter":estimated_diameter, "close_approach_date_time":close_approach_date_time,
                            "velocity":velocity, "distance_to_earth":distance_to_earth, "potentiall_hazard":potentiall_hazard};
            steroids_new_data.push(asteroid)
     
        }
        this.setState({table_data: steroids_new_data})
    }

    componentDidMount() {
        this.asteoridWatch()
    }

    render() {
        return (
            <Container fluid className="r3">
                <Row>
                    <Col className="text-center my-5">
                        <h1 className="text-uppercase"> Real-Time Asteroid Watch </h1>
                        <p> Every day asteroids are passing close to planet Earth. Their trajectory is closely monitored by NASA as some of these could potentially pose a threat to our planet.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped borderless variant="dark" className="w-100">
                            <thead>
                            <tr>
                                { this.state.headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                )) }    
                            </tr>
                            </thead>
                            <tbody>
                                { this.state.table_data.map((asteroid) => (
                                    <tr key={asteroid.id}>
                                        <td>{asteroid.name}</td>
                                        <td>{asteroid.estimated_diameter}</td>
                                        <td>{asteroid.close_approach_date_time}</td>
                                        <td>{asteroid.velocity}</td>
                                        <td>{asteroid.distance_to_earth}</td>
                                        <td>{asteroid.potentiall_hazard}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}