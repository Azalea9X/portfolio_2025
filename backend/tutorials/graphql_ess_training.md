## Setting up Persistence
### Installing MongoDB for GraphQL 
The author of the video uses Robo3t, checks to see if it's working correctly. You just need to connect to it. 

Emmanual intalls mongoose. You should have Robo3t up and running. 

### Finalize the database connectors
Under a file called db_connectors is where the database will be connected. First, mongoose needs to be connected. Secondly, he's going to do an async function

async function connectMongo() {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        console.log("MongoDB connected")
})}

The proper practice is after you have all of this running, you don't want to do too many console.log's because this is showing up on the server. We want to create a mongoose schema to know what to expect on the mongoose server. 

const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: String, 
    inventory: Number,
    stores: []
})

const Widget = mongoose.model('Widget', widgetSchema)




### Update resolvers for MongoDB
The author of the video is going to update the resolvers to use MongoDB.

getProduct: async({id}) => {
    try {
    const product = await Widget.findById(id)
    return product}

    catch{

        if (error) {
            throw new Error(error)
        }
    }
}


### Database persistence with SQL

### Database persistence with SQLite and GraphQL

First, install the required dependencies:


npm install sqlite3 sequelize graphql


Now, let's create a basic connector for SQLite and GraphQL:


const { Sequelize, DataTypes } = require('sequelize');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// SQLite connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define a Product model
const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  inventory: {
    type: DataTypes.INTEGER
  }
});

// Sync the model with the database
sequelize.sync();

// Define GraphQL types
const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    inventory: { type: GraphQLInt }
  }
});

// Define root query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Product.findByPk(args.id);
      }
    }
  }
});

// Create GraphQL schema
const schema = new GraphQLSchema({
  query: RootQuery
});

module.exports = { sequelize, Product, schema };


This code sets up a basic SQLite database connection using Sequelize, defines a Product model, and creates a GraphQL schema with a simple query to fetch a product by ID. You can expand on this to add more complex queries and mutations as needed.



A query for it in postman
    
         query {
            getAllPosts {
              id
              title
              content
              author
              createdAt
              updatedAt
              deletedAt
            }
          } 
            
          To use an alias, you call the first query, let's say that you call it WidgetOne, you pass an ID of that product, Emmmanual will go inside Robot3 to get the ID. He would like the name, price, and description. 
          
          THen, he will get a second query, 
          
          widgettwo:getproduct(id:number) {
          name
          invnetory}
          
          What he's done is a syntax arounda n alias, widgetone, and then widgetwo, is getting information from the product. You could also hae a third widget be a different alias name. 
          
          query{
    queryOne:getAllPosts{
        title
        content
    }
}

For fragments, what if we wanted to have the same information acros sall these different IDs? 

fragment productFragment on Product{
name
description
price
}

All we have to do is remove the different categories that are the same and put in productFragment. With that query, we can build multiple queries with aliases, but, have the same info with aliases.

Now, we will get all the information across. First, we will get a single user, and, then, get it across all the users.

Very much like aliases, the use case is similar. 

Next steps
You should be able to get your GraphQL server and mutations. Whenever you need help there is a GraphQL community on Slack. 


Example queries

mutation {
  addPost(
    id: "${randomHex}"
    title: "Sample Post"
    content: "This is a sample post."
    author: "John Doe"
    createdAt: "2021-01-01T12:00:00Z"
    updatedAt: "2021-01-01T12:00:00Z"
    deletedAt: null
  ) {
    id
    title
    content
    author
    createdAt
    updatedAt
    deletedAt
  }
}

Create a query for getPost to run the mutation

mutation {
  getPost(
    id: "${randomHex}"
  ) {
    id
    title
    content
    author
    createdAt
    updatedAt
    deletedAt
  }

  Create a query for updatePost to run the mutation 

  mutation {
    updatePost(
      id: "${randomHex}"
      title: "Updated Sample Post"
      content: "This is an updated sample post."
      author: "John Doe"
      createdAt: "2021-01-01T12:00:00Z"
      updatedAt: "2021-01-01T12:00:00Z"
      deletedAt: null
    ) {
      id
      title
      content
      author
      createdAt
      updatedAt
      deletedAt
    }
  }

  Create a query for deltePost to run the mutation 

  mutation {
    deletePost(
      id: "${randomHex}"
    ) {
      id
      title
      content
      author
      createdAt
      updatedAt
      deletedAt
    }
  }
}


query{
products{
name
price
description
stores}
} 


mutation {
  getProduct(
    id: 4
  ) {
    id
    name
    price
    description
    soldout
    inventory
    stores
  }
}