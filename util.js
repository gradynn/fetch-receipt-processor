/**
 * Takes a receipt object and returns the total points earned based on various criteria.
 * @param {Object} receipt The receipt object to calculate points from.
 * @returns {number} The total points earned from the receipt.
 */
export const calculatePoints = (receipt) => {
    const alphanumericCharCount = 
        receipt.retailer.match(/[A-Za-z0-9]/g)?.length || 0;
    const totalAsNumber = Number(receipt.total);

    const fromRetailer = alphanumericCharCount;
    const fromTotalIsRoundNumber = totalAsNumber % 1 === 0 ? 50 : 0;
    const fromTotalIsMultiple = totalAsNumber % 0.25 === 0 ? 25 : 0;
    const fromItems = Math.floor(receipt.items.length / 2) * 5;

    const fromItemsDescription = receipt.items.reduce((acc, item) => {
        const trimmedLength = item.shortDescription.trim().length;
        return acc + 
            (trimmedLength % 3 === 0 ? Math.ceil(Number(item.price) * 0.2) : 0);
    }, 0);

    const purchaseDate = parseInt(receipt.purchaseDate.split('-')[2]);
    const fromPurchaseDate = purchaseDate % 2 === 1 ? 6 : 0;

    const purchaseHour = parseInt(receipt.purchaseTime.split(':')[0]);
    const fromPurchaseTime = purchaseHour >= 14 && purchaseHour < 16 ? 10 : 0;

    return fromRetailer + 
        fromTotalIsRoundNumber + 
        fromTotalIsMultiple + 
        fromItems + 
        fromItemsDescription + 
        fromPurchaseDate + 
        fromPurchaseTime;
};