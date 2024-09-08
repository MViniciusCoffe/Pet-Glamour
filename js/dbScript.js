document.addEventListener("DOMContentLoaded", () => {
  const apiURL = "http://localhost:3000/produtos";

  const productList = document.getElementById("product-list");

  function loadProducts() {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((product) => {
          const productHTML = `
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
              <div class="product-item bg-light mb-4">
                <product-card
                  product-id="${product.id}"
                  product-name="${product.nome}"
                  product-price="${product.preco_novo}"
                  product-image="${product.imagem}"
                >
                  <img
                    slot="img-product"
                    class="img-fluid w-100"
                    src="${product.imagem}"
                    alt="${product.nome}"
                  />
                  <a
                    slot="product"
                    class="h6 text-decoration-none text-truncate"
                    href="produto-1.html"
                    >${product.nome}
                  </a>
                  <h5 slot="price-product">R$ ${product.preco_novo.toFixed(
                    2
                  )}</h5>
                  <h6 slot="old-price-product" class="text-muted ml-2">
                    <del>R$ ${product.preco_antigo.toFixed(2)}</del>
                  </h6>
                </product-card>
              </div>
            </div>
        `;
          productList.insertAdjacentHTML("beforeend", productHTML);
        });
      })
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  }

  loadProducts();

  function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.addEventListener("add-carrinho", (event) => {
    const product = event.detail;

    alert("adicionado");
    let cart = getCart();

    const produtoExistente = cart.find((item) => item.id === product.id);
    if (produtoExistente) {
      produtoExistente.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    saveCart(cart);
    updateCartIcon();
  });

  function updateCartIcon() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();
  });
});
