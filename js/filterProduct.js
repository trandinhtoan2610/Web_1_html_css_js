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
            <div class="product-one-content-item1">
                <img src="${product.image}" alt="${product.name}">
                <ul class="product-one-content-text">
                    <li class="sale">HSSV GIẢM 500K</li>
                    <li class="product-name">${product.name}</li>
                    <li style="color: #E83A45; font-size: 19px;">
                        <strong>${product.price}<sup><u>đ</u></sup></strong>
                    </li>
                    <li class="product-one-configuration" id="button-settings">
                        <button onclick="showProductDetails('${product.id}')">Xem Chi Tiết</button>
                        <button class="addtoCart" onclick="remind()">Thêm Vào Giỏ Hàng</button>
                    </li>
                </ul>
            </div>
        `;
    }

    // Gắn toàn bộ HTML vào productList
    productList.innerHTML = productsHTML;
}