//Dữ liệu
const products = [{ name: "Tivi", price: 10000000, image: "image/tv.jpg", category: "dientu", discount: 0, rating: 1, stock: 4 }, { name: "Ô Tô", price: 9802243345, image: "image/car.jpg", category: "xe", discount: 30, stock: 2, rating: 5 }, { name: "Robot", price: 10000390, image: "image/robot.jpg", category: 'dientu', discount: 2, rating: 3, stock: 2 }, { name: "Máy tính", price: 10003954200, image: "image/computer.jpg", category: "dientu", discount: 99, stock: 2, rating: 5 }, { name: "Xe đạp", price: 100400, image: "image/xe.jpg", category: "xe", discount: 0, stock: 0, rating: 5 }, { name: "Bim bim", price: 5000, image: "image/bimbim.jpg", category: "thucan", discount: 50, stock: 6, rating: 1 }, { name: "Kem", price: 10000, image: "image/kem.jpg", category: "thucan", discount: 30, stock: 10, rating: 4 }, { name: "Bánh mì", price: 3000, image: "image/bmi.jpg", category: "thucan", discount: 0, stock: 20, rating: 5 }, { name: "Xiên", price: 2000, image: "image/xien.jpg", category: "thucan", discount: 90, stock: 6, rating: 3 }, { name: "Điện thoại", price: 9000000, image: "image/phone.jpg", category: "dientu", discount: 50, stock: 6, rating: 1 }]
const finalPrice = (p) => p.price * (1 - p.discount / 100);
let currentSearch = "";
let cart = JSON.parse(localStorage.getItem("cartStorage")) || [];
const formatPrice = (p) => Math.round(p).toLocaleString("vi-VN") + "đ";
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
//Tính năng thêm vào giỏ
document.querySelector(".products").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        const name = event.target.dataset.name;
        const existing = cart.find((item) => item.name === name);
        const product = products.find((product) => product.name === name)
        if (product) {
            if (existing) {
                existing.quantity += 1;

            }
            else {
                cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem("cartStorage", JSON.stringify(cart))
            renderCart(cart);
        }
    }

})
//Xóa hàng trong giỏ
document.querySelector(".cartBody").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.dataset.name;
        const existing = cart.find((item) => item.name === name);
        if (existing) {
            if (existing.quantity === 1) { cart = cart.filter(item => item !== existing);; }
            else { existing.quantity -= 1; }
        }
    }
    localStorage.setItem("cartStorage", JSON.stringify(cart))
    renderCart(cart)
})
//Giỏ hàng
function renderCart(list) {
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
    const totalPriceCart = cart.reduce((sum, item) => { return sum + finalPrice(item) * item.quantity }, 0)
    document.querySelector(".totalCart").innerHTML = `Tổng tiền:${formatPrice(totalPriceCart)}`
    document.querySelector(".totalQuantity").innerHTML = `Tổng số lượng :${cart.reduce((sum, item) => { return sum + item.quantity }, 0)}`
}


update()
renderCart(cart);







