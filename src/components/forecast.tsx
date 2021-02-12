import React, { Component } from 'react';
import fetchForecast from '../lib/fetchForecast';
import WeatherView from './weatherView';

export interface WeatherData {
  clouds: number,
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
  },
  wind: {speed: number, deg: number},
}

interface IState {
  forecast: null | WeatherData,
}

export interface IForecastData {
  lat: number, 
  long: number, 
  units?: string, 
  lang?: string
}


interface IProps {
  city: string,
  coordinates: {
    lat: number,
    long: number
  },
  modifyFavoritesCallback: Function
}


export default class Forecast extends Component {
  [x: string]: any;

  state: IState;

  constructor (private props: IProps ) {
    super ( props );
    this.state = { forecast: null };
    this.reload = this.reload.bind(this);
    this.changeFavorites = this.changeFavorites.bind(this);

    console.log('Forecast constructor');
  }


  updateForecast( data: IForecastData ) {
    fetchForecast( data )
    .then( forecast => {
      console.log( forecast );
      const {
        clouds,
          main: {
            feels_like,
            humidity,
            pressure,
            temp,
            temp_max,
            temp_min,
          },
          wind: {speed, deg}
      } = forecast;

      const newforecast = {
        clouds: clouds,
        main: {
          feels_like: feels_like,
          humidity: humidity,
          pressure: pressure,
          temp: temp,
          temp_max: temp_max,
          temp_min: temp_min,
        },
        wind: {speed: speed, deg: deg}
      }

      this.setState({ forecast: newforecast });
    });
  }


  shouldComponentUpdate( newProps: IProps, newState: IState ) {
    console.log('shouldComponentUpdate, newProps', newProps );
    console.log('shouldComponentUpdate, this.props', this.props );
    console.log('shouldComponentUpdate, newState', newState );
    console.log('shouldComponentUpdate, this.state', this.state );

    if ( this.props.city != newProps.city ) { // обновился город
      this.updateForecast( newProps.coordinates );
      return true;
    }

    if ( !this.state.forecast && newState.forecast ) { // ничего не было 
      return true;
    }

    if ( this.state.forecast && !newState.forecast ) { // нажата кнопка reload
      this.updateForecast( newProps.coordinates );
      return true;
    }

    return false;
  }


  componentDidUpdate( prevProps ) {
    console.log('componentDidUpdate prevProps', prevProps );
    console.log('componentDidUpdate this.props', this.props );
    console.log('componentDidUpdate this.state', this.state );
  }


  reload() : void {
    this.setState({forecast: null});
  }


  changeFavorites () {
    this.props.modifyFavoritesCallback( this.props.city );
  }


  render () {
    console.log('Forecast render this.props', this.props );
    console.log('Forecast render this.state', this.state );
    return (
      <>
        { this.props.city ? 
        <>
          <div style={{padding: '5px 0', fontWeight: 'bold'}}>
            Погода в {this.props.city + " "}
            <button onClick={this.changeFavorites}>*</button>
          </div>
        </>
        :
        <div>Город не выбран...</div>
        }

      { this.props.city && !this.state.forecast && <div>Загружаем данные...</div> } 
      { this.props.city && this.state.forecast && <WeatherView data={this.state.forecast} reload={this.reload} /> } 
      </>
    )
  }
}