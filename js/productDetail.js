// Mảng sản phẩm với thuộc tính `id`
const products = [
    {
        id: 1,
        name: "Laptop Acer Aspire 3 A315 44P R9W8 R7 5700U/8GB/512GB/Win11 (NX.KSJSV.002) ",
        price: "13.990.000đ",
        location: "TP.HCM",
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
        location: "Hà Nội",
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
        location: "Hà Nội",
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
        location: "Hà Nội",
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
        location: "Hà Nội",
        image: "../img/lap5.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]
        
    }
    // Thêm sản phẩm khác nếu cần
];

// Hàm để lấy sản phẩm theo ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Hàm hiển thị sản phẩm dựa trên ID
function displayProductById(id) {
    const product = getProductById(id);
    const productDetail = document.getElementById("productDetail");

    // Xóa nội dung hiện tại của `productDetail`
    productDetail.innerHTML = '';

    if (product) {
        // Tạo phần hiển thị sản phẩm
        const productSection = document.createElement("section");

        // Tạo khung đặc điểm sản phẩm
        const characteristicsDiv = document.createElement("div");
        characteristicsDiv.className = "characteristics";

        const productImage = document.createElement("img");
        productImage.src = product.image;
        characteristicsDiv.appendChild(productImage);

        const textContent = document.createElement("div");
        textContent.className = "text-content_characteristics";
        textContent.innerHTML = `
            <h2>Mô tả</h2>
            <ul>${product.description.map(desc => `<li>${desc}</li>`).join('')}</ul>
        `;
        characteristicsDiv.appendChild(textContent);
        productSection.appendChild(characteristicsDiv);

        // Tạo phần giá
        const priceDiv = document.createElement("div");
        priceDiv.className = "price";
        priceDiv.innerHTML = `
            <h1>${product.name}</h1>
            <div class="star-icon">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
            <div>Giá tại: ${product.location}</div>
            <hr>
            <div class="price">${product.price}</div>
            <a onclick="remind()"><button>THÊM VÀO GIỎ HÀNG</button></a>
        `;
        productSection.appendChild(priceDiv);

        // Thêm phần sản phẩm vào trang
        productDetail.appendChild(productSection);
    } else {
        productDetail.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
    }
}

// Hàm nhắc nhở khi người dùng chưa đăng nhập
function remind() {
    alert('Bạn chưa đăng nhập !!!');
}

// Lấy ID sản phẩm từ URL và hiển thị sản phẩm
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);  // Lấy ID từ URL
    if (productId) {
        displayProductById(productId);
    } else {
        document.getElementById("productDetail").innerHTML = "<p>Sản phẩm không tồn tại.</p>";
    }
});
function confirm() {
    alert('Sản phẩm đã thêm vào giỏ hàng !!!');
}