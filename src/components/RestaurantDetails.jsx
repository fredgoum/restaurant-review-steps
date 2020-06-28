import React from 'react';
import RestaurantStreetview from './RestaurantStreetview';
import Reviews from './Reviews';
import NewReview from './NewReview';

class RestaurantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newReviewSectionShown: false,
      userName: '',
      newReview: '',
    }
  }
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
          newReview={this.state.newReview}
          userName={this.state.userName}
          hideRestaurantDetails={() => this.props.hideRestaurantDetails()}
        >
        </Reviews>

        <div id="btn-give-review-container">
          <button 
            id="btn-give-review"
            onClick={() => this.setState({newReviewSectionShown: true})}
          >
            Donner un avis
          </button>
        </div>
        {
          this.state.newReviewSectionShown ? 
            <NewReview 
              restaurantList={this.props.restaurantList}
              restaurantId={this.props.restaurantId} 
              hideNewReviewSection={() => this.setState({newReviewSectionShown: false})}
            >
            </NewReview>
          :
          null
        }
      </div>
    );
  }
}

export default RestaurantDetails;
