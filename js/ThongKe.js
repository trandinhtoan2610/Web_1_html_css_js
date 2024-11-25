function formatCurrencyVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function filterOrdersByDate() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  // Kiểm tra xem ngày bắt đầu và ngày kết thúc đã được chọn chưa
  if (!startDate || !endDate) {
    alert("Vui lòng chọn ngày bắt đầu và kết thúc");
    return;
  }

  // Chuyển đổi thành đối tượng Date
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) {
    alert("Ngày bắt đầu phải trước ngày kết thúc");
  }

  end.setHours(23, 59, 59, 999);
  // Lọc các đơn hàng trong khoảng thời gian đã chọn
  let ors = JSON.parse(localStorage.getItem("orders")) || [];
  const filteredOrders = ors.filter((order) => {
    const orderDate = new Date(order.createAt);
    return orderDate >= start && orderDate <= end;
  });

  // Gọi lại hàm displayStats với danh sách đơn hàng đã lọc
  displayStats(filteredOrders);
}
function xuat() {
  console.log("chuc mung nam moi ");
}
function displayStats(x) {
  let orders;
  if (x) {
    orders = x;
  } else {
    orders = JSON.parse(localStorage.getItem("orders")) || [
      {
        orderId: 1,
        userId: 101,
        userName: "Alice",
        status: "Completed",
        createAt: "2021-01-01T10:00:00Z",
        orderDetails: [
          {
            productId: 1,
            productName: "Candle Scented A",
            quantity: 5,
            totalPrice: 500000,
          },
          {
            productId: 2,
            productName: "Candle Scented B",
            quantity: 3,
            totalPrice: 300000,
          },
        ],
        totalAmount: 800000,
      },
      {
        orderId: 2,
        userId: 102,
        userName: "Bob",
        status: "Completed",
        createAt: "2021-01-02T11:00:00Z",
        orderDetails: [
          {
            productId: 1,
            productName: "Candle Scented A",
            quantity: 10,
            totalPrice: 1000000,
          },
        ],
        totalAmount: 1000000,
      },
    ];
  }

  const productStats = {};

  // Duyệt qua các đơn hàng và tính toán
  orders.forEach((order) => {
    if (order.status === "Completed") {
      order.orderDetails.forEach((item) => {
        if (!productStats[item.productName]) {
          productStats[item.productName] = {
            totalQuantity: 0,
            totalRevenue: 0,
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
  const bestSellingProduct = Object.keys(productStats).reduce(
    (best, productName) => {
      return productStats[productName].totalRevenue >
        productStats[best].totalRevenue
        ? productName
        : best;
    },
    Object.keys(productStats)[0]
  );

  const leastSellingProduct = Object.keys(productStats).reduce(
    (least, productName) => {
      return productStats[productName].totalRevenue <
        productStats[least].totalRevenue
        ? productName
        : least;
    },
    Object.keys(productStats)[0]
  );
  const container = document.getElementById("container");

  // Thêm bảng thống kê sản phẩm
  let tableHTML = `
    <label for="startDate">Chọn ngày bắt đầu:</label>
    <input type="date" id="startDate">
    <label for="endDate">Chọn ngày kết thúc:</label>
    <input type="date" id="endDate">
    <button onclick="filterOrdersByDate()">Lọc theo thời gian</button>
    <h3>Thống kê sản phẩm</h3>
     <div class="table">
            <div id = "tb" class="table-header">
                <div class="header__item"><a id="id" class="filter__link" href="#">Tên sản phẩm</a></div>
                <div class="header__item"><a id="name" class="filter__link" href="#">Thổng số lượng bán</a></div>
                <div class="header__item"><a id="price" class="filter__link filter__link--number" href="#">Tổng số tiền bán</a></div>
               
		    </div>
            <div class="table-content" id="table-content">
        
  `;

  for (const productName in productStats) {
    tableHTML += `
      
      <div class="table-row">		
				<div class="table-data">${productName}</div>
				<div class="table-data">${productStats[productName].totalQuantity}</div>
				<div class="table-data">${formatCurrencyVND(
          productStats[productName].totalRevenue
        )}</div>
		</div>
    `;
  }

  tableHTML += `
      </div>
    </div>
  `;

  // Thêm tổng doanh thu tất cả các mặt hàng
  tableHTML += `
    <h3>Tổng số tiền bán của tất cả các sản phẩm: ${formatCurrencyVND(
      totalRevenueAllProducts
    )}</h3>
  `;

  // Thêm mặt hàng bán chạy nhất và ế nhất
  tableHTML += `
    <h3>Sản phẩm bán chạy nhất: ${bestSellingProduct}</h3>
    <h3>Sản phẩm bán ít nhất: ${leastSellingProduct}</h3>
  `;

  // Chèn HTML vào thẻ container
  container.innerHTML = tableHTML;
  displayTopCustomers(orders);
}

// Hàm để hiển thị các khách hàng có doanh thu cao nhất và hóa đơn của họ
function displayTopCustomers(orders) {
  const customerStats = {};

  // Duyệt qua các đơn hàng và tính toán doanh thu theo khách hàng
  orders.forEach((order) => {
    if (order.status === "Completed") {
      const customerId = order.customerId; // ID khách hàng
      if (!customerStats[customerId]) {
        customerStats[customerId] = {
          totalRevenue: 0,
          customerName: order.userName,
          orders: [],
        };
      }

      let orderRevenue = 0;
      order.orderDetails.forEach((item) => {
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
  const container = document.getElementById("container");

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

  topCustomers.forEach((customer) => {
    customersHTML += `
      
       <div class="table-row">		
				<div class="table-data">${customer.customerName}</div>
				<div class="table-data">${formatCurrencyVND(customer.totalRevenue)}</div>
				<div class="table-data"><button onclick="viewCustomerOrders('${
          customer.customerName
        }')">View Orders</button></div>
		</div>
    `;
  });

  customersHTML += `
      </div>
    </div>
  `;

  // Chèn HTML vào thẻ container
  container.innerHTML += customersHTML;
}

// // Hàm để hiển thị hóa đơn của khách hàng
// function viewCustomerOrders(customerName) {
//   const container = document.getElementById('container');

//   const customer = topCustomers.find(c => c.customerName === customerName);

//   let ordersHTML = `<h3>Orders for ${customerName}</h3><ul>`;

//   customer.orders.forEach(order => {
//     ordersHTML += `
//       <li>
//         <strong>Order ID:</strong> ${order.id} <br>
//         <strong>Status:</strong> ${order.status} <br>
//         <strong>Total:</strong> ${order.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0)} <br>
//         <strong>Order Date:</strong> ${new Date(order.date).toLocaleString()} <br>
//         <button onclick="viewInvoice(${order.id})">View Invoice</button>
//       </li>
//     `;
//   });

//   ordersHTML += `</ul>`;

//   // Hiển thị thông tin hóa đơn của khách hàng
//   container.innerHTML = ordersHTML;
// }

// // Hàm để hiển thị hóa đơn chi tiết
// function viewInvoice(orderId) {
//   const order = orders.find(o => o.id === orderId);

//   if (order) {
//     let invoiceHTML = `<h3>Invoice for Order ${order.id}</h3>`;
//     invoiceHTML += `<ul>`;
//     order.orderDetails.forEach(item => {
//       invoiceHTML += `
//         <li>
//           <strong>Product:</strong> ${item.productName} <br>
//           <strong>Quantity:</strong> ${item.quantity} <br>
//           <strong>Total Price:</strong> ${item.totalPrice}
//         </li>
//       `;
//     });
//     invoiceHTML += `</ul>`;

//     const container = document.getElementById('container');
//     container.innerHTML += invoiceHTML;
//   }
// }
