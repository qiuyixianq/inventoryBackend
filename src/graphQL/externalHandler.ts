export const handlePrice = (priceFrom, priceTo) => {
    if (priceFrom && !priceTo) return { "$gte": priceFrom }
    if (priceFrom && priceTo) return { "$gte": priceFrom, "$lte": priceTo }
    if (!priceFrom && priceTo) return { "$lte": priceTo }
    return { "$gte": 0 }
}

export const handleQuantity = (quantityFrom, quantityTo) => {
    if (quantityFrom && !quantityTo) return { "$gte": quantityFrom }
    if (quantityFrom && quantityTo) return { "$gte": quantityFrom, "$lte": quantityTo }
    if (!quantityFrom && quantityTo) return { "$lte": quantityTo }
    return { "$gte": 0 }
}