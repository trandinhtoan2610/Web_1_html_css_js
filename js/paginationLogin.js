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
    const searchInput = document.getElementById(inputId).value;
    if (!searchInput) {
        alert("Vui lòng nhập từ khóa tìm kiếm!");
        return;
    }
    const products = JSON.parse(localStorage.getItem('products'));
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput.toLowerCase()));
    renderProduct(1, filteredProducts);
}



function checkSearchPrice(x){
    if (x == 1) {
        document.getElementById("minPrice_warning").style.display = "none";
    }

    if (x == 2) {
        document.getElementById("maxPrice_warning").style.display = "none";
        document.getElementById("maxPrice_warning_2").style.display = "none";
    }
}

function checkSearchBrand(){
    var Search_Acer = document.getElementById("search_product_acer")
    var Search_Lenovo = document.getElementById("search_product_lenovo");
    var Search_msi = document.getElementById("search_product_msi");

    if (Search_Acer.checked ){
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


document.querySelectorAll('input[type="checkbox"][name="search_brand"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            document.querySelectorAll('input[type="checkbox"][name="search_brand"]').forEach(function(otherCheckbox) {
            
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
});



var SearchModal = document.getElementById("Search_Modal")

function DivAdvancedFilter(){
    SearchModal.style.display = "flex";
} 

function close_DivAdvancedFilter(){
    SearchModal.style.display = "none";
}


function AdvancedFilter() {
    regNums = /^[0-9]\d*$/;
    const productList = document.getElementById("product-list");

    var Search_name = document.getElementById("search_product_name").value.trim();
    var Search_Ram = document.getElementById("search_product_Ram").value.trim();
    var Search_minPrice = document.getElementById("search_product_minPrice").value.trim();
    var Search_maxPrice = document.getElementById("search_product_maxPrice").value.trim();
    var minPrice_warning = document.getElementById("minPrice_warning");
    var maxPrice_warning = document.getElementById("maxPrice_warning");
    var maxPrice_warning_2 = document.getElementById("maxPrice_warning_2");

    
    if (Search_minPrice != "") {
        if (!Search_minPrice.match(regNums)) {
            minPrice_warning.style.display = "block";
            return false;
        }

        if (Search_maxPrice != "") {
            if (!Search_maxPrice.match(regNums)) {
                maxPrice_warning.style.display = "block";
                return false;
            }
        }

        if (Search_maxPrice != "" && Search_maxPrice < Search_minPrice) {
            maxPrice_warning_2.style.display = "block";
            return false;
        }
    }
    const productArray = JSON.parse(localStorage.getItem("products")) || [];
    
    //Neu user khong nhap gi vao input Filter :
    if (Search_name == "" && Search_Ram == "" && Search_maxPrice == "" && Search_minPrice == "") {
        const brand = checkSearchBrand(); 

        if (brand == 0) {
            window.location.href = "";
            return true;
        }

        const filteredProducts = productArray.filter(product => {
            if (brand == 1 && product.kind === "Acer") return true; 
            if (brand == 2 && product.kind === "Lenovo") return true; 
            if (brand == 3 && product.kind === "MSI") return true; 
            return false;
        });

       
        renderProduct(currentPage, filteredProducts);
        renderPagination(filteredProducts);
        close_DivAdvancedFilter();
        return;
    }



    //Lọc theo 4 điều kiện : 
    if (Search_name != "" && Search_Ram != "" && Search_maxPrice != "" && Search_minPrice != ""){
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())){
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
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())){
                    const price = parseFloat(product.price)
                    const minPrice = parseFloat(Search_minPrice)
                    const maxPrice = parseFloat(Search_maxPrice)
                    if (price >= minPrice && price <= maxPrice){
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

    //1 : Ten, ram va minPrice : 
    if (Search_name != "" && Search_Ram != "" && Search_minPrice  != "" && Search_maxPrice == ""){
        const brand = checkSearchBrand();
        if (brand == 0 ){
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())){
                    if (product.price >= Search_minPrice)
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
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase())){
                    if (product.price >= Search_minPrice){
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

    //2 : Ten, ram va maxPrice :
    if (Search_name != "" && Search_Ram != "" && Search_maxPrice != "" && Search_minPrice == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    if (product.price <= Search_maxPrice) {
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
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) {
                    if (product.price <= Search_maxPrice) {
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


     //3 : Ten, minPrice va maxPrice :
     if (Search_name != "" && Search_minPrice != "" && Search_maxPrice != "" && Search_Ram == "") {
        const brand = checkSearchBrand();
        
        // Nếu không chọn thương hiệu nào
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
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
            const filteredProducts = productArray.filter(product => {
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
            const filteredProducts = productArray.filter(product => {
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

    // Lọc theo 2 điều kiện :
    
    //1 : Ten va Ram 
    if (Search_name != "" && Search_Ram != "" && Search_maxPrice == "" && Search_minPrice == ""){
        const brand = checkSearchBrand();
        if (brand == 0){
            const filteredProducts = productArray.filter(product => {
                if(product.name.toLowerCase().includes(Search_name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) )
                    return true;

                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }

        else {
            const filteredProducts = productArray.filter(product => {
                if(Search_name.toLowerCase().includes(product.name.toLowerCase()) && product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) )
                {
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


    //2 : Ten va minPrice : 
    if (Search_name != "" && Search_minPrice != "" && Search_maxPrice == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.price >= Search_minPrice) {
                    return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);

            close_DivAdvancedFilter();
            return;
        } else {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.price >= Search_minPrice) {
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

    //3 : Ten va maxPrice :
    if (Search_name != "" && Search_maxPrice != "" && Search_minPrice == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.price <= Search_maxPrice) {
                    return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && 
                    product.price <= Search_maxPrice) {
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

    //4 : Ram va minPrice :
    if (Search_Ram != "" && Search_minPrice != "" && Search_maxPrice == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && 
                    product.price >= Search_minPrice) {
                    return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && 
                    product.price >= Search_minPrice) {
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
    

    //5 : Ram va MaxPrice :
    if (Search_Ram != "" && Search_maxPrice != "" && Search_minPrice == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && 
                    product.price <= Search_maxPrice) {
                    return true;
                }
                return false;
            });
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);            
            close_DivAdvancedFilter();
            return;
        } else {
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && 
                    product.price <= Search_maxPrice) {
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
    

    //6 : MinPrice va MaxPrice :
    if (Search_minPrice != "" && Search_maxPrice != "" && Search_Ram == "") {
        const brand = checkSearchBrand();
        if (brand == 0) {
            const filteredProducts = productArray.filter(product => {
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
            const filteredProducts = productArray.filter(product => {
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
    

        //Lọc theo 1 điều kiện : 
        
    //Loc theo ten : 
    if (Search_name != "" && Search_Ram == "" && Search_maxPrice == "" && Search_minPrice == ""){
        if (checkSearchBrand() == 0){
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase())) return true;
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter()
            return;
        }
        else {
            const brand = checkSearchBrand(); 
            const filteredProducts = productArray.filter(product => {
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && (brand == 1 && product.kind === "Acer") ) return true;
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && (brand == 2 && product.kind === "Lenovo") ) return true;
                if (product.name.toLowerCase().includes(Search_name.toLowerCase()) && (brand == 3 && product.kind === "MSI") ) return true;
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter()
            return;
        }
    }

    // Lọc theo RAM
    if (Search_Ram != "" && Search_name == "" && Search_maxPrice == "" && Search_minPrice == "") {
        if (checkSearchBrand() == 0) {
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase())) return true;
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const brand = checkSearchBrand(); 
            const filteredProducts = productArray.filter(product => {
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && (brand == 1 && product.kind === "Acer")) return true;
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && (brand == 2 && product.kind === "Lenovo")) return true;
                if (product.ram.toLowerCase().includes(Search_Ram.toLowerCase()) && (brand == 3 && product.kind === "MSI")) return true;
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }
    }

    // Lọc theo minPrice
    if (Search_minPrice != "" && Search_maxPrice == ""  && Search_Ram == "" && Search_name == "") {
        // Lọc theo minPrice
        if (checkSearchBrand() == 0) {
            const filteredProducts = productArray.filter(product => {
                const price = parseFloat(product.price);
                const minPrice = parseFloat(Search_minPrice);
                // Lọc sản phẩm có giá >= minPrice
                if (price >= minPrice) {
                    return true;
                }
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const brand = checkSearchBrand();
            const filteredProducts = productArray.filter(product => {
                const price = parseFloat(product.price);
                const minPrice = parseFloat(Search_minPrice);

                // Lọc sản phẩm có giá >= minPrice và theo thương hiệu
                if (
                    price >= minPrice &&
                    ((brand == 1 && product.kind === "Acer") || 
                     (brand == 2 && product.kind === "Lenovo") || 
                     (brand == 3 && product.kind === "MSI"))
                ) {
                    return true;
                }
                return false;
            });

            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        }
    }

    // Lọc theo maxPrice
    if (Search_minPrice == "" && Search_maxPrice != "" && Search_Ram == "" && Search_name == "" ) {
        if (checkSearchBrand() == 0) {
            const filteredProducts = productArray.filter(product => {
                const price = parseFloat(product.price);
                const maxPrice = parseFloat(Search_maxPrice);
                
                if (price <= maxPrice) {
                    return true;
                }
                return false;
            });
            console.log(filteredProducts)
            renderProduct(currentPage, filteredProducts);
            renderPagination(filteredProducts);
            close_DivAdvancedFilter();
            return;
        } else {
            const brand = checkSearchBrand();
            const filteredProducts = productArray.filter(product => {
                const price = parseFloat(product.price);
                const maxPrice = parseFloat(Search_maxPrice);
                if (
                    price <= maxPrice &&
                    ((brand == 1 && product.kind === "Acer") || 
                     (brand == 2 && product.kind === "Lenovo") || 
                     (brand == 3 && product.kind === "MSI"))
                ) {
                    return true;
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

    
    
