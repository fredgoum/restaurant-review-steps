import React from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import NewRestaurant from './NewRestaurant';
import marker from '../assets/marquer.png';

export class RestaurantMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newRestaurantWindowIsShown: false,
      newRestaurantLat: 0,
      newRestaurantLng: 0,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.clickOnMarker = this.clickOnMarker.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.ShowNewRestaurantWindow = this.ShowNewRestaurantWindow.bind(this);
    this.zoomOrDrapMap = this.zoomOrDrapMap.bind(this);
    this.getNewRestaurant = this.getNewRestaurant.bind(this);
  }
  // Click on marker to display InfoWindow of a restaurant
  clickOnMarker(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  // Close InfoWindow of a restaurant
  closeInfoWindow() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  // Show Window of restaurant if right click on map
  ShowNewRestaurantWindow(ref, map, e) {
    const location = e.latLng;
    this.setState({newRestaurantLat: location.lat()});
    this.setState({newRestaurantLng: location.lng()});
    this.setState({ newRestaurantWindowIsShown: true});
  };
  // Get restaurants visible in map during a map drag or a map zoom
  zoomOrDrapMap(ref, map, e) {
    const restaurantsInBounds = this.props.restaurantList.filter(function (restaurant) {
      const coords = {lat: restaurant.latitude, lng: restaurant.longitude};
        if (map.getBounds().contains(coords)) {
        return restaurant;
      }
      return false;
    });
    this.props.getRestaurantsInBounds(restaurantsInBounds);
  }
  // Get all informations about new restaurant
  getNewRestaurant(newRestaurant) {
    this.props.getNewRestaurant(newRestaurant)
  }

  render() {
    return (
      <div style={{ position: "relative", height: "calc(100vh - 50px)"}}>
        <Map 
          google={this.props.google} zoom={10}
          initialCenter={this.props.currentLocation}
          center={this.props.currentLocation}
          onRightclick={this.ShowNewRestaurantWindow}
          onZoomChanged={this.zoomOrDrapMap}
          onDragend={this.zoomOrDrapMap}
        >
          <Marker
            onClick={this.clickOnMarker}
            title={'Ma position'}
            name={'Ma position'}
            icon={marker}
          >
          </Marker>
          {
            this.props.filteredRestaurants.map(restaurant =>
              <Marker
                key={restaurant.id}
                title={restaurant.name}
                name={restaurant.name}
                position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
                onClick={this.clickOnMarker}
              />
            )
          }
          
          <InfoWindow 
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.closeInfoWindow}>
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
          </InfoWindow>
        </Map>

        {
          this.state.newRestaurantWindowIsShown ? 
            <NewRestaurant
              hideNewRestaurantWindow={() => this.setState({newRestaurantWindowIsShown: false})}
              newRestaurantLat={this.state.newRestaurantLat}
              newRestaurantLng={this.state.newRestaurantLng}
              getNewRestaurant={this.getNewRestaurant}
            >
            </NewRestaurant>
          :
          null
        }
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
})(RestaurantMap);
