import React, { useState } from 'react';
import { render } from 'react-dom';
import Forecast from './components/forecast';
import CitySelector from './components/citySelector';
import Favorites from './components/favorites';


render ( <Home />, document.querySelector('#root'));


function Home () {

  const [city, setCity] = useState( null );
  const [geo, setGeo] = useState( null );
  const [upd, forceUpdate] = useState( 1 );
  const [favorites, setFavorites] = useState( new Map());
  
  
  function setLocation({ newCity, lat, long }) {
    console.log(`Getting forecast for ${newCity}`, lat, long)
    setCity( newCity );
    setGeo({ lat: lat, long: long });
  }
  

  function modifyFavoritesCallback( city: string ) {
    if ( favorites.has( city )) {
      favorites.delete( city );
    } else {
      favorites.set( city, geo);
    }
    forceUpdate(upd + 1);
    setFavorites(favorites);
  }


  return (
    <div className={"container"}>
      <CitySelector setLocationCallBack={setLocation} />
      <Forecast 
          city={city} 
          coordinates={geo} 
          inFavorites={favorites.has(city)}
          modifyFavoritesCallback={modifyFavoritesCallback} />
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