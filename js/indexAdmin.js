var products_json = localStorage.getItem('products')
var products = JSON.parse(products_json);
function filterProducts(event) {
    if (event) event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand'); // Lọc theo thương hiệu
    const searchQuery = urlParams.get('search'); // Lọc theo từ khóa tìm kiếm

    // Lấy danh sách sản phẩm từ localStorage
    const productArray = JSON.parse(localStorage.getItem("products")) || [];

    // Kiểm tra nếu không có sản phẩm trong localStorage
    if (!productArray || productArray.length === 0) {
        console.warn("Danh sách sản phẩm trống hoặc không tồn tại.");
        return;
    }

    // Lọc sản phẩm theo thương hiệu và từ khóa tìm kiếm
    const filteredProducts = productArray.filter(product => {
        // Kiểm tra theo thương hiệu (nếu có)
        const matchesBrand = !brand || product.kind === brand;

        // Kiểm tra theo từ khóa tìm kiếm (nếu có)
        const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Chỉ giữ lại sản phẩm thỏa mãn cả hai điều kiện
        return matchesBrand && matchesSearch;
    });

    // Lấy phần tử product-list và xóa các sản phẩm cũ
    
    productList.innerHTML = ""; // Xóa các sản phẩm cũ

    // Hiển thị kết quả
    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
        return;
    }

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


function searchByName() {
    const searchInput = document.getElementById("Search_Name").value.trim();
    console.log(`Search Input: "${searchInput}"`);


    if (!searchInput) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("search", searchInput); 
    window.location.href = currentUrl.toString(); 
}
function searchByName2() {
    const searchInput = document.getElementById("Search_Name2").value.trim();
    console.log(`Search Input: "${searchInput}"`);


    if (!searchInput) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("search", searchInput); 
    window.location.href = currentUrl.toString(); 
}

