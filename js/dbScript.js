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
                <product-card>
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
});
