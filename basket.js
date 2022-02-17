"use strict";

const backetSpanEL = document.querySelector('.cartIconWrap span');
const basketTotal = document.querySelector('.basketTotalValue');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    document.querySelector('.basket').classList.toggle('hidden')
});
const basket = {};
document.querySelector('.featuredItems')
    .addEventListener('click', ({ target }) => {
        if (!target.closest('.addToCart')) {
            return;
        }
        const featuredItem = target.closest('.featuredItem');
        const id = +featuredItem.dataset.id;
        const name = featuredItem.dataset.name;
        const price = +featuredItem.dataset.price;
        addToCart(id, name, price);
    });

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    backetSpanEL.textContent = getTotalBasketCount();
    basketTotal.textContent = getTotalBasketPrice().toFixed(2);
    renderProduct(id);
}
function getTotalBasketCount() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}
function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}
function renderProduct(id) {
    const basketRowEl = document
        .querySelector(`.basketRow[data-productId="${id}"]`);
    if (!basketRowEl) {
        renderNewProduct(id);
        return;
    }
    basketRowEl.querySelector('.productCount').textContent = basket[id].count;
    basketRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;

}



function renderNewProduct(productId) {
    const productRow = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].
            price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    document.querySelector('.basketTotal')
        .insertAdjacentHTML("beforebegin", productRow);

}