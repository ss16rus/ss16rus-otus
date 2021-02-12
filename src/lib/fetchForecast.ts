export default function({lat, long, lang="ru", units="metric"}) {
  const apiKey = '0b88fd6b6da157199444d658f36ca629';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`
  return fetch(url).then( data => data.json());
}