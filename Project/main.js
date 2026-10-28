import { products } from "./Data.js";
import { finalPrice, formatPrice } from "./Utils.js";
import { CartFunction, renderCart } from "./Cart.js";
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
const filterButtons = document.querySelectorAll(".filter-btn")
document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter

        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
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
    renderCard(list);
    //total

}

update()
renderCart(cart)
CartFunction(cart)
