import React from 'react';
import Restaurants from './Restaurants';

class RestaurantReview extends React.Component {

  render() {
    return (
      <div>
        <div style={{backgroundColor:"#fcb300", height:"30px"}}>
          <p style={{ fontSize: "12px", textAlign: "center"}}>
            <i>Faites un clique droit sur la carte pour ajouter un restaurant</i>
          </p>
        </div>
        <div id="results-found">
          <span><b> {this.props.filteredRestaurants.length} RÉSULTATS TROUVÉS </b></span>
          <span><b> AVIS </b></span>
        </div>
        <div style={{marginLeft:"5px", marginRight:"5px"}}>
          <Restaurants
            restaurantList={this.props.filteredRestaurants}
          >
          </Restaurants>
        </div>
      </div>
    )
  }
}

export default RestaurantReview;
