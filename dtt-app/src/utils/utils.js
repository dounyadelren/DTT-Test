export function parsePrice(price) {
  if (Number.isInteger(price)) {
    let newPrice = parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return newPrice;
  } else {
    return price
  }

}