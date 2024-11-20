const showOrderManagement = () => {
    const container = document.getElementById('container');
    container.innerHTML = `
        
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Mã đơn hàng</a></div>
                <div class="header__item"><a id="name" class="filter__link" href="#">Tên khách hàng</a></div>
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng tiền</a></div>
                <div class="header__item"><a id="status" class="filter__link filter__link--number" href="#">Trạng thái</a></div>
                <div class="header__item"><a id="createAt" class="filter__link filter__link--number" href="#">Ngày tạo</a></div>
                <div class="header__item"><a id="handle" class="filter__link filter__link--number" href="#">Hành động</a></div>
		    </div>
            <div class="table-content" id="table-content"></div>
        </div>
    `;
    loadOrders(); // Tải danh sách đơn hàng từ Local Storage
};

// Hàm tải danh sách đơn hàng từ Local Storage
const loadOrders = () => {
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const table = document.getElementById('table-content');
    table.innerHTML = ''; // Xóa dữ liệu cũ
    invoices.forEach((invoice, index) => {
        const row = `
            <div class="table-row">		
				<div class="table-data">${invoice.id}</div>
				<div class="table-data">${invoice.name}</div>
				<div class="table-data">${invoice.price}</div>
				<div class="table-data">${invoice.status}</div>
				<div class="table-data">${invoice.createAt}</div>
                <div class="table-data"><button class="btn btn-delete" onclick="deleteOrder(${invoice.id})">Delete</button></div>
			</div>
        `;
        table.innerHTML += row;
    });
};

// Hàm thêm đơn hàng mới
const addOrder = () => {
    const name = document.getElementById('orderName').value.trim();
    const price = document.getElementById('orderPrice').value.trim();

    if (!name || !price) {
        alert('Please enter valid order details.');
        return;
    }

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ name, price });
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();

    // Clear inputs
    document.getElementById('orderName').value = '';
    document.getElementById('orderPrice').value = '';
};

// Hàm xóa đơn hàng
const deleteOrder = (index) => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
};

