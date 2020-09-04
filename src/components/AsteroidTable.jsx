import React from 'react';
import {  } from 'react-bootstrap';
import axios from 'axios';
import '../styles/AsteroidTable.css';
import moment from 'moment';


export default class AsteroidTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
async asteoridWatch() {
    const today = moment().format("YYYY-MM-DD")
    const response = await axios.get("https://api.nasa.gov/neo/rest/v1/feed?start_date="+ today + "&end_date=" + today + "&api_key=")
    console.log('asteroids')
    console.log(response)
}

componentDidMount (){
    this.asteoridWatch()
}

render() {
    return (
       <p>hello</p> 
        )
      }
}