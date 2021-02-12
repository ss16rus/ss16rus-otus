import React, { Component } from 'react';
import getCities from '../lib/cities';

interface IState {
  suggestedCities: any[];
}


export default class CitySelector extends Component {
  [x: string]: any;

  searchTimeout: null | ReturnType<typeof setTimeout> = null;
  state: IState;
  cityInput: HTMLInputElement;

  constructor (private props ) {
    super( props );

    this.state = {
      suggestedCities: [],
    }

    this.newUserInput = this.newUserInput.bind(this);
  }


  newUserInput (event: any) {
    let userInput = event.target.value;
    userInput = userInput.trim();
    if ( !userInput.length || userInput.length > 10 ) return;

    if ( this.searchTimeout ) {
      clearTimeout( this.searchTimeout );
    }

    this.searchTimeout = setTimeout(() => {
      getCities( userInput )
      .then( ({suggestions}) => {
        const citiesArray = suggestions.map( ({data, value }) => ({...data, value: value}));
        this.setState({ suggestedCities: citiesArray })
        // console.log(citiesArray)
      });
    }, 800);
  }


  selectLocation( ) {
    const {geo_lat, geo_lon} = this.state.suggestedCities.find(({value}) => value == this.cityInput.value )
    this.props.setLocationCallBack({newCity: this.cityInput.value, lat: geo_lat, long: geo_lon });
    this.cityInput.value = "";
  }


  render() {
    return (
      <div className={"city_selector"}>
        Выберите город: 
        <input list="variants" 
               ref={el => this.cityInput = el} 
               type="text"
               onChange={this.newUserInput} 
               placeholder='Начните вводить название города'/>

        <datalist id="variants" onClick={e => console.log(e)}>
          {this.state.suggestedCities && 
            this.state.suggestedCities.map(({ value }) => 
              <option key={value} value={value}/>
            )}
        </datalist>
        {' '}
        <button onClick={()=> this.selectLocation()}>Выбрать</button>

        <style>{`
          .city_selector {
            width: 100%;
            padding-bottom: 10px;
            display: flex;
          }
          .city_selector input {
            flex: 1 1 auto;
            margin: 0 .5em;
          }
        `}
        </style>
      </div>
    )
  }

}