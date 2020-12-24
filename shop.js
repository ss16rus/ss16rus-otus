const graphqlHTTP = require('express-graphql')
var express = require('express')
const app = express()

app.use(express.static(__dirname));

const {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql')

const controller = require ('./controller');
const dataloader = require ('dataloader');


const GroupType = new GraphQLObjectType ({
  name: "Group",
  description: "Группа товаров объединеных по типу, напр. компьютеры, принтеры и проч.",
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: group => {
        return controller.getGroupID( group.name );
      }
     },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList( ItemType ),
      args: {
        companyName: {
          type: GraphQLString,
          defaultValue: null,
          description: 'Название производителя для отбора товаров в группе'
        },

        groupId: {
          type: GraphQLID,
          defaultValue: null,
          description: 'ID производителя для отбора товаров в группе'
        }
      },
      resolve: ( group, args ) => {
        // console.log( "GroupType ", group, args );
        return controller.getItemsInGroup( group.name, args );
      }
    },
    count: {
      type: GraphQLString,
      resolve: group => {
        return controller.getItemsInGroup( group.name, args.companyName ).length || 0;
      }
    }
  })
})


const ManufacturerType = new GraphQLObjectType ({
  name: "Manufacturer",
  description: "Производитель товаров.",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: manufacturer => {
        return controller.getManufacturerID( manufacturer.name );
      }
    },
    name: { type: GraphQLString },
    groups: {
      type: new GraphQLList( GroupType ),
      resolve: manufacturer => {
        return controller.getGroupsByManufacturerName( manufacturer.name );
      }
    }
  })
})


const ItemType = new GraphQLObjectType ({
  name: "Item",
  description: "Товар, напр. компьютер, принтер, ноут и проч. оргтехника",

  fields: {
    id: { type: new GraphQLNonNull( GraphQLID )},
    group: {
      type: GroupType,
      resolve: item => {
        return controller.getItemGroupName( item.group );
      }
    },
    name: { type: GraphQLString },
    manufacturer: {
      type:  ManufacturerType,
      resolve: item => {
        return controller.getManufacturer( item.manufacturer );
      }
    },
    price: { type: GraphQLInt },
  }
})


const query = new GraphQLObjectType({
  name: "GetGroups",
  fields: () => ({
    groups: {
      type: new GraphQLList( GroupType ),
      args: {
        groupId: {
          type: GraphQLID,
          defaultValue: null,
        }
      },
      resolve: ( group, { groupId }) => {
        // console.log( groupId);
        return controller.getItemGroups( +groupId );
      }
    }
  })
})


const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Provided ability to add item, delete item, make order",
  fields: {
    addItem: {
      description: "Add new item into DB: group, name, manufacturer, price",
      type: ItemType,
      args: {
        name: { type: GraphQLString},
        group: { type: GraphQLString},
        manufacturer: { type: GraphQLString},
        price: { type: GraphQLInt},
      },
      resolve: (item, args) => {
        // there should be some authentication
        return controller.appendItem( args );
      }
    },
    deleteItem: {
      description: "Delete item id from DB",
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLID},
      },
      resolve: (item, args) => {
        // there should be some authentication
        console.log('Delete id', args.id);
        return controller.deleteItem( args.id );
      }
    },
    makeOrder: {
      description: "Make order, should provide user ID an list of items ids",
      type: GraphQLString,
      args: {
        userId: { type: GraphQLID },
        ids: { type: GraphQLString },
      },
      resolve: (item, args) => {
        console.log('Making new order', args.userId, args.ids);
        const orderId = "" + args.userId + Date.now();
        return `Order number - ${orderId}`;
      }
    }
  }
})

const schema = new GraphQLSchema ({ query, mutation });

app.use('/', graphqlHTTP.graphqlHTTP ({
  schema: schema,
  graphiql: true,
}))
app.listen (5000, ()=> console.log('Server are listening on 5000'));
