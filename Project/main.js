import { products } from "./Data.js";
import { finalPrice, formatPrice } from "./Utils.js";
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
renderCard(products)