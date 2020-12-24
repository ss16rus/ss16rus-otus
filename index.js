document.body.onload = showGroups;

const myBasket = new Map();

const groupsContainer = document.querySelector('#groups');
groupsContainer.addEventListener('click', e => {
  e.stopPropagation();
  const elementId = e.target.id;
  const elementClass = e.target.className;

  if ( elementId.includes('group_')) {

    if ( e.target.nextSibling ) {
      clearPreviousResults();
    } else {
      const groupId = + elementId.split('-')[1];
      showItemsByGroup( e.target.parentElement, groupId );
    }

    return false;
  }

  if ( elementClass.includes('manufacturer')) {
    const manufacturerName = elementClass.split('-')[1];
    showItemsByManufacturer( manufacturerName );
    return false;
  }
});


const addItemToDBForm = document.querySelector('#addItemToDB');
addItemToDBForm.addEventListener('submit', addItemToDB );


function showGroups () {
  const query = `
  query {
    groups {
      name
    }
  }`

  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'query': query })
  })
  .then( res => res.json())
  .then( ({ data: { groups }}) => {
    groupsContainer.innerHTML = '';

    for( const group of groups ) {
      const groupContainer = document.createElement('div');
      groupContainer.id = `group-${groups.indexOf( group )}`;

      const groupContainerTitle = document.createElement('div');
      groupContainerTitle.id = `group_title-${groups.indexOf( group )}`;
      groupContainerTitle.innerHTML = group.name;
      groupContainer.appendChild( groupContainerTitle );
      groupsContainer.appendChild( groupContainer );
    }
  });
}


function clearPreviousResults () {
  const elementsShown = document.querySelectorAll("[id^='item-']");
  if ( elementsShown.length > 0 ) {
    for ( let element of elementsShown ) {
      element.remove();
    }
  }
}


function showItemsByGroup ( groupElem, groupId ) {
  if ( groupElem.children.length > 1 ) return;

  const query = `
  query {
    groups {
      items(groupId: ${groupId}) {
        id
        name
        price
        manufacturer {
          name
        }
      }
    }
  }`

  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'query': query })
  })
  .then( res => res.json())
  .then( ({ data: { groups }}) => {
    clearPreviousResults();

    for( const {items} of groups ) {
      if ( items == null ) continue;

      for (const item of items ) {
        groupElem.appendChild( createItemElement( item ) );
      }
    }
  });
}


function createItemElement ( item ) {
  const { id, name } = item;

  const itemContainer = document.createElement('div');
  itemContainer.id = `item-${id}`;
  itemContainer.innerHTML = name;

  itemContainer.addEventListener('mouseenter', () => {
    showControls( itemContainer, item );
  });
  itemContainer.addEventListener('mouseleave', () => {
    itemContainer.querySelector('#controls').remove();
  });

  return itemContainer
}


function showItemsByManufacturer ( manufacturerName ) {
  const query = `
  query {
    groups {
      items(companyName: "${manufacturerName}") {
        name
        id
        manufacturer {
          id
          name
        }
        group {
          id
          name
        }
        price
      }
    }
  }`

  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'query': query })
  })
  .then( res => res.json())
  .then( ({ data: { groups }}) => {
    console.log( groups);
    const groupElem = document.querySelector("#groups");
    groupElem.innerHTML = `<br>${manufacturerName.toUpperCase()}`;
    groupElem.prepend( getHomeButton());

    for( const {items} of groups ) {
      if ( items === null ) continue;

      for (const item of items ) {
        groupElem.appendChild( createItemElement( item ));
      }
    }
  });
}


function showControls ( parent, item ) {
  const { id, price, manufacturer } = item;

  const controlsContainer = document.createElement('div');
  controlsContainer.id = `controls`;

  const manufacturerElement = document.createElement("span");
  manufacturerElement.className = `manufacturer-${manufacturer.name}`;
  manufacturerElement.textContent = `Производитель: ${manufacturer.name}`;

  const priceElement = document.createElement('span');
  priceElement.textContent = ` Цена: ${price}`;

  const idElement = document.createElement('span');
  idElement.textContent = ` ID: ${id}`;

  const addIntoBasketBtn = document.createElement('button');
  addIntoBasketBtn.textContent = 'В корзину';

  controlsContainer.appendChild( idElement );
  controlsContainer.appendChild( document.createElement('br'));
  controlsContainer.appendChild( manufacturerElement );
  controlsContainer.appendChild( document.createElement('br'));
  controlsContainer.appendChild( priceElement );
  controlsContainer.appendChild( document.createElement('br'));
  controlsContainer.appendChild( addIntoBasketBtn );

  addIntoBasketBtn.addEventListener('click', e => {
    e.stopPropagation();
    addItemIntoBasket( id, item );
  })

  parent.appendChild( controlsContainer );
}


