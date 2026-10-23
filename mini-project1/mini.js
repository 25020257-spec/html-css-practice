//Dữ liệu
import { products } from "./data.js";
import { finalPrice, formatPrice } from "./utils.js";
import { renderCart, FuncCart } from "./cart.js"
let currentSearch = "";
let cart = JSON.parse(localStorage.getItem("cartStorage")) || [];
//Hiện thị trang
function renderProducts(list) {
    const html = list.map((product) => {
        return `<article class="card">
            <img src="${product.image}"
                alt="${product.name}">
                ${product.discount ? `<span class="badge">Giảm ${product.discount}%</span>` : ""}

            <h2>${product.name}</h2>
            <div class="btn-box">
                <div class="price">
                 ${product.discount ? `<span class="old-price">${formatPrice(product.price)}</span>
                    <span class="new-price">${formatPrice(finalPrice(product))}</span>` : `<span class="new-price">${formatPrice(product.price)}</span>`}
                </div>
                <button class="btn" data-name="${product.name}">Thêm vào giỏ</button>
            </div>

        </article>`}).join("");
    document.querySelector(".products").innerHTML = html;

}

let currentFilter = "all";
let currentSort = "default"
//Khối lọc và sắp xếp
const filterButtons = document.querySelectorAll(".filter-btn")
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        filterButtons.forEach((b) => b.classList.remove("active"));
        button.classList.add("active");
        update()
    }
    )
})
const sortSelect = document.querySelector("#sort")
sortSelect.addEventListener("change", (event) => {
    currentSort = event.target.value;
    update();

})
//Update trang
function update() {
    let list = [...products];
    //Filter
    if (currentFilter === "sale") {
        list = list.filter((product) => { return product.discount > 0 })

    }
    else if (currentFilter === "instock") {
        list = list.filter((product) => { return product.stock > 0 })

    }
    //FilterFollowName
    list = list.filter((product) =>
        product.name.toLowerCase().includes(currentSearch.toLowerCase()));
    //Sort
    if (currentSort === "price-asc") {
        list.sort((a, b) => finalPrice(a) - finalPrice(b))

    }
    else if (currentSort === "price-desc") {
        list.sort((a, b) => finalPrice(b) - finalPrice(a))
    }
    else if (currentSort === "rating") {
        list.sort((a, b) => -a.rating + b.rating)
    }
    renderProducts(list);
    const total = list.reduce((sum, product) => { return sum + finalPrice(product) }, 0)
    document.querySelector(".total").textContent = `Tổng tiền: ${formatPrice(total)}`;
}
//Tìm kiếm
const searchInput = document.getElementById("search")
searchInput.addEventListener("input", (event) => {
    currentSearch = event.target.value;
    update();
})
update()
renderCart(cart);
FuncCart(cart)








