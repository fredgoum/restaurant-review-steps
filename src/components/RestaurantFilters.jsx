import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import profile from '../assets/profile.png';
import logo from '../assets/logo.png';

class RestaurantFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minStarsSelected: 0,
      maxStarsSelected: 5,
    }
  }
  // Displays the minimum number of stars to select
  minStars() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const star = <FontAwesomeIcon
                      icon={faStar}
                      color="gray"
                      key={i}
                      className='minStars'
                      id={i}
                      onClick={() => this.colorMinStars(i)}
                      style={{cursor: "pointer"}}
                    >
                    </FontAwesomeIcon>
      stars.push(star);
    }
    return stars;
  }
  // Displays the maximum number of stars to select
  maxStars() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const star = <FontAwesomeIcon 
                      icon={faStar}
                      color="#fcb300"
                      key={i}
                      className='maxStars'
                      id={i}
                      onClick={() => this.colorMaxStars(i)}
                      style={{cursor: "pointer"}}
                    >
                    </FontAwesomeIcon>
      stars.push(star);
    }
    return stars;
  }
  // Color the minimum number of stars selected
  colorMinStars(i) {
    const stars = document.getElementsByClassName('minStars');
    for (let j = 0; j < stars.length; j++) {
      stars[j].style.color = "gray";
      if (stars[j].id <= i) stars[j].style.color = "#fcb300";
    }
    this.setState({minStarsSelected: i}, () => {
      this.getStarsSelected();
    });   
  }
  // Color the maximum number of stars selected
  colorMaxStars(i) {
    const stars = document.getElementsByClassName('maxStars');
    for (let j = 0; j < stars.length; j++) {
      stars[j].style.color = "gray";
      if (stars[j].id <= i) stars[j].style.color = "#fcb300";
    }
    this.setState({maxStarsSelected: i}, () => {
      this.getStarsSelected();
    });   
  }
  // Get the minimum and maximun number of stars selected
  getStarsSelected() {
    this.props.getStarsSelected(this.state.minStarsSelected, this.state.maxStarsSelected);
  }

  render() {
    return (
      <div>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <img id="logo" src={logo} alt="logo"></img>
          <div style={{ marginTop:"10px", textAlign:"center"}}>
            Afficher les restaurants entre {this.minStars()} et {this.maxStars()} étoiles
          </div>
          <div style={{ display:"flex", margin:"10px" }}>
            <div style={{width:"50px"}}>
              <img src={profile} alt="profile" style={{width:"100%", borderRadius:"50px"}}></img>
            </div>
            <span id="greeting" style={{marginTop: "10px", marginLeft:"10px"}}>Salut, Alfred</span>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantFilters;
