import { ItemModel } from "../mongoModel/item_model";
import { TransactionModel } from "../mongoModel/transaction_model";
import { CounterModel } from "../mongoModel/counter_model";
import { handlePrice, handleQuantity } from "./externalHandler";

//*similar concept on redux reducers
export const resolvers = {
    Query: {
        getAllItems: async () => {
            const items = await ItemModel.find();
            return items;
        },

        getItemsByName: async (parent, args) => {
            const itemsByName = await ItemModel.find({ "name": { "$regex": args.name, "$options": "i" } })
            return itemsByName;
        },

        getItemsByFilter: async (parent, args) => {
            const { name, id, brand, priceFrom, priceTo, quantityFrom, quantityTo }
                : { name: string, id: number, brand: string, priceFrom: number, priceTo: number, quantityFrom: number, quantityTo: number } = args;

            const itemsByFilter = await ItemModel.find({
                "name": { "$regex": name ? name : '', "$options": "i" },
                "id": id ? id : { $gte: 0 },
                "brand": { "$regex": brand ? brand : '', "$options": "i" },
                "price": handlePrice(priceFrom,priceTo),
                "quantity": handleQuantity(quantityFrom,quantityTo),
            });
            return itemsByFilter;
            //$regex $options $gte(>=) by mongoDB, !=mongoose.
            //https://data-flair.training/blogs/mongodb-regular-expression-regex/
        },

        getAllTransactions: async () => {
            const allTransactions = await TransactionModel.find();
            return allTransactions;
        },

        getTransactionById: async (parent, args) => {
            const { transId }: { transId: number } = args;
            const transaction = await TransactionModel.findOne({ transId });
            return transaction
        },

        getTransactionByFilter: async (parent, args) => {
            const { itemId, brand, date }: { itemId: number, brand: string, date: string } = args

            const transactionsByFilter = await TransactionModel.find({
                "itemId": itemId ? itemId : { $gte: 0 },
                "brand": { "$regex": brand ? brand : '', "$options": "i" },
                "date": { "$regex": date ? date : '', "$options": "i" },
            })

            return transactionsByFilter;
        },



    },

    Mutation: {
        //Create
        addItem: async (parent, args) => {
            const { name, brand, price, quantity }: { name: string, id: number, brand: string, price: number, quantity: number } = args

            //fetch counter.item
            const counter = await CounterModel.findOneAndUpdate({}, { $inc: { item: 1 } }, { new: true });
            let mongoItem
            if(counter){
                mongoItem = new ItemModel({
                    name, id: counter.item, brand, price, quantity
                });
            }

            await mongoItem.save()
            return mongoItem;
        },

        //Update
        addMinusItemQuantity: async (parent, args) => {
            const { id, quantity }: { id: number, quantity: number } = args;

            try {
                const item = await ItemModel.findOneAndUpdate({ id }, { $inc: { quantity: quantity } }, { new: true });

                //is Sell; create transaction
                if (quantity < 0 && item) {
                    const counter = await CounterModel.findOneAndUpdate({}, { $inc: { transaction: 1 } }, { new: true });

                    if (counter) {
                        const newTransaction = new TransactionModel({
                            name: item.name,
                            itemId: item.id,
                            transId: counter.transaction,
                            brand: item.brand,
                            price: item.price,
                            quantity: quantity * -1,
                            date: new Date().toDateString(),
                        })
                        await newTransaction.save();
                    }
                }
                return item


            } catch (err) { console.log(err) }
        },

        modifyItem: async (parent, args) => {
            const { id, name, brand, price, quantity }: { id: number, name: string, brand: string, price: number, quantity: number } = args;

            const updatedItem = await ItemModel.findOneAndUpdate({ id }, { name, brand, price, quantity }, { new: true })
            return updatedItem;
        },

        //Delete
        deleteItem: async (parent, args) => {
            const { id }: { id: number } = args;
            const deletedItems = await ItemModel.findOneAndDelete({ id });
            return deletedItems;
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