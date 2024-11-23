document.getElementById('loginButton').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('authModal').style.display = 'flex';
});

function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Đóng form khi nhấn ra ngoài
window.onclick = function (event) {
    if (event.target == document.getElementById('authModal')) {
        document.getElementById('authModal').style.display = 'none';
    }
};
function signup(e) {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const fullname = document.getElementById("newFullName").value;
    const phonenumber = document.getElementById("newPhoneNumber").value;
    const repeatPassword = document.getElementById("newRepeatPassword").value;
    if (phonenumber)
        if (password !== repeatPassword) {
            alert("Mật khẩu và Nhập lại mật khẩu không khớp!");
            return;
        }
    var user = {
        username: username,
        password: password,
        fullname: fullname,
        phonenumber: phonenumber,
    };
    var json = JSON.stringify(user);
    localStorage.setItem(username, json);
    alert("Đăng Ký Thành Công");
}
function login(e) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    if (user == null) {
        alert("Đăng Nhập Thất Bại!!")
    }
    else if (username == data.username && password == data.password) {
        alert("Đăng Nhập Thành Công!!");
        localStorage.setItem("currentUser", data.fullname);
        window.location.href = "../html/indexLogin.html";
    }
}



const products = [
    {
        id: 1,
        name: "Laptop Acer Aspire 3 A315 44P R9W8 ",
        price: "13.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 3060Ti 8GB",
        location: "TP.HCM",
        kind: "Acer",
        image: "../img/lap1.png",
        description: [
            "Thiết kế mỏng nhẹ, năng động nhưng không kém phần sang trọng",
            "CPU Intel Core i5 11400H mạnh mẽ, chạy mượt mọi tác vụ học tập và văn phòng",
            "RAM DDR4 16GB đa nhiệm tốt, mở nhiều Tab khi làm việc mà không bị giật, lag",
            "Ổ cứng SSD 512GB lưu trữ nhiều dữ liệu, khởi động máy và ứng dụng nhanh",
            "Tích hợp card Intel Iris Xe Graphics, phục vụ ổn định các tác vụ làm việc đồ họa",
            "Thời lượng pin tốt, công nghệ sạc nhanh cho phép bạn làm việc cả ngày"
        ]
    },
    {
        id: 2,
        name: "Acer Aspire 5 A514 56P 742F i7 1355U (NX.KHRSV.005)",
        price: "9.990.000đ",
        ram: "8GB",
        ssd: "512GB",
        card: "GTX 3060Ti 6GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap2.png",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 3,
        name: "Acer Swift Go SFG14 71 513F i5 13500H (NX.KPZSV.003)",
        price: "16.590.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap3.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 4,
        name: "Acer Gaming Aspire 5 A515 58GM 51LB i5 13420H",
        price: "16.490.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap4.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 5,
        name: "Acer Gaming Nitro AN515 58 773Y i7 12700H",
        price: "22.990.000đ",
        ram: "16GB",
        ssd: "1TB",
        card: "GTX 4060 8GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap5.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 6,
        name: "Lenovo Gaming Legion Pro 5 16IRX9 i9 14900HX",
        price: "47.990.000đ",
        ram: "32GB",
        ssd: "2TB",
        card: "GTX 4080Ti 12GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap6.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 7,
        name: "Lenovo ThinkBook 14 Ultra 7 155U",
        price: "26.990.000đ",
        ram: "32GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap7.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 8,
        name: "Lenovo V15 G4 IRU i5 1335U (83A1000LVN)",
        price: "15.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 3050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap8.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 9,
        name: "Lenovo Ideapad Slim 5 14IAH8 i5 12450H",
        price: "16.790.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap9.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 10,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 11,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 12,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 13,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 14,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 15,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 16,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },

    // Thêm sản phẩm khác nếu cần
];
var json = JSON.stringify(products);
localStorage.setItem("products", json);
function showProductDetails(productID) {
    const product_Info = document.getElementById('product-info');
    const product_Name = document.getElementById("productName");
    const product_Price = document.getElementById("productPrice");
    const product_Ram = document.getElementById("productRam");
    const product_SSD = document.getElementById("productSSD");
    const product_Card = document.getElementById("productCard");
    const product_Location = document.getElementById("productLocation");
    const product_img = document.getElementById("productImg");
    const product_Description = document.getElementById("productDescription");
    console.log(document.getElementById("product-info"));
console.log(document.getElementById("productName"));
console.log(document.getElementById("productPrice"));
    product_Info.style.display = 'flex';
    var productArray = JSON.parse(localStorage.getItem("products"));
    for (var i = 0; i < productArray.length; i++) {
        if (productArray[i].id == productID) {
            product_Name.innerHTML = productArray[i].name;
            product_Price.innerHTML = "Giá: " + productArray[i].price;
            product_Ram.innerHTML = "Ram: " + productArray[i].ram;
            product_SSD.innerHTML = "SSD: " + productArray[i].ssd;
            product_Card.innerHTML = "Card: " + productArray[i].card;
            product_Location.innerHTML = "Vị Trí: " + productArray[i].location;
            product_img.src = productArray[i].image;
            product_Description.innerHTML = "Mô Tả: " + productArray[i].description;
        }
    }
}
function closeProductInfo() {
    document.getElementById('product-info').style.display = 'none';
}
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
    // Xóa nội dung cũ trong danh sách sản phẩm
    productList.innerHTML = "";

    // Kiểm tra nếu danh sách sản phẩm trống
    if (!products || products.length === 0) {
        console.log("Không có sản phẩm nào để hiển thị");
        productList.innerHTML = "<p>Không có sản phẩm nào!</p>";
        return;
    }

    // Sử dụng DocumentFragment để tối ưu hiệu suất khi thêm nhiều phần tử
    const fragment = document.createDocumentFragment();

    // Duyệt qua danh sách sản phẩm
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        // Kiểm tra tính hợp lệ của dữ liệu sản phẩm
        if (!product.id || !product.name || !product.image || !product.price) {
            console.error(`Dữ liệu không hợp lệ cho sản phẩm tại index ${i}`, product);
            continue;
        }

        // Tạo phần tử chính cho sản phẩm
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        // Tạo phần tử chứa hình ảnh
        const productImage = document.createElement("div");
        productImage.className = "product-image";

        const productImageLink = document.createElement("a");
        productImageLink.onclick = () => showProductDetails(product.id);

        const productImageElement = document.createElement("img");
        productImageElement.src = product.image;
        productImageElement.alt = product.name;

        productImageLink.appendChild(productImageElement);
        productImage.appendChild(productImageLink);

        // Tạo phần tử chứa thông tin sản phẩm
        const productInfo = document.createElement("div");
        productInfo.className = "product-info";

        const productName = document.createElement("h3");
        productName.className = "product-name";
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.className = "product-price";
        productPrice.innerHTML = `<strong>${product.price.toLocaleString("vi-VN")}<sup><u>đ</u></sup></strong>`;

        // Tạo các nút chức năng
        const productActions = document.createElement("div");
        productActions.className = "product-actions";

        const addToCartButton = document.createElement("button");
        addToCartButton.className = "btn-cart";
        addToCartButton.textContent = "Thêm Vào Giỏ Hàng";
        addToCartButton.onclick = () => ThemVaoGioHang(product.id);

        productActions.appendChild(addToCartButton);

        // Thêm các phần tử vào productInfo
        productInfo.appendChild(productName);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productActions);

        // Gắn các phần tử vào productCard
        productCard.appendChild(productImage);
        productCard.appendChild(productInfo);

        // Thêm productCard vào fragment
        fragment.appendChild(productCard);
    }

    // Gắn fragment vào danh sách sản phẩm
    productList.appendChild(fragment);
}


