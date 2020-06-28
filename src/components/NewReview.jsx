import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      comment: '',
      stars: 0,
    };

    this.nameChange = this.nameChange.bind(this);
    this.commentChange = this.commentChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  // Get all informations about restaurant selected
  selectedRestaurant() {
    return this.props.restaurantList.find(restaurant => restaurant.id === this.props.restaurantId);
  }
  // Display stars to select for the new review
  stars() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const star = <FontAwesomeIcon 
                      icon={faStar}
                      color="gray"
                      key={i}
                      className='stars'
                      id={i}
                      onClick={() => this.colorStars(i)}
                      style={{cursor: "pointer"}}
                    >
                    </FontAwesomeIcon>
      stars.push(star);
    }
    return stars;
  }
  // Color stars selected
  colorStars(i) {
    const stars = document.getElementsByClassName('stars');
    for (let j = 0; j < stars.length; j++) {
      stars[j].style.color = "";
      if (stars[j].id <= i) stars[j].style.color = "#fcb300";
    }
    this.setState({stars: i})
  }
  // Get author name
  nameChange(e) {
    this.setState({name: e.target.value});
  }
  // Get author comment
  commentChange(e) {
    this.setState({comment: e.target.value});
  }
  submit(e) {
    const review = {};
    review.author_name = this.state.name;
    review.text = this.state.comment;
    review.rating = this.state.stars;
    this.selectedRestaurant().reviews.push(review);
    this.props.hideNewReviewSection();
  }

  render() {
    return (
    <div style={{textAlign: "center"}}>
      <div style={{textAlign: "center"}}>
        <span>
          <i>Partagez votre expérience concernant ce lieu</i>
        </span>
      </div>
      <div style={{margin: "20px"}}>
        <div style={{marginBottom: "10px"}}>
          {this.stars()}
        </div>
        <div style={{marginBottom: "10px"}}>
          <div><span>Nom et prénom</span></div>
          <input
            style={{width: "80%"}} 
            type="text" 
            value={this.state.name} 
            onChange={this.nameChange}
          />
        </div>
        <div style={{marginBottom: "10px"}}>
          <div><span>Que pensez-vous de ce restaurant ?</span></div>
          <textarea
            style={{width: "80%"}}
            value={this.state.comment} 
            onChange={this.commentChange}
          />
        </div>
        <div style={{display: "flex", justifyContent: "flex-end", marginRight: "55px"}}>
          <button 
            className="btn-cancel" 
            onClick={() => this.props.hideNewReviewSection()}
          >
            Annuler
          </button>
          <button 
              className="btn-submit"
              onClick={this.submit}>
            Publier
          </button>
        </div>
      </div>
    </div>
    );
  }
}

export default NewReview;
