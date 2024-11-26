var products_json = localStorage.getItem('products')
var products = JSON.parse(products_json);
function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');

    // Lấy danh sách sản phẩm từ localStorage
    const productArray = JSON.parse(localStorage.getItem("products"));

    // Kiểm tra nếu productArray tồn tại và không rỗng, và nếu brand tồn tại
    if (!productArray || productArray.length === 0 || !brand) return;

    // Lọc sản phẩm theo thương hiệu
    const filteredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].kind === brand) {
            filteredProducts.push(productArray[i]);
        }
    }

    // Kiểm tra nếu có sản phẩm đã lọc
    if (filteredProducts.length === 0) {
        console.warn("Không có sản phẩm nào phù hợp với thương hiệu:", brand);
        return;
    }

    // Lấy phần tử product-list và xóa các sản phẩm cũ
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Xóa các sản phẩm cũ

    // Hiển thị các sản phẩm đã lọc
    displayProducts(filteredProducts, productList);
}

function displayProducts(products, productList) {
    productList.innerHTML = ""; // Xóa các sản phẩm cũ
    // Kiểm tra nếu danh sách sản phẩm trống và hiển thị thông báo cho người dùng
    if (products.length === 0) {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.textContent = "Không có sản phẩm nào để hiển thị";
        productList.appendChild(noProductsMessage);
        return;
    }

    // Sử dụng vòng lặp for để tạo các product card
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Tạo thẻ product card
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        // Thêm hình ảnh sản phẩm
        const productImage = document.createElement("div");
        productImage.className = "product-image";
        const productLink = document.createElement("a");
        productLink.href = "#";
        productLink.onclick = () => showProductDetails(product.id);
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        productLink.appendChild(img);
        productImage.appendChild(productLink);

        // Thêm thông tin sản phẩm
        const productInfo = document.createElement("div");
        productInfo.className = "product-info";

        const productName = document.createElement("h3");
        productName.className = "product-name";
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.className = "product-price";
        productPrice.innerHTML = `<strong>${product.price.toLocaleString('vi-VN')}<sup><u>đ</u></sup></strong>`;

        // Tạo nút thêm vào giỏ hàng
        const productActions = document.createElement("div");
        productActions.className = "product-actions";
        const addToCartButton = document.createElement("button");
        addToCartButton.className = "btn-cart";
        addToCartButton.textContent = "Thêm Vào Giỏ Hàng";
        addToCartButton.onclick = () => ThemVaoGioHang(product.id);

        productActions.appendChild(addToCartButton);

        // Thêm tất cả vào productInfo
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productActions);

        // Thêm hình ảnh và thông tin vào productCard
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        // Thêm productCard vào danh sách sản phẩm
        productList.appendChild(productCard);
    }
}
