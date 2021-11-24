import { items } from "../TestData/items"
import { Items } from "./Types";

//*similar concept on redux reducers
export const resolvers = {
    Query: {
        getAllItems: () => {
            return items;
        },

        getItemsByName: (parent, args) => {
            const filteredItem = items.filter(item => item.name === args.name);
            return filteredItem;
        },

        getItemsByFilter: (parent, args) => {
            //will do straight with mongoDB no need sakit kepala
            //return dummy first
            return items;
        }
    },

    Mutation: {
        //Create
        addItem: (parent, args) => {
            const newItem : Items = args;
            //mongo
            items.push(newItem);
            return newItem;
        },

        //Update
        addMinusItemQuantity: (parent, args) => {
            const { id, quantity } = args;
            //mongo
            const updatedItem : Array<Items> = items.filter(item => item.id === id);
            updatedItem[0].quantity += quantity;
            return updatedItem[0]
        },

        deleteItem: (parent, args) => {
            const { id } = args;
            const updatedItems : Array<Items> = items.filter(item => item.id !== id);
            return updatedItems;
        },

        modifyItem: (parent, args) => {
            const { id, name, brand, price, quantity } = args;
            const index : number = items.findIndex(item => item.id === id);
            if(name) items[index].name = name;
            if(brand) items[index].brand = brand;
            if(price) items[index].price = price;
            if(quantity) items[index].quantity = quantity;
            return items[index];
        }
    }
}

/* 
    docs:  https://www.apollographql.com/docs/apollo-server/data/resolvers/
    func args:
    parent - return value of resolver for this field's parent (the prev rsolver in chain)
    args - an obj contains all args
    context - an obj shared accross all resolvers
    info - info on exe state (filed name, path etc)
*/