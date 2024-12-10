const itemsPerPage = 4;
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
    if (totalPages == 1) {
        document.getElementById("pagination").innerHTML = paginationHtml;
    } else {
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
    const searchInput = document.getElementById(inputId).value;
    if (!searchInput) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }
    filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    currentPage = 1;
    renderProduct(currentPage, filteredProducts);
    renderPagination(filteredProducts);
}



function checkSearchBrand() {
    var Search_Acer = document.getElementById("search_product_acer")
    var Search_Lenovo = document.getElementById("search_product_lenovo");
    var Search_msi = document.getElementById("search_product_msi");

    if (Search_Acer.checked) {
        return 1;
    }

    else if (Search_Lenovo.checked) {
        return 2;
    }

    else if (Search_msi.checked) {
        return 3;
    }

    else
        return 0;
}


document.querySelectorAll('input[type="checkbox"][name="search_brand"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            document.querySelectorAll('input[type="checkbox"][name="search_brand"]').forEach(function (otherCheckbox) {

                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});



var SearchModal = document.getElementById("Search_Modal")

function DivAdvancedFilter() {
    SearchModal.style.display = "flex";
}

function close_DivAdvancedFilter() {
    SearchModal.style.display = "none";
}


function AdvancedFilter() {
    regNums = /^[0-9]\d*$/;
    const productList = document.getElementById("product-list");
    var Search_name = document.getElementById("search_product_name").value.trim();
    var Search_Ram = document.getElementById("search_product_Ram").value.trim();
    var Search_minPrice = stringToPrice(document.getElementById("search_product_minPrice").value.trim());
    var Search_maxPrice = stringToPrice(document.getElementById("search_product_maxPrice").value.trim());
  
    const productArray = JSON.parse(localStorage.getItem("products")) || [];

    //Neu user khong nhap gi vao input Filter :
    if (Search_name == "" && Search_Ram == "" && Search_maxPrice == "" && Search_minPrice == "") {
        const brand = checkSearchBrand();

        if (brand == 0) {
            filteredProducts = productArray;
            window.location.href = "";
            return true;
        }
        filteredProducts = productArray.filter(product => {
            if (brand == 1 && product.kind === "Acer") return true;
            if (brand == 2 && product.kind === "Lenovo") return true;
            if (brand == 3 && product.kind === "MSI") return true;
            return false;
        });
        currentPage = 1;
        renderProduct(currentPage, filteredProducts);
        renderPagination(filteredProducts);
        close_DivAdvancedFilter();
        return;
    }



    //Lọc theo 4 điều kiện : 
    if (Search_name != "" && Search_Ram != "" && Search_maxPrice != "" && Search_minPrice != "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    const price = parseFloat(product.price)
                    const minPrice = parseFloat(Search_minPrice)
                    const maxPrice = parseFloat(Search_maxPrice)
                    if (price >= minPrice && price <= maxPrice)
                        return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter()
            return;
        }

        else {
            filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    const price = parseFloat(product.price)
                    const minPrice = parseFloat(Search_minPrice)
                    const maxPrice = parseFloat(Search_maxPrice)
                    if (price >= minPrice && price <= maxPrice) {
                        if (brand == 1 && product.kind === "Acer") return true;
                        if (brand == 2 && product.kind === "Lenovo") return true;
                        if (brand == 3 && product.kind === "MSI") return true;
                    }
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter()
            return;
        }
    }


    //Lọc theo 3 điều kiện : 

    //3 : Ten, minPrice va maxPrice :
    if (Search_name != "" && Search_minPrice != "" && Search_maxPrice != "" && Search_Ram == "") {
        const brand = checkSearchBrand();

        // Nếu không chọn thương hiệu nào
        if (brand == 0) {
            filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase())) {
                    if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                        return true;
                    }
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase())) {
                    if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                        // Lọc theo thương hiệu
                        if (brand == 1 && product.kind === "Acer") return true;
                        if (brand == 2 && product.kind === "Lenovo") return true;
                        if (brand == 3 && product.kind === "MSI") return true;
                    }
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }
    }

    //4 : Ram, minPrice va maxPrice :
    if (Search_Ram != "" && Search_minPrice != "" && Search_maxPrice != "") {
        const brand = checkSearchBrand();

        // Nếu không chọn thương hiệu nào
        if (brand == 0) {
            filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                        return true;
                    }
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                        // Lọc theo thương hiệu
                        if (brand == 1 && product.kind === "Acer") return true;
                        if (brand == 2 && product.kind === "Lenovo") return true;
                        if (brand == 3 && product.kind === "MSI") return true;
                    }
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }
    }

    //MinPrice va MaxPrice :
    if (Search_minPrice != "" && Search_maxPrice != "" && Search_Ram == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            filteredProducts = productArray.filter(product => {
                if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                    return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            filteredProducts = productArray.filter(product => {
                if (product.price >= Search_minPrice && product.price <= Search_maxPrice) {
                    if (brand == 1 && product.kind === "Acer") return true;
                    if (brand == 2 && product.kind === "Lenovo") return true;
                    if (brand == 3 && product.kind === "MSI") return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }
    }

    close_DivAdvancedFilter();
}


const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const minValue = document.getElementById("search_product_minPrice");
const maxValue = document.getElementById("search_product_maxPrice");
console.log(minValue)

// Hàm cập nhật giá trị và màu sắc cho slider
function updateRangeSlider() {
  let min = parseInt(minRange.value);
  let max = parseInt(maxRange.value);

  // Không cho phép min vượt quá max và ngược lại
  if (min >= max) {
    minRange.value = max - 500000;
    min = max - 500000;
  }

  // Cập nhật giá trị hiển thị
  minValue.value = PriceToString(min);
  maxValue.value = PriceToString(max);

  // Cập nhật màu sắc cho thanh slider
  const percent1 = (min - minRange.min) / (minRange.max - minRange.min) * 100;  // Tính % cho min
  const percent2 = (max - maxRange.min) / (maxRange.max - maxRange.min) * 100;  // Tính % cho max

  // Áp dụng màu nền (background) cho cả min và max range
  const gradient = `linear-gradient(to right, #ddd ${percent1}%, #007bff ${percent1}%, #007bff ${percent2}%, #ddd ${percent2}%)`;

  minRange.style.background = gradient;
  maxRange.style.background = gradient;
}

// Gọi hàm ngay khi trang được tải xong
updateRangeSlider();

// Cập nhật giá trị và màu sắc khi người dùng thay đổi giá trị
minRange.addEventListener("input", updateRangeSlider);
maxRange.addEventListener("input", updateRangeSlider);



function PriceToString (price ){
    console.log(price)
    price = parseInt(price);
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    const formattedPrice = formatter.format(price);
    return  formattedPrice;
}

function stringToPrice(priceString) {
    // Loại bỏ chữ "VND" và dấu phẩy trong chuỗi
    let cleanedString = priceString.replace(/[^\d]/g, ''); // Chỉ giữ lại các ký tự số

    // Chuyển đổi thành số và trả về
    return parseInt(cleanedString, 10);  // Dùng parseInt để chuyển sang số nguyên
}

// Ví dụ sử dụng:
let priceString = "70,000,000 VND";
let price = stringToPrice(priceString);
console.log(price); // Kết quả: 70000000
