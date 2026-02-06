/* ======================
   DATA SẢN PHẨM
====================== */
const products = [
  {
    id: 1,
    name: "Trà sữa truyền thống",
    price: 25000,
    image: "img/trasua1.jpg",
    desc: "Vị trà đậm – sữa béo – ngọt dịu"
  },
  {
    id: 2,
    name: "Trà sữa trân châu đen",
    price: 30000,
    image: "img/trasua2.jpg",
    desc: "Trân châu nấu mỗi ngày"
  },
  {
    id: 3,
    name: "Trà sữa matcha",
    price: 32000,
    image: "img/trasua3.jpg",
    desc: "Matcha Nhật – hậu vị thanh"
  },
  {
    id: 4,
    name: "Trà sữa socola",
    price: 33000,
    image: "img/trasua4.jpg",
    desc: "Đậm đà – béo ngậy"
  },
  {
    id: 5,
    name: "Trà sữa dâu",
    price: 30000,
    image: "img/trasua5.jpg",
    desc: "Dâu tươi – vị chua ngọt"
  },
  {
    id: 6,
    name: "Trà sữa khoai môn",
    price: 32000,
    image: "img/trasua6.jpg",
    desc: "Khoai môn bùi – thơm béo tự nhiên"
  },
  {
    id: 7,
    name: "Trà sữa caramel",
    price: 35000,
    image: "img/trasua7.jpg",
    desc: "Caramel cháy – ngọt sâu – cuốn vị"
  },
  {
    id: 8,
    name: "Trà sữa ô long sữa",
    price: 34000,
    image: "img/trasua8.jpg",
    desc: "Ô long rang – hậu trà đậm – ít ngọt"
  }
];

/* ======================
   RENDER SẢN PHẨM
====================== */
const productsGrid = document.getElementById("productsGrid");

function renderProducts() {
  productsGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-price">
          ${product.price.toLocaleString()}đ
        </div>
        <button class="btn-cart" onclick="addToCart(${product.id})">
          Thêm vào giỏ
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

renderProducts();

/* ======================
   GIỎ HÀNG
====================== */
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const item = cart.find(i => i.id === productId);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <tr>
        <td colspan="5">🧋 Giỏ hàng trống</td>
      </tr>
    `;
    cartTotal.innerText = "0đ";
    return;
  }

  cart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    cartItems.innerHTML += `
      <tr>
        <td>
          <div class="cart-product">
            <img src="${item.image}">
            <span>${item.name}</span>
          </div>
        </td>
        <td>${item.price.toLocaleString()}đ</td>
        <td>
          <div class="cart-qty">
            <button onclick="changeQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </td>
        <td>${subtotal.toLocaleString()}đ</td>
        <td>
          <span class="cart-remove" onclick="removeItem(${item.id})">✕</span>
        </td>
      </tr>
    `;
  });

  cartTotal.innerText = total.toLocaleString() + "đ";
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

renderCart();
const checkoutBtn = document.querySelector(".btn-checkout");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutAmount = document.getElementById("checkoutAmount");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("🧋 Giỏ hàng đang trống!");
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });

  checkoutAmount.innerText = total.toLocaleString() + "đ";
  checkoutModal.style.display = "flex";
});

function closeCheckout() {
  checkoutModal.style.display = "none";
}

function confirmCheckout() {
  alert("✅ Thanh toán thành công!\nCảm ơn bạn đã ủng hộ Trà Sữa Nhà Làm 💖");

  cart = [];
  renderCart();
  closeCheckout();
}

