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
    // Kiểm tra nếu danh sách sản phẩm trống
    if (products.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị");
        return;
    }

    // Sử dụng vòng lặp for thay vì forEach
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Tạo phần tử chính cho sản phẩm
        const productItem = document.createElement("div");
        productItem.className = "product-one-content-item1";

        // Tạo phần tử hình ảnh
        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;

        // Tạo danh sách chi tiết sản phẩm
        const productDetails = document.createElement("ul");
        productDetails.className = "product-one-content-text";

        // Tạo từng phần tử thông tin sản phẩm
        const sale = document.createElement("li");
        sale.className = "sale";
        sale.textContent = "HSSV GIẢM 500K";

        const name = document.createElement("li");
        name.className = "product-name";
        name.textContent = product.name;

        // Thêm giá sản phẩm
        const price = document.createElement("li");
        price.style.color = "#E83A45";
        price.style.fontSize = "19px";
        price.innerHTML = `<strong>${product.price}<sup><u>đ</u></sup></strong>`;

        // Tạo các nút chức năng
        const buttonContainer = document.createElement("li");
        buttonContainer.className = "product-one-configuration";
        buttonContainer.id = "button-settings";

        const detailButton = document.createElement("button");
        detailButton.textContent = "Xem Chi Tiết";
        detailButton.onclick = () => showProductDetails(product.id);

        const addToCartButton = document.createElement("button");
        addToCartButton.id = "addtoCart";
        addToCartButton.textContent = "Thêm Vào Giỏ Hàng";
        addToCartButton.onclick = () => ThemVaoGioHang(product);

        buttonContainer.appendChild(detailButton);
        buttonContainer.appendChild(addToCartButton);

        // Thêm các phần tử vào productDetails
        productDetails.appendChild(sale);
        productDetails.appendChild(name);
        productDetails.appendChild(price);
        productDetails.appendChild(buttonContainer);

        // Thêm hình ảnh và chi tiết vào productItem
        productItem.appendChild(productImage);
        productItem.appendChild(productDetails);

        // Thêm productItem vào danh sách sản phẩm
        productList.appendChild(productItem);
    }
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