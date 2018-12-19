import React from 'react';
import { render } from 'react-dom';
import { Router } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from './SearchContext';
import { Link } from "@reach/router";
import Results from './Results';
import Details from './Details';
import SearchParams from './SearchParams';

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
})

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleBreedChange: this. handleBreedChange,
      handleAnimalChange: this.handleAnimalChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    }
  }
  handleLocationChange = event => {
      this.setState({
          location: event.target.value
      })
  };
  handleAnimalChange = event => {
      this.setState({
          animal: event.target.value,
          breed: ""
      },
      this.getBreeds
      );

  };
  handleBreedChange = event => {
      this.setState({
          breed: event.target.value
      });
  }
  getBreeds() {
      if (this.state.animal) {
          petfinder.breed.list({ animal: this.state.animal })
              .then(data => {
                  if (data.petfinder && data.petfinder.breeds && 
                      Array.isArray(data.petfinder.breeds.breed)) {
                          this.setState({
                              breeds: data.petfinder.breeds.breed
                          })
                  } else {
                      this.setState({ breeds: []});
                  }
              })
      } else {
          this.setState({ breeds: []});
      }
  }
  render() {
    return (
      <div>
        <header>
          <Link to="/"> Adopte Me! </Link>
          <Link to="/search-params"> 
            <span aria-label="search" role="img">
                &#128269;
            </span>
          </Link>
        </header>
        
        <Provider value={this.state}> 
          <Router>
            <Results path="/" />
            <Details  path="/details/:id" />
            <SearchParams path="/search-params" />
          </Router>
        </Provider>
       
      </div>
    )
  }
}

render(<App/>, document.getElementById("root"));