import { items } from "../TestData/items"
import { transactions } from "../TestData/transaction";
import { Items, Transactions } from "./Types";

//*similar concept on redux reducers
export const resolvers = {
    Query: {
        getAllItems: () => {
            return items;
        },

        getItemsByName: (parent, args) => {
            const filteredItem : Array<Items> = items.filter(item => item.name === args.name);
            return filteredItem;
        },

        getItemsByFilter: (parent, args) => {
            const { name, id, brand, price, quantity } 
            : { name:string, id:number, brand:string, price:number, quantity:number } = args;
            
            //will do straight with mongoDB no need sakit kepala
            //return dummy first
            return items;
        },

        getAllTransactions: () => {
            return transactions;
        },

        getTransactionById: (parent, args) => {
            const { transId } : { transId:number } = args;
            return transactions[transactions.findIndex(trans => trans.transId === transId)];
        },

        getTransactionByFilter: (parent, args) => {
            const { itemId, brand, date } : { itemId:number, brand:string, date:string } = args
            return transactions;
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
            const { id, quantity } : { id:number, quantity:number } = args;
            //mongo
            const updatedItem : Array<Items> = items.filter(item => item.id === id);
            updatedItem[0].quantity += quantity;

            if(quantity < 0){
                const newTransaction : Transactions = {
                    name: updatedItem[0].name,
                    itemId: updatedItem[0].id,
                    transId: 999,
                    brand: updatedItem[0].brand,
                    price: updatedItem[0].price,
                    quantity: quantity * -1,
                    date: new Date().toString(),
                }
                transactions.push(newTransaction);
            }

            return updatedItem[0]
        },
        
        modifyItem: (parent, args) => {
            const { id, name, brand, price, quantity } : { id:number, name:string, brand:string, price:number, quantity:number } = args;
            const index : number = items.findIndex(item => item.id === id);
            if(name) items[index].name = name;
            if(brand) items[index].brand = brand;
            if(price) items[index].price = price;
            if(quantity) items[index].quantity = quantity;
            return items[index];
        },

        //Delete
        deleteItem: (parent, args) => {
            const { id } : { id:number } = args;
            const updatedItems : Array<Items> = items.filter(item => item.id !== id);
            return updatedItems;
        },
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