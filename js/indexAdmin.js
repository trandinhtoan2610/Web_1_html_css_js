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

    // Duyệt qua từng sản phẩm
    products.forEach(product => {
        // Tạo card cho mỗi sản phẩm
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Tạo phần hình ảnh sản phẩm
        const productImage = document.createElement("div");
        productImage.classList.add("product-image");

        const imageLink = document.createElement("a");
        imageLink.setAttribute("href", "#"); // Bạn có thể thay đổi href để dẫn đến trang chi tiết
        imageLink.addEventListener("click", () => showProductDetails(product.id));

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        imageLink.appendChild(img);
        productImage.appendChild(imageLink);

        // Tạo phần thông tin sản phẩm
        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");

        const productName = document.createElement("h3");
        productName.classList.add("product-name");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = `<strong>${product.price.toLocaleString('vi-VN')}<sup><u>đ</u></sup></strong>`;

        // Tạo các nút hành động
        const productActions = document.createElement("div");
        productActions.classList.add("product-actions");

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn-cart");
        addToCartButton.textContent = "Thêm Vào Giỏ Hàng";
        addToCartButton.addEventListener("click", () => ThemVaoGioHang(product.id));

        productActions.appendChild(addToCartButton);

        // Thêm thông tin vào product-info
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productActions);

        // Thêm các phần vào card
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        // Thêm card vào danh sách sản phẩm
        productList.appendChild(productCard);
    });
}


// Mua theo số lượng
var plus = document.getElementsByClassName('plus'),
    minus = document.getElementsByClassName('minus'),
    num = document.getElementsByClassName('num');

for (var i = 0; i < plus.length; i++) {
    var buttonPlus = plus[i];
    var buttonMinus = minus[i];
    buttonPlus.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        input.value = parseInt(input.value) + 1;
    })

    buttonMinus.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var input = buttonClicked.parentElement.children[1];
        if (input.value > 0)
            input.value = parseInt(input.value) - 1;
    })
}

function searchProductsByName(searchQuery) {
    // Lấy danh sách sản phẩm từ localStorage

    
    // Lọc sản phẩm dựa trên từ khóa tìm kiếm
    return products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
}

function searchProducts() {
    // Lấy giá trị tìm kiếm từ input
    const searchQuery = document.getElementById("search-input").value.trim();
    // Lọc danh sách sản phẩm
    const filteredProducts = searchProductsByName(searchQuery);
    console.log(filteredProducts);  
    const productList = document.getElementById("product-list");
    
    // Hiển thị sản phẩm lọc được
    displayProducts(filteredProducts, productList);
}