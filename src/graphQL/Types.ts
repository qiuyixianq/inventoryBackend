export type Items = {
    name: string,
    id: number,
    brand: string,
    price: number,
    quantity: number,
}

export type Transactions = {
    name: string,
    itemId: number,
    transId: number,
    brand: string,
    price: number,
    quantity: number,
    date: string,
}

export type Counter = {
    item: number,
    transaction: number,
}