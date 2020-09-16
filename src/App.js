import React from 'react';
import AsteroidTable from './components/AsteroidTable';
import Carousel from './components/Carousel';
import ImageOfTheDay from './components/ImageOfTheDay';
import Title from './components/Title';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        news : [],
        events: [],
        newsAreLoding: false,
        eventsAreLoading: false
      };
  }

  async getNews() {
    this.setState({ newsAreLoding: true})     
    const news = [];
    const api = "https://spaceflightnewsapi.net/api/v1/articles?page=";
    for (let page = 1; page < 3; page += 1) {
        news.push( await axios.get(api + page));
    }
    axios
        .all(news)
        .then(
            // Aggregate all the responses into allNews array.
            axios.spread((...responses) => {
                const allNews = [];
                for (let i = 0; i < responses.length; i += 1) {
                    const objects = responses[i].data.docs;
                    for (let j = 0; j < objects.length; j += 1) {
                        allNews.push(objects[j]);
                    }
                }
                this.setState({ newsAreLoding: false})
                this.setState({ news: allNews})
            }),
            
        )
    .catch((error) => {
        this.setState({ newsAreLoding: false})
        console.log(error);
    });
  }

  async getEvents() {
    this.setState({ eventsAreLoding: true})
    const events = [];
    const api = "https://ll.thespacedevs.com/2.0.0/event/?limit=10&offset=";
    for (let offset = 10; offset < 30; offset += 10) {
        events.push( await axios.get(api + offset));
    }
    axios
        .all(events)
        .then(
            // Aggregate all the responses into allEvents array.
            axios.spread((...responses) => {
                const allEvents = [];
                for (let i = 0; i < responses.length; i += 1) {
                    const objects = responses[i].data.results;
                    for (let j = 0; j < objects.length; j += 1) {
                        allEvents.push(objects[j]);
                    }
                }
                // Format received data 
                const formated_events = [];
                for (let i = 0; i < allEvents.length; i++) {
                  let new_events_data = {}
                  new_events_data['featured_image'] = allEvents[i].feature_image
                  new_events_data['title'] = allEvents[i].name
                  new_events_data['url'] = allEvents[i].news_url
                  new_events_data['news_site_long'] = allEvents[i].location
                  new_events_data['description'] = allEvents[i].description

                  formated_events.push(new_events_data)
                }
                this.setState({ eventsAreLoding: false})
                this.setState({ events: formated_events})
            }),
            
        )
    .catch((error) => {
      this.setState({ eventsAreLoding: false})
        console.log(error);
    });
  }

  componentDidMount () {
    this.getNews()
    this.getEvents()
  }
  render() {
    return (
      <div className="App background">
        <header className="App-header">
          <Container className="px-0" fluid>
            <Col>
              <Row>
                <Title/>
              </Row>
              <Row>
                {this.state.picOfTheDayIsLoading ?
                  <Spinner className="mx-auto my-5" animation="border"/> :
                  <ImageOfTheDay/>
                }
              </Row>
              <Row>
                <AsteroidTable/>
              </Row>
              <Row>
                {this.state.newsAreLoding ?
                  <Spinner className="mx-auto my-5" animation="border"/> :
                  <Carousel carousel_items={this.state.news} title="News" isNews={true}/>
                }
              </Row>
              <Row>
                {this.state.eventsAreLoding ?
                  <Spinner className="mx-auto my-5" animation="border"/> :
                  <Carousel carousel_items={this.state.events} title="Upcoming Events"/>
                }
              </Row>
            </Col>
          </Container>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  carousel_items: PropTypes.array,
  title: PropTypes.string,
  isNews: PropTypes.bool,
};

App.defaultProps = {
  carousel_items: [],
  title: "",
  isNews: false
}

