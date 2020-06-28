import React from 'react';
import Restaurant from './Restaurant';
import RestaurantDetails from './RestaurantDetails';

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRestaurantDetails: false,
      restaurantId: 1
    };

    this.displayRestaurantDetails = this.displayRestaurantDetails.bind(this);
  }
  // Calculate restaurant's ratings average
  getAverageRatings(restaurant) {
    if (restaurant.reviews && restaurant.reviews.length) {
      const someRatings = restaurant.reviews.map(review => review.rating).reduce((acc, val) => acc + val);
      const averageRatings = someRatings / restaurant.reviews.length;
      return parseFloat(averageRatings.toFixed(1));
    }
  }
  // Display restaurant details after click on restaurant
  displayRestaurantDetails(restaurantId) {
    this.setState({restaurantId: restaurantId});
    this.setState({showRestaurantDetails: true});
  }
  // Display list of restaurants
  displayResataurants() {
    const restaurants = [];
    this.props.restaurantList.forEach((restaurant, i) => {
      restaurants.push(
        <Restaurant 
          key={i}
          id={restaurant.id}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
          name={restaurant.name} 
          formatted_address={restaurant.formatted_address}
          website={restaurant.website}
          reviews={restaurant.reviews}
          reviewsNumber={restaurant.reviews && restaurant.reviews.length}
          getAverageRatings={this.getAverageRatings(restaurant)}
          displayRestaurantDetails={this.displayRestaurantDetails}
        >
        </Restaurant>
      );
    });

    if (restaurants.length) {
      return (<div>{restaurants}</div>);
    }
    return (
      <div style={{marginTop: "200px", textAlign: "center"}}>
        <span>Aucun résultat. Veuillez appliquer un autre filtre.</span>
      </div>
    );
  }
  
  render() {
    return (
      <div style={{marginBottom:"10px"}}>
        <div>
          {this.displayResataurants()}
        </div>
        {
          this.state.showRestaurantDetails ? 
            <RestaurantDetails
              restaurantList={this.props.restaurantList}
              restaurantId={this.state.restaurantId} 
              hideRestaurantDetails={() => this.setState({showRestaurantDetails: false})}
            >
            </RestaurantDetails>
          :
          null
        }
      </div>
    )
  }
}

export default Restaurants;
