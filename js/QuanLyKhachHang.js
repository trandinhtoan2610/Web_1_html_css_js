// Hàm hiển thị danh sách người dùng
function displayUsers() {
    const container = document.getElementById('container');
    if (!container) {
        console.log('Không tìm thấy phần tử container.');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const userString = localStorage.getItem('user');
    let userList = userString ? JSON.parse(userString) : [];
    if (!Array.isArray(userList)) userList = [];

    // Tạo bảng hiển thị danh sách người dùng
    let userTable = `
        <div class="FixProducts_Header">
                <ul class="AP_HeaderList">
                    <li><a href="#" class="Them_SP" id="Tao_SP" onclick="showAddUserForm()">Thêm Người Dùng</a></li>                    <li class="Fix_Title"> QUẢN LÝ KHÁCH HÀNG </li>
                    <li><a href="indexAdmin.html" id="Thoat_TaoSP">Trở lại</a></li>
                </ul>
            </div>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="countIDUser" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phone" class="filter__link" href="#">Số điện thoại</a></div>
                <div class="header__item"><a id="Address" class="filter__link" href="#">Địa Chỉ</a></div>
                <div class="header__item"><a id="status" class="filter__link" href="#">Trạng thái</a></div>
                <div class="header__item"><a id="locked" class="filter__link" href="#">Khóa/Mở Khóa</a></div>
                <div class="header__item"><a id="repair" class="filter__link" href="#">Sửa/Xóa</a></div>
            </div>
            <div class="table-content" id="table-content">
    `;
    if (userList.length === 0) {
        userTable += `
            <div class="table-row">
                <div class="table-data" colspan="5">Không có người dùng nào</div>
            </div>
        `;
    } else {
        userList.forEach(user => {
            userTable += `
            <div class="table-row">
                <div class="table-data">${user.id}</div>
                <div class="table-data">${user.username}</div>
                <div class="table-data">${user.fullname}</div>
                <div class="table-data">${user.phone}</div>
                <div class="table-data" id="customAddress">${user.address} ,Phường:${user.phuong},Quận:${user.quan}</div>
                <div class="table-data">${user.status}</div>
                <div class="table-data">
                <button onclick="unlockUser(${user.id})">Mở Khóa</button>
                <button onclick="lockUser(${user.id})">Khóa</button></div>
                <div class="table-data">
                <button onclick="showEditUserForm(${user.id})">Sửa</button>
                <button onclick="deleteUser(${user.id})">Xóa</button>                       
                </div>
            </div>`;
        });
    }

    userTable += `
            </div>
        </div>
    `;

    container.innerHTML = userTable;
}

// Hiển thị form thêm người dùng
function showAddUserForm() {
    document.getElementById('addUserForm').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function hideAddUserForm() {
    document.getElementById('addUserForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


// Hàm thêm người dùng từ form
function addUserFromForm() {
    const username = document.getElementById('addUsername').value;
    const fullname = document.getElementById('addFullname').value;
    const phone = document.getElementById('addPhone').value;
    const sonha = document.getElementById('addAddress').value;
    const phuong = document.getElementById('addPhuong').value;
    const quan = document.getElementById('addQuan').value;
    const password = document.getElementById('addPassword').value;
    var d = new Date();
    var datesignup = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    addUser(username, fullname, phone, sonha, phuong, quan, password, datesignup);
    hideAddUserForm();
}

// Hàm thêm người dùng
function addUser(username, fullname, phone, address, phuong, quan, password, datesignup) {
    let flag = true;

    // Kiểm tra các trường
    if (!fullname) {
        document.getElementById('fullNameError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }

    if (!username) {
        document.getElementById('newUsernameError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('newUsernameError').style.display = 'none';
    }

    if (!address) {
        document.getElementById('addressError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('addressError').style.display = 'none';
    }

    if (!phuong) {
        document.getElementById('phuongError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('phuongError').style.display = 'none';
    }

    if (!quan) {
        document.getElementById('quanError').style.display = 'block';
        flag = false;
    } else {
        document.getElementById('quanError').style.display = 'none';
    }

    if (!phone) {
        document.getElementById('phoneNumberError').style.display = 'block';
        flag = false;
    } else if (isNaN(Number(phone)) || phone.length !== 9) {
        document.getElementById('phoneNumberError').style.display = 'block';
        document.getElementById('phoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
        flag = false;
    } else {
        document.getElementById('phoneNumberError').style.display = 'none';
    }

    if (!password) {
        document.getElementById('newPasswordError').style.display = 'block';
        flag = false;
    } else if (password.length < 8) {
        document.getElementById('newPasswordError').style.display = 'block';
        document.getElementById('newPasswordError').innerHTML = '<i>*Mật khẩu phải trên 8 ký tự</i>';
        flag = false;
    } else {
        document.getElementById('newPasswordError').style.display = 'none';
    }

    if (!flag) return; // Dừng nếu có lỗi

    // Kiểm tra và lưu trữ
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    if (userList.some(user => user.username === username)) {
        alert("Người dùng đã tồn tại.");
        return;
    }

    let countIDUser = parseInt(localStorage.getItem('countIDUser')) || 0;
    countIDUser += 1;
    localStorage.setItem('countIDUser', countIDUser);

    const newUser = {
        id: countIDUser,
        username: username,
        fullname: fullname,
        phone: phone,
        address: address,
        phuong: phuong,
        quan: quan,
        password: password,
        datesignup: datesignup,
        status: true,
    };

    userList.push(newUser);
    localStorage.setItem('user', JSON.stringify(userList));

    alert("Người dùng đã được thêm thành công.");
    document.getElementById('addUserForm').reset();
    displayUsers(); // Cập nhật danh sách người dùng
}

// Hàm sửa thông tin người dùng
function editUser(userId, newUsername, newFullname, newPhone, newPassword) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (!user) {
        alert("Không tìm thấy người dùng.");
        return;
    }

    user.username = newUsername;
    user.fullname = newFullname;
    user.phone = newPhone;
    user.password = newPassword;

    localStorage.setItem('user', JSON.stringify(userList));
    alert("Thông tin người dùng đã được sửa thành công.");
    displayUsers();
}

// Hàm xóa người dùng
function deleteUser(userId) {
    if (confirm("Bạn muốn xóa người dùng?!!") == false)
        return;
    else {
        let userList = JSON.parse(localStorage.getItem('user')) || [];
        userList = userList.filter(user => user.id !== userId);

        localStorage.setItem('user', JSON.stringify(userList));
        alert("Người dùng đã được xóa thành công.");
        displayUsers();
    }
}
//Hàm khóa người dùng
function lockUser(userId) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (user) {
        if (!user.status) {
            alert("Người dùng đã bị khóa.");
            return;
        }
        user.status = false;
        localStorage.setItem('user', JSON.stringify(userList));
        alert(`Người dùng '${user.username}' đã bị khóa.`);
        displayUsers();
    } else {
        alert("Không tìm thấy người dùng.");
    }
}
//Hàm mở khóa người dùng
function unlockUser(userId) {
    let userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);
    if (user) {
        if (user.status) {
            alert("Người dùng không bị khóa.");
            return;
        }
        user.status = true;
        localStorage.setItem('user', JSON.stringify(userList));
        alert(`Người dùng '${user.username}' đã được mở khóa.`);
        displayUsers();
    } else {
        alert("Không tìm thấy người dùng.");
    }
}

// Hàm tìm kiếm ID của người dùng
function searchUserById() {
    const searchInput = document.getElementById('searchInput').value;
    if (!searchInput) {
        alert('Vui lòng nhập ID để tìm kiếm.');
        return;
    }

    const userId = parseInt(searchInput, 10);
    if (isNaN(userId)) {
        alert('ID không hợp lệ. Vui lòng nhập một số nguyên.');
        return;
    }

    // Lấy danh sách người dùng từ localStorage
    const userString = localStorage.getItem('user');
    let userList = userString ? JSON.parse(userString) : [];
    if (!Array.isArray(userList)) userList = [];

    // Tìm người dùng theo ID
    const user = userList.find(user => user.id === userId);
    if (!user) {
        alert('Không tìm thấy người dùng với ID đã nhập.');
        return;
    }

    // Hiển thị kết quả tìm kiếm
    let searchResult = `
        <h2>Kết quả tìm kiếm</h2>
        <button onclick="displayUsers()">Quay lại</button>
        <div class="table">
            <div class="table-header">
                <div class="header__item"><a id="countIDUser" class="filter__link" href="#">ID</a></div>
                <div class="header__item"><a id="username" class="filter__link" href="#">Tên người dùng</a></div>
                <div class="header__item"><a id="fullname" class="filter__link" href="#">Họ tên</a></div>
                <div class="header__item"><a id="phone" class="filter__link" href="#">Số điện thoại</a></div>
                <div class="header__item"><a id="Address" class="filter__link" href="#">Địa Chỉ</a></div>
                <div class="header__item"><a id="status" class="filter__link" href="#">Trạng thái</a></div>
                <div class="header__item"><a id="locked" class="filter__link" href="#">Khóa/Mở Khóa</a></div>
                <div class="header__item"><a id="repair" class="filter__link" href="#">Sửa/Xóa</a></div>
            </div>
            <div class="table-content">
                <div class="table-row table-row-highlight">
                    <div class="table-data">${user.id}</div>
                <div class="table-data">${user.username}</div>
                <div class="table-data">${user.fullname}</div>
                <div class="table-data">${user.phone}</div>
                <div class="table-data">${user.address} ,Phường:${user.phuong},Quận:${user.quan}</div>
                <div class="table-data">${user.status}</div>
                <div class="table-data">
                <button onclick="unlockUser(${user.id})">Mở Khóa</button>
                <button onclick="lockUser(${user.id})">Khóa</button></div>
                <div class="table-data">
                <button onclick="showEditUserForm(${user.id})">Sửa</button>
                <button onclick="deleteUser(${user.id})">Xóa</button>                       
                </div>
                </div>
            </div>
        </div>
    `;

    // Cập nhật giao diện để hiển thị kết quả
    const container = document.getElementById('container');
    container.innerHTML = searchResult;
}
