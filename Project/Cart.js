import { finalPrice, formatPrice } from "./Utils.js";
import { products } from "./Data.js";
export function renderCart(list) {
    let html = ``
    if (list) {
        if (list.length === 0) { html = `<tr>"Chưa có sản phẩm nào"</tr>`; }
        else {

            html = list.map((product) => {
                return `<tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${formatPrice(product.quantity * finalPrice(product))}</td>
            <td><button class="decrease-btn" data-name="${product.name}">-</button></td>
            <td><button class="removeBtn" data-name="${product.name}">Xóa</button></td>
           
            </tr>
            `
            }).join("")


        }
        document.querySelector(".CartBody").innerHTML = html;
        const total = list.reduce((sum, product) => { return sum + finalPrice(product) * product.quantity }, 0)
        document.querySelector(".total").textContent = `Tổng tiền: ${formatPrice(total)}`;
    }
}
export function CartFunction(cart) {
    //Thêm
    if (cart) {
        document.querySelector(".products").addEventListener("click", (event) => {
            if (event.target.classList.contains("addBtn")) {
                const name = event.target.dataset.name;
                const product = products.find((product) => { return product.name === name; })
                const existing = cart.find((product) => { return product.name === name; })
                if (existing) { existing.quantity += 1; }
                else {
                    cart.push({ ...product, quantity: 1 })
                }
                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cart)
            }
        })
        //Giảm
        document.querySelector(".CartBody").addEventListener("click", (event) => {
            if (event.target.classList.contains("decrease-btn")) {
                const name = event.target.dataset.name;
                const removeProduct = cart.find((product) => { return product.name === name })
                console.log(removeProduct)
                if (removeProduct.quantity > 1) { removeProduct.quantity -= 1; }
                else { cart = cart.filter((product) => { return product !== removeProduct }) }
                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cart)

            }


        })
        //Xóa
        document.querySelector(".CartBody").addEventListener("click", (event) => {
            if (event.target.classList.contains("removeBtn")) {
                const name1 = event.target.dataset.name;
                console.log(name1)
                const removeProduct = cart.find((product) => { return product.name === name1 })
                console.log(removeProduct)
                cart = cart.filter((product) => { return product !== removeProduct })
                localStorage.setItem("cart", JSON.stringify(cart))
                renderCart(cart)
            }

        })
    }
}