import { finalPrice, formatPrice } from "./utils.js";
import { products } from "./data.js";
//Giỏ hàng
export function FuncCart(list) {//Thêm hàng vào giỏ
    document.querySelector(".products").addEventListener("click", (event) => {
        if (event.target.classList.contains("btn")) {
            const name = event.target.dataset.name;
            const existing = list.find((item) => item.name === name);
            const product = products.find((product) => product.name === name)
            if (product) {
                if (existing) {
                    existing.quantity += 1;

                }
                else {
                    list.push({ ...product, quantity: 1 });
                }

                renderCart(list);
            }
        }

    })
    //Xóa hàng trong giỏ
    document.querySelector(".cartBody").addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const name = event.target.dataset.name;
            const existing = list.find((item) => item.name === name);
            if (existing) {
                if (existing.quantity === 1) { list = list.filter(item => item !== existing);; }
                else { existing.quantity -= 1; }
            }
        }

        renderCart(list)
    })
}
export function renderCart(list) {
    localStorage.setItem("cartStorage", JSON.stringify(list))
    if (list.length > 0) {
        const html = list.map((product) => {
            return `<tr>
        <td>${product.name}</td>
        <td>${product.quantity}</td>
        <td>${formatPrice(product.quantity * finalPrice(product))}</td>
        <td><button class="remove-btn" data-name="${product.name}">-</button></td>
        </tr>
        `
        }).join("")
        document.querySelector(".cartBody").innerHTML = html

    }
    else {

        document.querySelector(".cartBody").innerHTML = `<tr><td colspan="4">Giỏ hàng trống</td></tr>`
    }
    const totalPriceCart = list.reduce((sum, item) => { return sum + finalPrice(item) * item.quantity }, 0)
    document.querySelector(".totalCart").innerHTML = `Tổng tiền:${formatPrice(totalPriceCart)}`
    document.querySelector(".totalQuantity").innerHTML = `Tổng số lượng :${list.reduce((sum, item) => { return sum + item.quantity }, 0)}`
}