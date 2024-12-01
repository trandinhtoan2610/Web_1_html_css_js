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
                    <li><a href="#" class="Them_SP" id="Tao_SP" onclick="showAddUserForm()">Thêm Người Dùng</a></li>                <li class="Fix_Title"> QUẢN LÝ KHÁCH HÀNG </li>
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
                <div class="header__item"><a id="role" class="filter__link" href="#">Vai Trò</a></div>
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
                <div class="table-data">${user.role}</div>
                <div class="table-data">
                <button onclick="unlockUser(${user.id})">Mở Khóa</button>
                <button onclick="lockUser(${user.id})">Khóa</button></div>
                <div class="table-data">
                <button onclick="openEditForm(${user.id})">Sửa</button>
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
function addUser(event) {
    event.preventDefault(); // Ngăn form reload lại trang

    // Lấy dữ liệu từ form
    const role = document.getElementById('addRole').value;
    const fullname = document.getElementById('addFullname').value;
    const username = document.getElementById('addUsername').value;
    const phone = document.getElementById('addPhone').value;
    const address = document.getElementById('addAddress').value;
    const phuong = document.getElementById('addPhuong').value;
    const quan = document.getElementById('addQuan').value;
    const password = document.getElementById('addPassword').value;

    let valid = true;
    // Kiểm tra lỗi
    if (!fullname) {
        document.getElementById('fullNameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('fullNameError').style.display = 'none';
    }

    if (!username) {
        document.getElementById('newUsernameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('newUsernameError').style.display = 'none';
    }

    if (!phone) {
        document.getElementById('phoneNumberError').style.display = 'block';
        valid = false;
    } else if (isNaN(Number(phone)) || phone.length !== 10) {
        document.getElementById('phoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
        document.getElementById('phoneNumberError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('phoneNumberError').style.display = 'none';
    }
    if (!address) {
        document.getElementById('addressError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('addressError').style.display = 'none';
    }

    if (!phuong) {
        document.getElementById('phuongError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('phuongError').style.display = 'none';
    }

    if (!quan) {
        document.getElementById('quanError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('quanError').style.display = 'none';
    }

    if (!password || password.length < 8) {
        document.getElementById('newPasswordError').innerHTML = '<i>*Mật khẩu phải trên 8 ký tự</i>';
        document.getElementById('newPasswordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('newPasswordError').style.display = 'none';
    }

    if (!valid) return;
    const userList = JSON.parse(localStorage.getItem('user')) || [];
    const countIDUser = parseInt(localStorage.getItem('countIDUser') || "0") + 1;

    if (userList.some(user => user.username === username)) {
        alert("Người dùng đã tồn tại!");
        return;
    }

    const newUser = {
        id: countIDUser,
        fullname,
        username,
        phone,
        address,
        phuong,
        quan,
        password,
        datesignup: new Date().toLocaleDateString(),
        status: true,
        role,
    };

    userList.push(newUser);
    localStorage.setItem('user', JSON.stringify(userList));
    localStorage.setItem('countIDUser', countIDUser);

    alert("Người dùng được thêm thành công!");
    document.getElementById('addUserForm').reset();
    hideAddUserForm();
    displayUsers();
}

function openEditForm(userId) {
    const userList = JSON.parse(localStorage.getItem('user')) || [];
    const user = userList.find(u => u.id === userId);

    if (!user) {
        alert("Người dùng không tồn tại!");
        return;
    }

    // Điền thông tin cũ vào form
    document.getElementById('editRole').value = user.role;
    document.getElementById('editFullname').value = user.fullname;
    document.getElementById('editUsername').value = user.username; // Khóa không cho sửa
    document.getElementById('editPhone').value = user.phone;
    document.getElementById('editAddress').value = user.address;
    document.getElementById('editPhuong').value = user.phuong;
    document.getElementById('editQuan').value = user.quan;
    document.getElementById('editPassword').value = user.password;

    // Hiển thị form sửa
    document.getElementById('editUserForm').style.display = 'block';

    // Gắn ID vào form để xử lý sau
    document.getElementById('editUserForm').setAttribute('data-user-id', userId);
}
function saveEdit() {
    const userId = parseInt(document.getElementById('editUserForm').getAttribute('data-user-id'));
    const userList = JSON.parse(localStorage.getItem('user')) || [];

    // Tìm người dùng cần sửa
    const userIndex = userList.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        alert("Người dùng không tồn tại!");
        return;
    }

    // Lấy thông tin đã chỉnh sửa từ form
    const role = document.getElementById('editRole').value;
    const fullname = document.getElementById('editFullname').value;
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;
    const phuong = document.getElementById('editPhuong').value;
    const quan = document.getElementById('editQuan').value;
    const password = document.getElementById('editPassword').value;

    let valid = true;

    // Kiểm tra lỗi
    if (!fullname) {
        document.getElementById('editFullNameError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editFullNameError').style.display = 'none';
    }

    if (!phone) {
        document.getElementById('editPhoneNumberError').style.display = 'block';
        valid = false;
    } else if (isNaN(Number(phone)) || phone.length !== 10) {
        document.getElementById('editPhoneNumberError').innerHTML = '<i>*Số điện thoại không đúng định dạng</i>';
        document.getElementById('editPhoneNumberError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editPhoneNumberError').style.display = 'none';
    }

    if (!address) {
        document.getElementById('editAddressError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editAddressError').style.display = 'none';
    }

    if (!phuong) {
        document.getElementById('editPhuongError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editPhuongError').style.display = 'none';
    }

    if (!quan) {
        document.getElementById('editQuanError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editQuanError').style.display = 'none';
    }

    if (!password || password.length < 8) {
        document.getElementById('editPasswordError').innerHTML = '<i>*Mật khẩu phải trên 8 ký tự</i>';
        document.getElementById('editPasswordError').style.display = 'block';
        valid = false;
    } else {
        document.getElementById('editPasswordError').style.display = 'none';
    }

    if (!valid) return;

    // Cập nhật thông tin trong danh sách
    userList[userIndex] = {
        ...userList[userIndex],
        fullname,
        phone,
        address,
        phuong,
        quan,
        password,
        role,
    };

    // Lưu lại vào localStorage
    localStorage.setItem('user', JSON.stringify(userList));

    alert("Thông tin người dùng đã được cập nhật!");
    hideEditUserForm(); // Ẩn form sửa
    displayUsers(); // Cập nhật danh sách hiển thị
}
function hideEditUserForm() {
    document.getElementById('editUserForm').style.display = 'none';
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