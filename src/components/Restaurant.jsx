import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPhone } from "@fortawesome/free-solid-svg-icons";

class Restaurant extends React.Component {
  // Display stars of a restaurant
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
      <div 
        onClick={() => this.props.displayRestaurantDetails(this.props.id)}
        style={{cursor: "pointer"}}
      >
        <hr></hr>
        <div style={{ display: "flex" }}>
          <div style={{width:"20%", borderRadius:"10px"}}>
            <img 
              src={
                `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.props.latitude}`
                + `,${this.props.longitude}&key=${process.env.REACT_APP_MAP_API_KEY}`
              } 
              style={{width:"100%"}}
              alt="Restaurant"
            >
            </img>
          </div>

          <div style={{width:"45%", marginLeft:"10px", marginRight:"5px"}}>
            <h4 style={{color: "#0169aa"}}>
              {this.props.name}
            </h4>
            <span>
              {this.props.formatted_address}
            </span>
            <div>
              <a 
                target="_blank"
                rel="noopener noreferrer"
                href={`${this.props.website}`}
                onClick={(e) => e.stopPropagation()}
              >
                Site web
              </a>
            </div>
          </div>

          <div id="btn-phone-container">
            <a href="tel:+330000000000" onClick={(e) => e.stopPropagation() }>
              <button id="btn-phone">
                  <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                </button>
            </a>
          </div>

          <div style={{width:"18%", position:"relative"}}>
            <div>
              {this.stars(this.props.getAverageRatings)}
            </div>
            <div style={{marginTop:"50px"}}> 
              <button id="btn-review">
                { this.props.reviewsNumber ? <span>{this.props.reviewsNumber} avis</span> : <span>0 avis</span> }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Restaurant;
