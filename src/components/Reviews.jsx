import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faWindowClose, faSearchLocation } from "@fortawesome/free-solid-svg-icons";

class Reviews extends React.Component {
  // Get all informations about restaurant selected
  selectedRestaurant() {
    return this.props.restaurantList.find(restaurant => restaurant.id === this.props.restaurantId);
  }
  // Display stars of reviews
  stars(numberOfStars) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const star = <FontAwesomeIcon 
                      icon={faStar} 
                      key={i}
                      style={{color: i <= numberOfStars ? "#fcb300" : "gray"}}
                    >
                    </FontAwesomeIcon>
      stars.push(star);
    }
    return stars;
  }

  render() {
    return (
      <div style={{margin:"10px"}}>
        <div>
          <hr></hr>
          <div style={{display:"flex", marginLeft:"10px", marginTop:"20px"}}>
            <FontAwesomeIcon icon={faSearchLocation} color="#0169aa"></FontAwesomeIcon>
            <h6 style={{marginLeft:"5px", color: "#0169aa"}}><b>LES AVIS</b></h6>
          </div>
          <hr></hr>
          {
            this.selectedRestaurant().reviews && this.selectedRestaurant().reviews.map((review, index) => 
              <div 
                style={{marginLeft: "30px", marginRight: "30px", marginBottom: "10px"}} 
                key={index}
              >
                <div>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <h5><b>{review.author_name}</b></h5>
                    <div>{this.stars(review.rating)}</div>
                  </div>
                  <div>{review.text}</div>
                </div>
              </div>
            )
          }
        </div>

        <FontAwesomeIcon 
          icon={faWindowClose} 
          style={{ position: "absolute", top : "2px", right: "3px", cursor: "pointer"}}
          onClick={() => this.props.hideRestaurantDetails()}>
        </FontAwesomeIcon>
      </div>
    );
  }
}

export default Reviews;
