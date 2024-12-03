const itemsPerPage = 8;
let currentPage = 1;
let filteredProducts = [];
let allProducts = JSON.parse(localStorage.getItem('products')) || [];

function renderProduct(page, productsToRender) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = productsToRender.slice(start, end);

    let html = '';
    paginatedProducts.forEach(product => {
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
                        <button type="button" class="btn-cart" onclick="ThemVaoGioHang(${product.id})">Thêm Vào Giỏ Hàng</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById("product-list").innerHTML = html;
}

// Hàm hiển thị phân trang
function renderPagination(productsToRender) {
    const totalPages = Math.ceil(productsToRender.length / itemsPerPage);
    let paginationHtml = '';

    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>&lt;</button>`;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-button ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    paginationHtml += `
        <button class="page-button" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>&gt;</button>`;

    document.getElementById("pagination").innerHTML = paginationHtml;
}

// Hàm thay đổi trang
function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredProducts.length / itemsPerPage)) return;
    currentPage = page;
    renderProduct(currentPage, filteredProducts);
    renderPagination(filteredProducts);
}

// Hàm lọc sản phẩm
function filterProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const brand = urlParams.get('brand');
    const searchQuery = urlParams.get('search');
    filteredProducts = allProducts.filter(product => {
        const matchesBrand = !brand || product.kind === brand;
        const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesBrand && matchesSearch;
    });

    renderProduct(currentPage, filteredProducts);
    renderPagination(filteredProducts);
}

// Hàm khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.search) {
        filterProducts();
    } else {
        filteredProducts = allProducts;
        renderProduct(currentPage, filteredProducts);
        renderPagination(filteredProducts);
    }
});

function searchByName(inputId) {
    const searchInput = document.getElementById(inputId).value.trim();
    if (!searchInput) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("search", searchInput);
    window.location.href = currentUrl.toString();  // Cập nhật URL và tải lại trang
}
