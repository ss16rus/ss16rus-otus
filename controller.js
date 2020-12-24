const COMP_NAME = 'Компьютеры';
const NB_NAME = 'Ноутбуки';
const MONO_NAME = 'Моноблоки';
const DISP_NAME = 'Мониторы';
const KB_NAME = 'Клавиатуры';
const MOUSE_NAME = 'Мыши';
const PRN_NAME = 'Принтеры и МФУ';

const groups = [
  {name: COMP_NAME},{name:NB_NAME},{name:MONO_NAME},{name:DISP_NAME},{name:KB_NAME},{name:MOUSE_NAME},{name:PRN_NAME}
]

const manufactures = [
  {name: 'НИКС' },{name: 'Acer'},{name: 'Apple'},{name: 'ASUS'},{name: 'DELL'},{name: 'Lenovo'},{name: 'HP'},{name: 'Epson'},{name: 'Canon'},
]

let items = [
  {
    id: 1,
    group: COMP_NAME,
    name: 'Компьютер Acer Veriton S2660G',
    manufacturer:  'Acer',
    price:  1000,
  },  {
    id: 2,
    group: COMP_NAME,
    name: 'Компьютер ACER Veriton DT.VRDER.1AG',
    manufacturer:  'Acer',
    price:  1000,
  },  {
    id: 3,
    group: COMP_NAME,
    name: 'Компьютер Apple Mac mini (2018 года) MRTR2RU / A',
    manufacturer:  'Apple',
    price:  1000,
  },  {
    id: 4,
    group: COMP_NAME,
    name: 'Компьютер DELL Optiplex 3070-1946',
    manufacturer:  'Dell',
    price:  1000,
  },  {
    id: 5,
    group: COMP_NAME,
    name: 'Компьютер DELL 3681-2628',
    manufacturer:  'Dell',
    price:  1000,
  },  {
    id: 6,
    group: COMP_NAME,
    name: 'Компьютер LENOVO V530s-07ICR',
    manufacturer:  'Lenovo',
    price:  1000,
  },  {
    id: 7,
    group: COMP_NAME,
    name: 'Компьютер LENOVO 11BM0049RU',
    manufacturer:  'Lenovo',
    price:  1000,
  },  {
    id: 8,
    group: COMP_NAME,
    name: 'Компьютер HP 290 G2 SFF (162M3ES)',
    manufacturer:  'HP',
    price:  1000,
  },  {
    id: 9,
    group: COMP_NAME,
    name: 'Компьютер HP 290 G2 SFF (161A2ES)',
    manufacturer:  'HP',
    price:  1000,
  },  {
    id: 10,
    group: NB_NAME,
    name: 'Ноутбук ASUS VivoBook S14 M433IA-EB276',
    manufacturer:  'ASUS',
    price:  1000,
  },  {
    id: 11,
    group: NB_NAME,
    name: 'Ноутбук ASUS ZenBook UX425JA-BM114T',
    manufacturer:  'ASUS',
    price:  1000,
  },  {
    id: 12,
    group: MONO_NAME,
    name: 'Моноблок HP 27-dp0017ur All-in-One',
    manufacturer:  'HP',
    price:  1000,
  },  {
    id: 13,
    group: DISP_NAME,
    name: 'ЖК монитор 21.5" Acer ET221Q bd',
    manufacturer:  'Acer',
    price:  1000,
  },  {
    id: 14,
    group: DISP_NAME,
    name: 'ЖК монитор 23.8" DELL UltraSharp U2419H',
    manufacturer:  'DELL',
    price:  1000,
  },  {
    id: 15,
    group: DISP_NAME,
    name: 'ЖК монитор 23.8" DELL UltraSharp U2419H',
    manufacturer:  'DELL',
    price:  1000,
  },  {
    id: 16,
    group: MOUSE_NAME,
    name: 'Беспроводная, Проводная Мышь ASUS ROG Chakram P704',
    manufacturer:  'ASUS',
    price:  1000,
  },  {
    id: 17,
    group: MOUSE_NAME,
    name: 'Беспроводная Мышь ASUS Wireless Optical WT425',
    manufacturer:  'ASUS',
    price:  1000,
  },  {
    id: 18,
    group: PRN_NAME,
    name: 'МФУ HP LaserJet Pro MFP M132a',
    manufacturer:  'HP',
    price:  1000,
  },  {
    id: 19,
    group: PRN_NAME,
    name: 'МФУ HP Neverstop Laser MFP 1200n',
    manufacturer:  'HP',
    price:  1000,
  },  {
    id: 20,
    group: PRN_NAME,
    name: 'МФУ CANON i-SENSYS MF443dw Белый, черный',
    manufacturer: 'CANON',
    price:  1000,
  },  {
    id: 21,
    group: PRN_NAME,
    name: 'МФУ Canon i-SENSYS MF643Cdw Белый, черный',
    manufacturer: 'CANON',
    price:  1000,
  },  {
    id: 22,
    group: PRN_NAME,
    name: 'МФУ EPSON EcoTank L3150',
    manufacturer: 'EPSON',
    price:  1000,
  },  {
    id: 22,
    group: PRN_NAME,
    name: 'МФУ Epson EcoTank L3160',
    manufacturer: 'EPSON',
    price:  1000,
  },  {
    id: 22,
    group: PRN_NAME,
    name: 'Принтер и МФУ EPSON XP-15000',
    manufacturer: 'EPSON',
    price:  1000,
  },
]


module.exports.getItemGroups = groupId => groupId ? [groups[groupId]] : groups;

module.exports.getManufacturer = name => manufactures.find( manufacturer => manufacturer.name.toLocaleLowerCase() == name.toLocaleLowerCase() );

module.exports.getManufacturerID = name => manufactures.findIndex( manufacturer => manufacturer.name.toLocaleLowerCase() == name.toLocaleLowerCase() );

module.exports.getGroupID = name => groups.findIndex( group => group.name.toLocaleLowerCase() == name.toLocaleLowerCase());

module.exports.getGroupsByManufacturerName = manufacturerName => {
  const groupSet = new Set();

  for( const item of items ) {
    if ( item.manufacturer.toLocaleLowerCase() == manufacturerName.toLocaleLowerCase() ) groupSet.add( item.group );
  }

  return [...groupSet].map( groupName => groups.find( group => group.name.toLocaleLowerCase() == groupName.toLocaleLowerCase() ));
}

module.exports.getItemsInGroup = ( groupName, { companyName, groupId } ) => {
  if ( companyName != null ) {
    const res = items.filter( item =>
      groupName.toLocaleLowerCase() == item.group.toLocaleLowerCase()
        && companyName.toLocaleLowerCase() == item.manufacturer.toLocaleLowerCase());
    return res.length ? res : null;
  }

  if ( groupId != null) {
    const nameById = groups[ groupId ].name;
    const res = items.filter( item =>
      nameById == item.group  && nameById.toLocaleLowerCase() == groupName.toLocaleLowerCase());
    return res.length ? res : null;
  }

  return items.filter( item => groupName.toLocaleLowerCase() == item.group.toLocaleLowerCase());
}

module.exports.getItemGroupName = groupName => groups.find( group => group.name == groupName );

module.exports.appendItem = item =>  {
  item.id = items.length;
  items.push( item );
  console.log( item );
  return items[ items.length -1 ];
}

module.exports.deleteItem = itemId =>  {
  const index = items.findIndex( item => item.id == +itemId );
  if ( index == undefined ) {
    return false;
  }

  items.splice(index, 1);
  return true;
}