function addItemIntoBasket ( itemId, item ) {
  console.log(`Added item ${itemId} into basket`);
  myBasket.set( itemId, item );
}


function showBasket () {
  groupsContainer.innerHTML = "<br> Корзина";
  groupsContainer.prepend( getHomeButton());

  for( const item of myBasket.values() ) {
    const elementItem = createItemElementInBasket( item );
    groupsContainer.append( elementItem );
  }
}


function createItemElementInBasket ( item ) {
  const { id, name } = item;

  const itemContainer = document.createElement('div');
  itemContainer.id = `item-${id}`;
  itemContainer.innerHTML = name;

  itemContainer.addEventListener('mouseenter', () => {
    showControlsInBasket( itemContainer, item );
  });
  itemContainer.addEventListener('mouseleave', () => {
    itemContainer.querySelector('#controls').remove();
  });

  return itemContainer
}


function showControlsInBasket ( parent, item ) {
  const { id, price, manufacturer } = item;

  const controlsContainer = document.createElement('div');
  controlsContainer.id = `controls`;

  const manufacturerElement = document.createElement("span");
  manufacturerElement.className = `manufacturer-${manufacturer.name}`;
  manufacturerElement.textContent = `Производитель: ${manufacturer.name}`;

  const priceElement = document.createElement('span');
  priceElement.textContent = ` Цена: ${price}`;

  const deleteFromBasketBtn = document.createElement('button');
  deleteFromBasketBtn.textContent = 'Удалить';

  controlsContainer.appendChild( manufacturerElement );
  controlsContainer.appendChild( document.createElement('br'));
  controlsContainer.appendChild( priceElement );
  controlsContainer.appendChild( document.createElement('br'));
  controlsContainer.appendChild( deleteFromBasketBtn );

  deleteFromBasketBtn.addEventListener('click', e => {
    e.stopPropagation();
    deleteFromBasket( id );
    parent.remove();
  })

  parent.appendChild( controlsContainer );
}


function deleteFromBasket ( id, item ) {
  myBasket.delete( id );

}


function makeOrder () {
  const userId = Math.round(Math.random() * 1e9);
  const items = new Array(...myBasket.keys()).join(',');
  console.log(userId, items);
  const mutation = `
  mutation {
    makeOrder (userId: ${userId}, ids: "${items}")
  }`
  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 'query': mutation })
  })
  .then( res => res.json())
  .then( ({data})=> {
    alert( data.makeOrder );
    myBasket.clear();
  });
}


function getHomeButton () {
  const homeBtn = document.createElement("span");
  homeBtn.textContent = '<<< ';
  homeBtn.style.cursor = 'pointer';
  homeBtn.style.textDecoration = 'underline';
  homeBtn.addEventListener('click', e => {
    e.stopPropagation();
    showGroups();
  });
  return homeBtn;
}


function addItemToDB ( event ) {
  event.stopPropagation();
  event.preventDefault();

  console.log( this );
  const mutation = `
  mutation {
    addItem (
      name: "${this.item_name.value.trim()}",
      group: "${this.item_group.value.trim()}",
      manufacturer: "${this.item_manuf.value.trim()}",
      price: ${this.item_price.value}
    ) {
      id
    }
  }`

  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'query': mutation })
  })
  .then( res => res.json())
  .then( data => {
    console.log(data);
    this.reset();
    showGroups();
  });

  return false;
}


function deleteItemFromDB () {
  const elemId = document.querySelector("#item_id");
  const mutation = `
  mutation {
    deleteItem (
      id: ${elemId.value}
    )
  }`

  fetch('http://192.168.1.11:5000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'query': mutation })
  })
  .then( res => res.json())
  .then( ({data}) => {
    if ( data ) {
      alert(`Item ${elemId.value} was successfully deleted`);
      showGroups();
    }
    elemId.value = '';
  });

  return false;
}
