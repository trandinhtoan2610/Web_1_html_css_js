
function formatCurrencyVND(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}


function displayStats(filteredOrders) {
    if(filteredOrders){
      orders = filteredOrders;
    }
    else{
      orders = JSON.parse(localStorage.getItem('orders')) || [];
    } 
   
    const productStats = {};
    console.log(orders);
    // Duyệt qua các đơn hàng và tính toán
    orders.forEach(order => {
      if (order.status === 'Đã giao thành công') {
        order.orderDetails.forEach(item => {
          if (!productStats[item.productName]) {
            productStats[item.productName] = {
              totalQuantity: 0,
              totalRevenue: 0
            };
          }
          productStats[item.productName].totalQuantity += item.quantity;
          productStats[item.productName].totalRevenue += item.totalPrice;
        });
      }
    });
    
    // Tính tổng doanh thu tất cả các mặt hàng
    let totalRevenueAllProducts = 0;
    for (const productName in productStats) {
      totalRevenueAllProducts += productStats[productName].totalRevenue;
    }
    
    // Tìm mặt hàng bán chạy nhất và ế nhất
    const bestSellingProduct = Object.keys(productStats).reduce((best, productName) => {
      return productStats[productName].totalQuantity > productStats[best].totalQuantity ? productName : best;
    }, Object.keys(productStats)[0]);
    
    const leastSellingProduct = Object.keys(productStats).reduce((least, productName) => {
      return productStats[productName].totalQuantity < productStats[least].totalQuantity ? productName : least;
    }, Object.keys(productStats)[0]);
  const container = document.getElementById('container');

  // Thêm bảng thống kê sản phẩm
  let tableHTML = `
    <label for="startDate">Chọn ngày bắt đầu:</label>
    <input type="date" id="startDateThongKe">
    <label for="endDate">Chọn ngày kết thúc:</label>
    <input type="date" id="endDateThongKe">
    <button onclick="filterOrdersByDateThongKe()">Lọc theo thời gian</button>
    <h3>Thống kê sản phẩm</h3>
    <div class="col-9">
      <div class="row">
        <div class="col-sm-3">
          <div class="well">
            <h4>Tổng tiền bán được</h4>
            <p>${formatCurrencyVND(totalRevenueAllProducts)}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Sản phẩm bán chạy nhất</h4>
            <p>${bestSellingProduct || ''}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Sản phẩm bán ít nhất</h4>
            <p>${leastSellingProduct || ""}</p> 
          </div>
        </div>
        <div class="col-sm-3">
          <div class="well">
            <h4>Bounce</h4>
            <p>30%</p> 
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
            <p>Text</p> 
            <p>Text</p> 
          </div>
        </div>
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
            <p>Text</p> 
            <p>Text</p> 
          </div>
        </div>
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
            <p>Text</p> 
            <p>Text</p> 
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="well">
            <p>Text</p> 
          </div>
        </div>
        <div class="col-sm-4">
          <div class="well">
            <p>Text</p> 
          </div>
        </div>
      </div>
    </div>
  </div>
     <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Tên sản phẩm</a></div>
                <div class="header__item"><a id="name" class="filter__link" href="#">Thổng số lượng bán</a></div>
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng số tiền bán</a></div>
               
		    </div>
            <div class="table-content" id="table-content" class ="max-height: 400px; overflow : auto;">
        
  `;

  for (const productName in productStats) {
    tableHTML += `
      
      <div class="table-row">		
				<div class="table-data">${productName}</div>
				<div class="table-data">${productStats[productName].totalQuantity}</div>
				<div class="table-data">${formatCurrencyVND(productStats[productName].totalRevenue)}</div>
		</div>
    `;
  }

  tableHTML += `
      </div>
    </div>
  `;

  // Thêm tổng doanh thu tất cả các mặt hàng
  tableHTML += `
    <h3>Tổng số tiền bán của tất cả các sản phẩm: ${formatCurrencyVND(totalRevenueAllProducts)}</h3>
  `;

  // Thêm mặt hàng bán chạy nhất và ế nhất
  tableHTML += `
    <h3>Sản phẩm bán chạy nhất: ${bestSellingProduct || ""}</h3>
    <h3>Sản phẩm bán ít nhất: ${leastSellingProduct || ""}</h3>
  `;

  // Chèn HTML vào thẻ container
  container.innerHTML = tableHTML;
  displayTopCustomers(orders);
}





