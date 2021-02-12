export default async function getCities ( userInput ) {

  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "1223b05dae062645067b74eb9e440c93aa13a801";

  const params: 
    RequestInit = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
      },
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify({
        query: userInput,
        from_bound: { "value": "city" },
        to_bound: { "value": "settlement" },
        restrict_value: true
      })
  }

  return fetch(url, params)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log("error", error));
}