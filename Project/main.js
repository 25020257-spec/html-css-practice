import { products } from "./Data.js";
import { finalPrice, formatPrice } from "./Utils.js";
let cart = JSON.parse(localStorage.getItem("cart")) || []
//sinh web
function renderCard(list) {
    const html = list.map((product) => {
        return `<article class="card">
        <img src="${product.image}" alt="Ảnh">
         ${product.discount ? `<span class="badge">Giảm ${product.discount}%</span>` : ""}
         <h2>${product.name}</h2>
          <div class="price">
                          ${product.discount ? `<span class="old-price">${formatPrice(product.price)}</span>
                             <span class="new-price">${formatPrice(finalPrice(product))}</span>` : `<span class="new-price">${formatPrice(product.price)}</span>`}
                         </div>
                         <button class="addBtn" data-name="${product.name}">Thêm vào giỏ</button>
         

        
        </article>`
    }).join("")
    document.querySelector(".products").innerHTML = html
}

let currentFilter = "all"
let currentSort = "Basic"
let currentSearch = ""
const productSearch = document.getElementById("search")
productSearch.addEventListener("input", (event) => {
    currentSearch = event.target.value;
    update()
})
//Lọc
document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter
        update()

    })
})
//Sắp xếp
document.querySelector(".sorts").addEventListener("change", (event) => {
    currentSort = event.target.value;
    update()
})

function update() {
    let list = [...products]
    //lọc
    if (currentFilter === "sale") {
        list = list.filter((product) => { return product.discount > 0 })
    }
    else if (currentFilter === "inStock") {
        list = list.filter((product) => { return product.stock > 0 })
    }
    //Sắp xếp
    if (currentSort === "IncreasePrice") {
        list.sort((a, b) => finalPrice(a) - finalPrice(b))
    }
    else if (currentSort === "DecreasePrice") {
        list.sort((a, b) => finalPrice(b) - finalPrice(a))
    }
    else if (currentSort === "Top") {
        list.sort((a, b) => a.rating - b.rating)
    }
    //tìm kiếm
    list = list.filter((product) => { return product.name.toLowerCase().includes(currentSearch.toLowerCase()) })
    renderCard(list)
}
//Thêm

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
        renderCart()
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
        renderCart()

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
        renderCart()
    }

})

function renderCart() {
    const html = cart.map((product) => {
        return `<tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${formatPrice(product.quantity * finalPrice(product))}</td>
            <td><button class="decrease-btn" data-name="${product.name}">-</button></td>
            <td><button class="removeBtn" data-name="${product.name}">Xóa</button></td>
            </tr>
            `
    }).join("")
    document.querySelector(".CartBody").innerHTML = html

}
update()
renderCart()