import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

class NewRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      name: '',
      formatted_address: ''
    };

    this.nameChange = this.nameChange.bind(this);
    this.addressChange = this.addressChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  // Get new restaurant address
  async componentDidMount() {
    try {
      const lat = this.props.newRestaurantLat;
      const lng = this.props.newRestaurantLng;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_MAP_API_KEY}`;
  
      const res = await fetch(url);
      if (! res.ok) {
          throw new Error(res.status);
      }
      const data = await res.json();
      this.setState({formatted_address: data.results[0].formatted_address});
    } catch (error) {
      console.log('error');
    }
  }
  // Display stars of new restaurants
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
  // Color stars chosen for a new restaurant
  colorStars(i) {
    const stars = document.getElementsByClassName('stars');
    for (let j = 0; j < stars.length; j++) {
      stars[j].style.color = "";
      if (stars[j].id <= i) {
        stars[j].style.color = "#fcb300";
      }
    }
    this.setState({stars: i})
  }
  nameChange(e) {
    this.setState({name: e.target.value});
  }
  addressChange(e) {
    this.setState({formatted_address: e.target.value});
  }
  // Generate a unique id for a new restaurant
  uuid() {
    return (new Date().getTime()).toString(36) + Math.random().toString(36).slice(-7);
  }
  submit(e) {
    const newRestaurant = {};
    newRestaurant.id = this.uuid();
    newRestaurant.latitude = this.props.newRestaurantLat;
    newRestaurant.longitude = this.props.newRestaurantLng;
    newRestaurant.name = this.state.name;
    newRestaurant.formatted_address = this.state.formatted_address;
    newRestaurant.reviews = [{author_name: "Geek Mystère", "rating": this.state.stars, text: "J'suis un mystère."}];
    this.props.getNewRestaurant(newRestaurant);
    this.props.hideNewRestaurantWindow();
  }

  render() {
    return(
      <div id="newRestaurant">
        <div>
          <span><b>Ajoutez un restaurant</b></span>
        </div>
        <div style={{margin: "20px"}}>
          <div style={{marginBottom: "10px"}}>
            {this.stars()}
          </div>
          <div style={{marginBottom: "10px"}}>
              <div><span>Nom du restaurant</span></div>
              <input 
                style={{width: "80%"}} 
                type="text" 
                value={this.state.name} 
                onChange={this.nameChange}
              />
          </div>
          <div style={{marginBottom: "10px"}}>
            <div><span>Adresse du restaurant</span></div>
            <textarea 
              style={{width: "80%"}} 
              value={this.state.formatted_address} 
              onChange={this.addressChange}
            />
          </div>
          <div style={{display: "flex", justifyContent: "center"}}>
            <button 
              className="btn-cancel"
              onClick={() => this.props.hideNewRestaurantWindow()}
            >
              Annuler
            </button>
            <button 
              className="btn-submit"
              onClick={this.submit}
            >
              Publier
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewRestaurant;
