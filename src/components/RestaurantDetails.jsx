import React from 'react';
import RestaurantStreetview from './RestaurantStreetview';
import Reviews from './Reviews';

class RestaurantDetails extends React.Component {
  // Get all informations about restaurant selected
  selectedRestaurant() {
    return this.props.restaurantList.find(restaurant => restaurant.id === this.props.restaurantId);
  }

  render() {
    return(
      <div id="restaurantDetails">
        <div style={{margin:"10px", textAlign:"center"}}>
            <h4 style={{marginBottom: "0px", color: "#0169aa"}}>
              <b>{this.selectedRestaurant().name}</b>
            </h4>
            <span>{this.selectedRestaurant().formatted_address}</span>
        </div>
        <hr></hr>
            
        <RestaurantStreetview
          restaurantList={this.props.restaurantList} 
          restaurantId={this.props.restaurantId}
        >
        </RestaurantStreetview>

        <Reviews 
          restaurantList={this.props.restaurantList} 
          restaurantId={this.props.restaurantId} 
          hideRestaurantDetails={() => this.props.hideRestaurantDetails()}
        >
        </Reviews>
      </div>
    );
  }
}

export default RestaurantDetails;
