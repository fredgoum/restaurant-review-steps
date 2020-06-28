import React from 'react';
import RestaurantFilters from './RestaurantFilters';
import RestaurantReview from './RestaurantReview';
import RestaurantMap from './RestaurantMap';
import restaurantList from '../data/restaurantList.json';

class RestaurantReviewApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantList: [], // all restaurants
      filteredRestaurants: [], // filter results
      restaurantsInBounds: [], // restaurants visible in map
      loading : false, // for data loading
      placeIds: [],
      fields: {
        currentLocation: {
        }
      },
      minStarsSelected: 0,
      maxStarsSelected: 5,
    }

    this.getStarsSelected = this.getStarsSelected.bind(this);
    this.getRestaurantsInBounds= this.getRestaurantsInBounds.bind(this);
    this.addNewRestaurant = this.addNewRestaurant.bind(this);
  }

  async componentDidMount() {
    try {
      const { lat, lng } = await this.getcurrentLocation();
      this.setState(prev => ({
        fields: {
          ...prev.fields,
          currentLocation: {
            lat,
            lng
          }
        },
      }));
    }
    catch { // If geolocalisation error, display local data
      alert("Vérifiez votre connectivité ou votre GPS. En attendant, nous allons vous montrer des restaurants à Bruxelles");
      this.setState({restaurantList: restaurantList});
      this.setState({filteredRestaurants: restaurantList});
      this.setState({restaurantsInBounds: restaurantList});
      this.setState({loading: true});
      // On positionne l'utilisateur sur la position par default
      const { lat, lng } = {lat: 50.85045, lng: 4.34878,};
      this.setState(prev => ({
        fields: {
          ...prev.fields,
          currentLocation: {
            lat,
            lng
          }
        },
      }));
    } 
  }
  // Get user current location
  getcurrentLocation() {
    if (navigator && navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          resolve({
            lat: coords.latitude,
            lng: coords.longitude
          });

          this.getGooglePlaceRestaurants(coords);
        });
      });
    }
    // If navigator geolocalisation is not allowed, display local data
    alert("Vous n'avez pas accepté d'être géolocalisé. Nous allons vous montrer des restaurants à Bruxelles")
    this.setState({restaurantList: restaurantList});
    this.setState({filteredRestaurants: restaurantList});
    this.setState({restaurantsInBounds: restaurantList});
    this.setState({loading: true});
    return {
      lat: 50.85045,
      lng: 4.34878,
    };
  }
  // Gets API data from Google places's restaurants
  async getGooglePlaceRestaurants(coords) {
    try {
      const radius = 150000;
      const proxyurl = `https://cors-anywhere.herokuapp.com/`;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=`
        +`${coords.latitude},${coords.longitude}&radius=${radius}&type=restaurant&keyword=cruise&key=${process.env.REACT_APP_MAP_API_KEY}`;

      const res = await fetch(proxyurl + url);
      if (! res.ok) {
          throw new Error(res.status);
      }
      const data = await res.json();
      const placesIds = data.results.map(restaurant => restaurant.place_id);
      this.setState({placeIds: placesIds}, () => {
        this.getGooglePlaceRestaurantsInfos();
      });
    } catch (error) { // e.g if too many requests, display local data
      alert("Vous avez surchargé le serveur. Veuillez recharger la page ultérieurement. En attendant, nous allons vous montrer des restaurants à Bruxelles")
      
      this.setState({restaurantList: restaurantList});
      this.setState({filteredRestaurants: restaurantList});
      this.setState({restaurantsInBounds: restaurantList});
      this.setState({loading: true});
      const { lat, lng } = {lat: 50.85045, lng: 4.34878,};
      this.setState(prev => ({
        fields: {
          ...prev.fields,
          currentLocation: {
            lat,
            lng
          }
        },
      }));
      console.log(error);
    }
  }
  // Gets informations of each restaurant
  async getGooglePlaceRestaurantsInfos() { 
    const restaurantsInfos = [];
    const placesIds = this.state.placeIds;
    await Promise.all(placesIds.map(async (placeId) => {
      try {
        const proxyurl = `https://cors-anywhere.herokuapp.com/`
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.REACT_APP_MAP_API_KEY}`;
        
        const res = await fetch(proxyurl + url);
        if (! res.ok) {
            throw new Error(res.status);
        }
        const data = await res.json();
        data.result.latitude = data.result.geometry.location.lat;
        data.result.longitude = data.result.geometry.location.lng;
        restaurantsInfos.push(data.result);
      } catch (error) {
        console.log(error);
      }
    }));
    this.setState({restaurantList: restaurantsInfos});
    this.setState({filteredRestaurants: restaurantsInfos});
    this.setState({restaurantsInBounds: restaurantsInfos});
    this.setState({loading: true});
  }
  // Filter restaurants according to the restaurants in map bounds and stars selected
  filterRestaurants() {
    const {minStarsSelected, maxStarsSelected } = this.state;
    const filteredRestaurants = this.state.restaurantsInBounds.filter(resto => 
      this.getAverageRatings(resto) >= minStarsSelected && this.getAverageRatings(resto) <= maxStarsSelected);
    this.setState({filteredRestaurants: filteredRestaurants});
  }
  // Gets the restaurants visible in map
  getRestaurantsInBounds(restaurantsInBounds) {
    this.setState({restaurantsInBounds: restaurantsInBounds}, () => {
      this.filterRestaurants();
    });
  }
  // Gets min and max stars selected
  getStarsSelected(minStarsSelected, maxStarsSelected) {
    this.setState({minStarsSelected: minStarsSelected}, () => {
      this.filterRestaurants();
    });
    this.setState({maxStarsSelected: maxStarsSelected}, () => {
      this.filterRestaurants();
    });
  }
  // Calculate reviews/ratings average for a restaurant
  getAverageRatings(restaurant) {
    if (restaurant.reviews && restaurant.reviews.length) {
      const someRatings = restaurant.reviews.map(review => review.rating).reduce((acc, val) => acc + val);
      const averageRatings = someRatings / restaurant.reviews.length;
      return averageRatings;
    }
  }
  // Add a new restaurant to the list of restaurants
  addNewRestaurant(newRestaurant) {
    const newRestaurantList = this.state.restaurantsInBounds;
    newRestaurantList.unshift(newRestaurant);
    this.setState({restaurantsInBounds: newRestaurantList}, () => {
      this.filterRestaurants();
    });
  }
  // Allows to displays map or restaurants on mobile screen
  showMapOrResturants() {
    const restaurantMap = document.getElementById("map");
    const restaurantReview = document.getElementById("restaurantReview");
    if (restaurantReview.style.display === "none") {
      restaurantReview.style.display = "block";
      restaurantMap.style.display = "none";
    } else {
      restaurantReview.style.display = "none";
      restaurantMap.style.display = "block";
    }
  }

  render() {
    return (
      <div>
        <RestaurantFilters
          getStarsSelected={this.getStarsSelected}
        >
        </RestaurantFilters>

        <div id="mapAndRestaurants">
          <div id="map">
            <RestaurantMap
              restaurantList={this.state.restaurantList}
              filteredRestaurants={this.state.filteredRestaurants}
              getRestaurantsInBounds={this.getRestaurantsInBounds}
              getNewRestaurant={this.addNewRestaurant}
              currentLocation={this.state.fields.currentLocation}
            >
            </RestaurantMap>

            <div id="display-restaurants" onClick={() => this.showMapOrResturants()}>
              <button className="btn-display">Afficher les restaurants</button>
            </div>
          </div>

          <div id="restaurantReview">
            {
              this.state.loading ?
                <RestaurantReview
                  filteredRestaurants={this.state.filteredRestaurants}
                >
                </RestaurantReview>
              :
                <div style={{textAlign: "center", marginTop: "50px"}}>Chargement...</div>                
            }
            
            <div id="display-map" onClick={() => this.showMapOrResturants()}>
              <button className="btn-display">Afficher la carte</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantReviewApp;
