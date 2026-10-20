const disCounted = products.filter((t, products) => { return t.discount != 0 })
console.log(disCounted)
console.log(1)
const filterMap = disCounted.map((t) => { return { name: t.name, finalPrice: t.price * (1 - t.discount / 100) } })
console.log(filterMap)
const ReducePrice = filterMap.reduce((sum, t) => { return sum + t.finalPrice }, 0)
console.log(ReducePrice)
//sao chép nông
const newArray = [...products].sort((a, b) => { return a.price - b.price })
console.log(newArray)
const newArray1 = products.reduce((sum, t) => {
    if (!sum[t.category]) { sum[t.category] = []; };
    sum[t.category].push(t.name);
    return sum;
}, {})
console.log(newArray1)
const Expensive = products.reduce((sum, t) => {
    if (!sum[t.category] || t.price > sum[t.category].price) { sum[t.category] = t; }

    return sum;



}, {})
console.log(Expensive)
const EmptyStock = products.some((p) => p.stock === 0)
console.log(EmptyStock)
const Allprice = products.every((p) => p.price > 0)
console.log(Allprice)
console.log(products.find((p) => p.name === "Tivi"))

