let cart = [];
const cartSidebar = document.getElementById("cartSidebar");
const cartToggleBtn = document.getElementById("carritoToggle");
const closeCartBtn = document.getElementById("closeCart");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cart-count");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

// Renderizar carrito
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("cart-item");
    li.innerHTML = `
      <span>${item.name} x${item.quantity} - ${item.price * item.quantity} COP</span>
      <button class="remove-item" data-index="${index}">✕</button>
    `;
    cartItemsEl.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotalEl.textContent = total;
  cartCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Activar botones de eliminar
  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1); // elimina solo ese producto
      renderCart(); // vuelve a pintar
    });
  });
}

// Agregar producto
function addToCart(product) {
  const index = cart.findIndex(i => i.name === product.name);
  if (index !== -1) {
    cart[index].quantity += product.quantity;
  } else {
    cart.push({ ...product });
  }
  renderCart();
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
  cart = [];
  renderCart();
});

// Botones "Agregar al carrito"
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".producto-card");
    const product = {
      name: card.dataset.name,
      price: parseInt(card.dataset.price),
      quantity: 1
    };
    addToCart(product);
    cartSidebar.classList.add("active");
  });
});

// Abrir / cerrar carrito
cartToggleBtn.addEventListener("click", () =>
  cartSidebar.classList.toggle("active")
);
closeCartBtn.addEventListener("click", () =>
  cartSidebar.classList.remove("active")
);


// ------------------------------
// Checkout
// ------------------------------
const checkoutBtn = document.getElementById("checkout-btn"); 
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");
const checkoutForm = document.getElementById("checkout-form");
const checkoutSummary = document.getElementById("checkout-summary");

// NUEVO: modal de éxito
const successModal = document.getElementById("success-modal");
const closeSuccess = document.getElementById("close-success");

// Abrir modal de checkout con resumen del carrito
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  // Mostrar resumen del carrito en el checkout
  checkoutSummary.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("checkout-item");
    div.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>${item.price * item.quantity} COP</span>
    `;
    checkoutSummary.appendChild(div);
    total += item.price * item.quantity;
  });

  // Mostrar total
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("checkout-total");
  totalDiv.innerHTML = `<strong>Total: ${total} COP</strong>`;
  checkoutSummary.appendChild(totalDiv);

  checkoutModal.classList.add("active");
});

// Cerrar modal de checkout
closeCheckout.addEventListener("click", () => {
  checkoutModal.classList.remove("active");
});

// Cerrar modal de checkout clic fuera
checkoutModal.addEventListener("click", (e) => {
  if (e.target === checkoutModal) {
    checkoutModal.classList.remove("active");
  }
});

// Procesar formulario
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const method = document.getElementById("payment-method").value;
  const name = document.getElementById("customer-name").value;
  const email = document.getElementById("customer-email").value;
  const address = document.getElementById("customer-address").value;

  if (!method || !name || !email || !address) {
    alert("⚠️ Por favor completa todos los campos.");
    return;
  }

  // Reset carrito y formulario
  checkoutForm.reset();
  checkoutModal.classList.remove("active");
  cart = [];
  renderCart();

  // Mostrar modal de éxito
  successModal.classList.add("active");
});

// Cerrar modal de éxito
closeSuccess.addEventListener("click", () => {
  successModal.classList.remove("active");
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    successModal.classList.remove("active");
  }
});


 // Botón "Cerrar" en modal de éxito
const closeSuccessBtn = document.getElementById("close-success-cerrar");

closeSuccessBtn.addEventListener("click", () => {
  successModal.classList.remove("active");
});





