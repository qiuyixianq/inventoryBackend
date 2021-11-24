import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Items {
        name: String!,
        id: Int!,
        brand: String!,
        price: Float!,
        quantity: Int!
    }

    #Queries
    type Query {
        #Read
        getAllItems: [Items!]!
        getItemsByName(name: String!): [Items!]!
        getItemsByFilter(
            name: String
            id: Int
            brand: String
            price: Float
            quantity: Int
        ): [Items!]!
    }

    #Mutations
    type Mutation {
        #Create
        addItem( 
            name: String!, 
            id: Int!, 
            brand: String!, 
            price: Float!,
            quantity: Int!,
        ) : Items!

        #Update
        addMinusItemQuantity( id: Int!, quantity: Int! ) : Items!
        deleteItem( id: Int! ) : [Items!]!
        modifyItem( 
            id: Int!, 
            name: String, 
            brand: String, 
            price: Float, 
            quantity: Int 
        ) : Items!
    }
`;

/*
    `!` - required
    Built-in Types:

    String
    Int - signed 32bit
    Float
    Boolean

    [`Types`] - arr of `types` // [String] - arr of String



*/
