import React, { useState } from 'react';
import { render } from 'react-dom';
import Forecast from './components/forecast';
import CitySelector from './components/citySelector';
import Favorites from './components/favorites';


render ( <Home />, document.querySelector('#root'));


function Home () {

  const [city, setCity] = useState( null );
  const [geo, setGeo] = useState( null );
  
  
  function setLocation({ newCity, lat, long }) {
    console.log(`Getting forecast for ${newCity}`, lat, long)
    setCity( newCity );
    setGeo({ lat: lat, long: long });
  }
  
  const myFavorites = new Map();
  myFavorites.set("city 1",  {lat: 1, long: 1}).set("city 2", {lat: 1, long: 1});
  const [favorites, setFavorites] = useState( myFavorites );

  function modifyFavoritesCallback( city: string ) {
    if ( myFavorites.has( city )) {
      myFavorites.delete( city );
    } else {
      myFavorites.set( city, geo);
    }
    setFavorites(myFavorites);
  }


  return (
    <div className={"container"}>
      <CitySelector setLocationCallBack={setLocation} />
      <Forecast city={city} coordinates={geo} modifyFavoritesCallback={modifyFavoritesCallback} />
      <Favorites favorites={favorites} setFavoriteCallback={setLocation} />

      <style> {`
      .container {
        width: 800px;
        padding: 10px;
      }
    `}
    </style>
    </div>
  );
}