// function renderProduct() {
//     html = '';
//     for (let i = 0; i < products.length; i++) {
//         html += '<div class="product-one-content-item1">';
//         html += '<a onclick="showProductDetails(1)">';
//         html += '<img src=' + products[i].image + '>';
//         html += '</a>';
//         html += '<ul class="product-one-content-text">';
//         html += '<li class="sale">HSSV GIẢM 500K';
//         html += '</li>'
//         html += '<li class="product-name" >' + products[i].name;
//         html += '</li>'
//         html += '<li style="color: #E83A45; font-size: 19px">'
//         html += '<strong>13.990.000';
//         html += '<sup>';
//         html += '<u>' + "đ";
//         html += '</u>';
//         html += '</sup>';
//         html += '</strong>';
//         html += '</li>';
//         html += '<li class="product-one-configuration" id="button-settings">';
//         html += '<button onclick="showProductDetails(' + products[i].id + ')">' + 'Xem Chi Tiết';
//         html += '</button>';
//         html += '<button id="addtoCart" onclick="remind()">' + 'Thêm Vào Giỏ Hàng';
//         html += '</button>';
//         html += '</li>';
//         html += '</ul>';
//         html += '</div>';
//         console.log(html);
//     };
//     const productList = document.getElementById('product-list');
//     if (productList) {
//         productList.innerHTML = html;
//     } else {
//         console.error("Phần tử 'product-list' không tồn tại trong DOM.");
//     }
// }
const itemsPerPage = 10; // Số sản phẩm mỗi trang
let currentPage = 1; // Trang hiện tại

// Hàm hiển thị danh sách sản phẩm cho trang hiện tại
function renderProduct(page) {
    let html = '';
    const start = (page - 1) * itemsPerPage; // Tính chỉ mục bắt đầu
    const end = start + itemsPerPage; // Tính chỉ mục kết thúc
    const paginatedProducts = products.slice(start, end); // Cắt danh sách sản phẩm cho trang hiện tại

    for (let i = 0; i < paginatedProducts.length; i++) {
        const product = paginatedProducts[i];

        // Kiểm tra dữ liệu của sản phẩm
        if (!product.id || !product.name || !product.image || !product.price) {
            console.error(`Dữ liệu không hợp lệ cho sản phẩm tại index ${i}`, product);
            continue; // Bỏ qua sản phẩm nếu thiếu thông tin
        }

        // Xây dựng HTML cho mỗi sản phẩm
        html += `
        <div class="product-card">
            <div class="product-image">
                <a onclick="showProductDetails(${product.id})">
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
        </div>`;
    }

    // Cập nhật phần tử HTML để hiển thị sản phẩm
    document.getElementById("product-list").innerHTML = html;
}

// Hàm tạo phân trang
function renderPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    let paginationHtml = '';

    // Thêm nút "Trước"
    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-button ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    // Thêm nút "Sau"
    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>`;

    // Cập nhật phần tử phân trang
    document.getElementById("pagination").innerHTML = paginationHtml;
}

// Hàm thay đổi trang
function changePage(page) {
    if (page < 1 || page > Math.ceil(products.length / itemsPerPage)) return; // Không thay đổi nếu page không hợp lệ
    currentPage = page;
    renderProduct(currentPage);  // Cập nhật sản phẩm cho trang mới
    renderPagination();  // Cập nhật lại phân trang
}

// Hàm khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    renderProduct(currentPage);  // Hiển thị sản phẩm cho trang đầu tiên
    renderPagination();  // Hiển thị phân trang
});

function searchProductsByName(searchQuery) {
    // Lấy danh sách sản phẩm từ localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];
    
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
    const productList = document.getElementById("product-list");
    // Hiển thị sản phẩm lọc được
    displayProducts(filteredProducts, productList);
}