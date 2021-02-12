import React, { Component } from 'react';
import {IForecastData} from './forecast';


interface IProps {
  favorites?: Map<String, IForecastData>,
  setFavoriteCallback: Function
}


export default class Favorites extends Component {
  constructor( private props: IProps ) {
    super( props );
    this.setFavorite = this.setFavorite.bind(this);
  }

  setFavorite( city: string ) {
    const {lat, long } = this.props.favorites.get( city );
    this.props.setFavoriteCallback({
      newCity: city, 
      lat: lat,
      long: long
    });
  }


  render() {
    return (
      <>
      Избранное: 
      <select onChange={ e => {
        this.setFavorite( e.target.value );
      }}>
        {this.props.favorites.size && 
          Array.from(this.props.favorites).map(([city, geo]) => {
            return (
              <option key={city} data-geo={geo}>{city}</option> 
            )
          }) 
        }
      </select>
      </>
    )
  }
}