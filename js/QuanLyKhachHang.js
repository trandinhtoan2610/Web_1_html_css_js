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
        <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table class="min-w-full table-auto">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 border-b">ID</th>
                        <th class="px-4 py-2 border-b">Tên người dùng</th>
                        <th class="px-4 py-2 border-b">Họ tên</th>
                        <th class="px-4 py-2 border-b">Số điện thoại</th>
                        <th class="px-4 py-2 border-b">Địa Chỉ</th>
                        <th class="px-4 py-2 border-b">Trạng thái</th>
                        <th class="px-4 py-2 border-b">Vai Trò</th>
                        <th class="px-4 py-2 border-b">Khóa/Mở Khóa</th>
                        <th class="px-4 py-2 border-b">Sửa/Xóa</th>
                    </tr>
                </thead>
                <tbody id="table-content">
    `;

    if (userList.length === 0) {
        userTable += `
            <tr>
                <td colspan="9" class="text-center py-4">Không có người dùng nào</td>
            </tr>
        `;
    } else {
        userList.forEach(user => {
            userTable += `
            <tr class="border-b">
                <td class="px-4 py-2">${user.id}</td>
                <td class="px-4 py-2">${user.username}</td>
                <td class="px-4 py-2">${user.fullname}</td>
                <td class="px-4 py-2">${user.phone}</td>
                <td class="px-4 py-2" id="customAddress">${user.address} ,Phường: ${user.phuong}, Quận: ${user.quan}</td>
                <td class="px-4 py-2">${user.status}</td>
                <td class="px-4 py-2">${user.role}</td>
                <td class="px-4 py-2">
                    <button onclick="unlockUser(${user.id})" class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"><i class="fa-solid fa-unlock"></i></button>
                    <button onclick="lockUser(${user.id})" class="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"><i class="fa-solid fa-lock"></i></button>
                </td>
                <td class="px-4 py-2">
                    <button onclick="openEditForm(${user.id})" class="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"><i class="fa-solid fa-wrench"></i></button>
                    <button onclick="deleteUser(${user.id})" class="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"><i class="fa-sharp-duotone fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        });
    }

    userTable += `
                </tbody>
            </table>
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