// Hàm để hiển thị các khách hàng có doanh thu cao nhất và hóa đơn của họ
function displayTopCustomers(orders) {
    const customerStats = {};

    // Duyệt qua các đơn hàng và tính toán doanh thu theo khách hàng
    orders.forEach(order => {
    if (order.status === 'Đã giao thành công') {
        const customerId = order.userId; // ID khách hàng
        if (!customerStats[customerId]) {
          customerStats[customerId] = {
              totalRevenue: 0,
              customerName: order.fullname,
              customerId: order.userId,
              orders: []
          };
        }
        
        let orderRevenue = 0;
        order.orderDetails.forEach(item => {
        orderRevenue += item.totalPrice; // Cộng tổng tiền cho mỗi mặt hàng
        });
        
        customerStats[customerId].totalRevenue += orderRevenue;
        customerStats[customerId].orders.push(order); // Lưu lại hóa đơn của khách hàng
    }
    });

    // Lọc và sắp xếp 5 khách hàng có doanh thu cao nhất
    const topCustomers = Object.values(customerStats)
    .sort((a, b) => b.totalRevenue - a.totalRevenue) // Sắp xếp theo doanh thu giảm dần
    .slice(0, 5); // Lấy 5 khách hàng đầu tiên
  const container = document.getElementById('container');
  
  // Hiển thị danh sách khách hàng và doanh thu của họ
  let customersHTML = `
    <hr/>
    <h3>Top 5 khách hàng mua nhiều nhất</h3>
     <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Tên khách hàng</a></div>
                <div class="header__item"><a id="name" class="filter__link" href="#">Tổng số tiền mà khách hàng đã mua</a></div>
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Xem tất cả hóa đơn</a></div>
		    </div>
            <div class="table-content" id="table-content">
  `;
  console.log(topCustomers);
  topCustomers.forEach(customer => {
    customersHTML += `
      
       <div class="table-row">		
				<div class="table-data">${customer.customerName}</div>
				<div class="table-data">${formatCurrencyVND(customer.totalRevenue)}</div>
				<div class="table-data"><a href="../html/order-details.html?orderId=${
          customer.customerId + "kh"
        }" class="btn btn-view" target ="_blank">Xem chi tiết</a> </div>
		</div>
    `;
  });
  
  customersHTML += `
      </div>
    </div>
  `;
  container.innerHTML += customersHTML;
}

function filterOrdersByDateThongKe(){
  const startDate = new Date(document.getElementById('startDateThongKe').value);
  const endDate = new Date(document.getElementById('endDateThongKe').value);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert('Vui lòng chọn ngày bắt đầu và ngày kết thúc');
      return;
    }
    if (startDate > endDate) {
        alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
        return;
    }
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const filteredOrders = orders.filter(order => {
        const createdAt = new Date(order.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
    });
    displayStats(filteredOrders);
}


function viewInvoices(userId) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const userOrders = orders.filter(order => order.userId === userId);

  let invoiceDetails = '';
  userOrders.forEach(order => {
      invoiceDetails += `
          <div class="invoice-details">
              <h4>Đơn hàng #${order.orderId}</h4>
              <p><strong>Tình trạng:</strong> ${order.status}</p>
              <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Tổng tiền:</strong> ${order.totalAmount.toLocaleString()} VND</p>
              <button onclick="viewOrderDetail(${order.orderId})">Xem chi tiết</button>
          </div>
      `;
  });

  // Hiển thị modal xem chi tiết hóa đơn
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
      <div class="modal-content">
          <span class="close" onclick="closeModal()">&times;</span>
          <h3>Hóa đơn của khách hàng</h3>
          ${invoiceDetails}
      </div>
  `;
  document.body.appendChild(modal);
}

// Đóng modal
function closeModal() {
  const modal = document.querySelector('.modal');
  modal.remove();
}


