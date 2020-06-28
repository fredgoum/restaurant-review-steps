import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";

class RestaurantStreetview extends React.Component {
  // Get all informations about restaurant selected
  selectedRestaurant() {
    return this.props.restaurantList.find(restaurant => restaurant.id === this.props.restaurantId);
  }

	render() {
		return (
			<div style={{margin: "10px"}}>
        <div style={{display:"flex"}}>
          <FontAwesomeIcon icon={faStreetView} color="#0169aa"></FontAwesomeIcon>
          <h6 style={{marginLeft:"5px", color: "#0169aa"}}><b>STREETVIEW</b></h6>
        </div>
        <hr></hr>
        <div style={{textAlign: "center"}}>
          <img 
            src={
                  `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.selectedRestaurant().latitude}`
                  + `,${this.selectedRestaurant().longitude}&key=${process.env.REACT_APP_MAP_API_KEY}`
                } 
            style={{maxHeight: "180px"}}
            alt="Streetview indisponible"
          >
          </img>
        </div>
      </div>
		);
	}
}

export default RestaurantStreetview;
