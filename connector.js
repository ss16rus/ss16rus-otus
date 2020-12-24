const persons = [
    {
      id: 1,
      name: 'Anton',
      city_id: 1,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },  
    {
      id: 2,
      name: 'Valia',
      city_id: 1,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },
    {
      id: 3,
      name: 'Kolia',
      city_id: 2,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    }, 
    {
      id: 4,
      name: 'Sasha',
      city_id: 1,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },
    {
      id: 5,
      name: 'Olia',
      city_id: 2,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },
    {
      id: 6,
      name: 'Grunia',
      city_id: 1,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },
    {
      id: 7,
      name: 'Dahsa',
      city_id: 2,
      family: {
        mother: 2,
        father: 3,
        brothers: [4,5],
        sisters: [6,7]
      }
    },
]
const cities = [
    {
      id: 1,
      name: 'Moscow',
      country_id: 1,
    },
    {
      id: 2,
      name: 'New York',
      country_id: 2
    }
]
const countries = [
    {
      id: 1,
      name: 'Russia',
      president_id: 1,
    },
    {
      id: 2,
      name: 'USA',
      president_id: 2,
    }
]

let counter = 0;

module.exports.getPersons = function () {
    console.log("Query ---- ", ++counter );
    return new Promise ( resolve => { 
        setTimeout (() => {
            resolve( persons );
        }, 10 );
    });
}

module.exports.getCityById = async function ( city_id ) {
    console.log("Query ---- ", ++counter );
    return new Promise ( resolve => { 
        setTimeout (() => {
            resolve( cities[ city_id ] );
        }, 10 );
    });
}

module.exports.getCitiesByIds = async function ( cityIds ) {
    return new Promise ( resolve => { 
        setTimeout (() => {
            const mCities = cities.filter( city => cityIds.includes( city.id - 1))
            console.log( "Query ---- ", ++counter );
            resolve( mCities );
        }, 10 );
    });
}

module.exports.getPersonById = async function ( id ) {
    console.log("Query ---- ", ++counter );
    return new Promise ( resolve => { 
        setTimeout (() => {
            resolve( persons[ id ] );
        }, 10 );
    });
}

module.exports.getCountryById = async function ( id ) {
    console.log("Query ---- ", ++counter );
    return new Promise ( resolve => { 
        setTimeout (() => {
            resolve( countries[ id ] );
        }, 10 );
    });
}

module.exports.getChildrenById = async function ( person ) { 
    console.log("Query ---- ", ++counter );
    return new Promise ( resolve => { 
        setTimeout (() => {
            resolve( persons.filter( p => person.id == p.family.mother || person.id == p.family.father ));
        }, 10 );
    });
}