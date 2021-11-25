import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type Items {
        name: String!,
        id: Int!,
        brand: String!,
        price: Float!,
        quantity: Int!
    }

    type Transactions {
        name: String!,
        itemId: Int!,
        transId: Int!,
        brand: String!,
        price: Float!,
        quantity: Int!,
        date: String!,
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

        getAllTransactions : [Transactions!]!
        getTransactionById( transId:Int! ) : Transactions!
        getTransactionByFilter( itemId:Int, brand:String, date:String) : [Transactions!]!
        
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
        modifyItem( 
            id: Int!, 
            name: String, 
            brand: String, 
            price: Float,
            quantity: Int,
        ) : Items!

        #Delete
        deleteItem( id: Int! ) : [Items!]!
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
