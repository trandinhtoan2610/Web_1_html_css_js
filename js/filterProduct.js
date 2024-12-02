var products_json = localStorage.getItem('products')
var products = JSON.parse(products_json);
function filterProducts(e) {
    event.preventDefault();

    // Lấy URL hiện tại
    const url = new URL(event.currentTarget.href);
    const brand = url.searchParams.get('brand'); // Lấy giá trị 'brand' từ URL

    // Lấy danh sách sản phẩm từ localStorage
    const productArray = JSON.parse(localStorage.getItem("products"));

    // Kiểm tra nếu productArray không hợp lệ
    if (!productArray || productArray.length === 0) {
        console.warn("Danh sách sản phẩm rỗng hoặc không tồn tại.");
        return;
    }

    // Lọc sản phẩm theo thương hiệu
    const filteredProducts = [];
    for (let i = 0; i < productArray.length; i++) {
        if (productArray[i].kind === brand) {
            filteredProducts.push(productArray[i]);
        }
    }

    // Hiển thị sản phẩm đã lọc
    const productList = document.getElementById("product-list");
    if (!productList) {
        console.error("Không tìm thấy phần tử product-list");
        return;
    }
    // Kiểm tra nếu không có sản phẩm phù hợp
    if (filteredProducts.length === 0) {
        console.warn(`Không có sản phẩm nào thuộc thương hiệu: ${brand}`);
        productList.innerHTML = `<p>Không có sản phẩm nào phù hợp.</p>`;
        return;
    }

    // Gọi hàm hiển thị sản phẩm
    displayProducts(filteredProducts, productList);
}
function displayProducts(products, productList) {
    // Kiểm tra nếu danh sách sản phẩm trống
    if (products.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị");
        return;
    }

    // Biến chứa HTML của tất cả sản phẩm
    let productsHTML = "";

    // Duyệt qua danh sách sản phẩm bằng vòng lặp for
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        // Thêm HTML của từng sản phẩm vào chuỗi
        productsHTML += `     
        <div class="product-card">
                <div class="product-image">
                    <a href="#" onclick="showProductDetails(${product.id})">
                        <img src="${product.image}" alt="${product.name}" />
                    </a>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">
                        <strong>${product.price.toLocaleString('vi-VN')}<sup><u>đ</u></sup></strong>
                    </p>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="ThemVaoGioHang(${product.id})">Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Gắn toàn bộ HTML vào productList
    productList.innerHTML = productsHTML;
}