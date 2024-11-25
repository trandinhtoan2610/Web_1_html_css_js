function KhoiTaoSanPham(hinh, brand, ten, gia, id, ram, ssd, card, MoTa){
    SanPham = new Object();
    SanPham.image = hinh;
    SanPham.kind = brand;
    SanPham.name = ten;
    SanPham.price = gia;
    SanPham.id = id;
    SanPham.ram = ram;
    SanPham.ssd = ssd;
    SanPham.card = card;
    SanPham.description = MoTa;
    return SanPham;
}


function LayDanhSachSanPham(){
    var DSSP = new Array();
    var json_DSSP = localStorage.getItem("products")
    if (json_DSSP != null)
        DSSP = JSON.parse(json_DSSP);
    return DSSP;
}


function ThemVaoGioHang(IDsanpham) {
    alert("Thêm vào giỏ hàng thành công")

    /* Lay danh sach gio hang tu localStorage */
    var DanhSachItemGH = layDanhSachItemGH();
    var checkExist = false; /*Boolen de check xem item da ton tai trong gio hang chua */

    /* Them item vao gio hang */
    
    /*Vong lap kiem tra */
    for ( var i = 0 ; i < DanhSachItemGH.length ; i++ )
    {
        /*Kiem tra item da co trong gio hang chua */
        if (DanhSachItemGH[i].idSP == IDsanpham)  
        {
            checkExist = true 
            DanhSachItemGH[i].sl++;
            break;
        }
    }
    /*Neu chua ton tai : */
    if (checkExist == false){
        var ItemGH = TaoItemGH(IDsanpham, 1)
        DanhSachItemGH.push(ItemGH);
    }

    /* Luu vao local storage */
    LuuDSGHvaoLocalStorage(DanhSachItemGH);
    HienThiDanhSachItemGH()
}

function TaoItemGH (id, soluong){
    var itemGH = new Object();
    itemGH.idSP = id;
    itemGH.sl = soluong;
    return itemGH;
}

function layDanhSachItemGH (){
    var DSGH = new Array();

    var json_DSGH = localStorage.getItem('DSGH')

    if (json_DSGH != null )
        DSGH = JSON.parse(json_DSGH)

    return DSGH;
}

function LuuDSGHvaoLocalStorage(DanhSach){

    var json_danhsach = JSON.stringify(DanhSach);

    localStorage.setItem('DSGH',json_danhsach);
}


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


/* Lay DOI TUONG san pham tu id 
    Input : id cua san pham
    Ouput : DOI TUONG san pham */
    function LayItemTheoID (IDsanpham){
        var SanPham = new Object();
        /*Load toan bo danh sach tu danh sach san pham"products" trong LocalStorage len */
        var DSSP = LayDanhSachSanPham();
        for ( var i = 0 ; i < DSSP.length ; i++){
            if (DSSP[i].id == IDsanpham)
            {
                SanPham = DSSP[i];
                break;
            }
        }
    
        console.log(SanPham)
        
        SanPham = KhoiTaoSanPham(SanPham.image, SanPham.kind, SanPham.name, SanPham.price, SanPham.id, SanPham.ram, SanPham.ssd, SanPham.card, SanPham.description)
    
        return SanPham;
    }
    
function TinhTongTien(){
    var Sum = 0;
    var DSGH = layDanhSachItemGH();
    for ( var i = 0 ; i <DSGH.length ; i++ ){
        var SanPham = LayItemTheoID(DSGH[i].idSP)
        Sum += SanPham.price * DSGH[i].sl;
    }

    return Sum;
}    

function UpdateQuantity(idSP, change) {
   
    var DSGH = layDanhSachItemGH()
    var item = DSGH.find(item => item.idSP === idSP);
    if (!item) return;

    // Tăng/giảm số lượng
    item.sl = Math.max(1, item.sl + change); // Không cho phép số lượng nhỏ hơn 1

    localStorage.setItem('DSGH', JSON.stringify(DSGH));
    DivGioHang()
   
}


/*Chuyen 1 doi tuong item gio hang thanh HTML
    input : doi tuong item gio hang
    output : doan HTML
*/
function ChuyenItemGioHangThanhHTML (itemGH){
    var SanPham = LayItemTheoID(itemGH.idSP)
    console.log(SanPham)

        var html = 
'                    <div class="Cart_PB_Box"> \n'+
'                        <div>\n'+
'                            <p>' + SanPham.name+ '</p>\n'+
'                        </div>\n'+
'\n'+
'                        <div class ="Cart_product_img">\n'+
'                            <img src = "'+ SanPham.image+'">\n'+
'                        </div>\n'+
'\n'+
'                        <div>\n'+
'                            <p>'+ PriceToString(SanPham.price) +'</p>\n'+
'                        </div>\n'+
'\n'+
'                            <div class="quantity_control">\n'+
'                                <button onclick="UpdateQuantity('+ itemGH.idSP +', -1)"> - </button>\n'+
'                                <input type="text" value="'+ itemGH.sl +'" readonly id="quantity_'+ itemGH.idSP +'">\n'+
'                                <button onclick="UpdateQuantity('+ itemGH.idSP +', 1)"> + </button>\n'+
'                            </div>\n'+
'\n'+
'                        <div>\n'+
'                            <p>'+ PriceToString(SanPham.price * itemGH.sl) +'</p>\n'+
'                        </div>\n'+
'\n'+
'                        <div class="Cart_product_delete">\n'+
'                            <i class="fa-solid fa-trash" onclick="XoaItemGH('+ itemGH.idSP+')"></i>\n'+
'                        </div>\n'+
'                    </div>    \n';

    return html;
}


/*Chuyen 1 danh sach (array) thanh HTML 
    input : 1 danh sach item gio hang 
    output : 1 doan HTML
*/
function ChuyenDanhSachGioHangThanhHTML (DanhSachItemGH){
    var html_Tong = ''
    for ( var i = 0 ; i < DanhSachItemGH.length ; i++)
        html_Tong += ChuyenItemGioHangThanhHTML(DanhSachItemGH[i]);

    return html_Tong;
}


function HienThiDanhSachItemGH(){
    /*B1 : Lay danh sach tu local storage */
    var DSGioHang = layDanhSachItemGH();

    /*B2 : Chuyen doi danh sach thanh 1 doan HTML */
    var html = ChuyenDanhSachGioHangThanhHTML(DSGioHang);

    return html;

}



//Xoa item trong gio hang */

function XoaItemGH(ItemID){
    alert("ID là " + ItemID)
    var DSGioHang = layDanhSachItemGH();
    DSGioHang = DSGioHang.filter(function (item) {
        return String(item.idSP) !== String(ItemID); 
    });
    

    LuuDSGHvaoLocalStorage(DSGioHang);
    DivGioHang();
}

function CheckVouncher(){
    var NodeVouncher = document.getElementById('Cart_vouncher')
    var NodeVouncher_warning_1 = document.getElementById('Vouncher_warning_1');
    var NodeVouncher_warning_2 = document.getElementById('Vouncher_warning_2');
    var discount = 0;
    if (NodeVouncher.value == ' ')
        discount = 0;

    if (NodeVouncher.value == 'HSSV')
    {
        NodeVouncher_warning_2.style.display = 'block';
        NodeVouncher_warning_1.style.display = 'none';
        discount= -500000
    }

    else {
        NodeVouncher_warning_1.style.display = 'block';
        NodeVouncher_warning_2.style.display = 'none';
        discount = 0;
    }
    document.querySelector('.discount_fee span:last-child').textContent = PriceToString(discount);
    if (TinhTongTien() + discount > 0)
        document.querySelector('.final_fee_number').textContent = PriceToString(TinhTongTien() + discount); 

    return discount;

}









function Cart_container(){
    var html = '<div class="Cart_container">\n'+
'                   <div class="Cart_Details_Box Cart_products_details">\n'+
'\n'+
'                       <div class="Cart_PB_Header">\n'+
'                        <h2> Giỏ hàng </h2>\n'+
'                        <a href = "indexLogin.html"> Thoát </a> </h2>\n'+
'                       </div>\n'+
'\n'+
'                       <div class="Cart_PB_Box Cart_PB_Box_Title"> \n'+
'                           <div>\n'+
'                               <p>Tên sản phẩm</p>\n'+
'                           </div>\n'+
'\n'+
'                           <div>\n'+
'                               <p>Hình ảnh</p>\n'+
'                           </div>\n'+
'\n'+
'                           <div>\n'+
'                               <p>Giá tiền</p>\n'+
'                           </div>\n'+
'\n'+
'                           <div>\n'+
'                               <p>Số lượng</p>\n'+
'                           </div>\n'+
'\n'+
'                           <div>\n'+
'                                <p>Tổng</p>\n'+
'                           </div>\n'+
'\n'+
'                           <div>\n'+
'                               <p>Xóa<p>\n'+
'                           </div>\n'+
'                       </div>    \n'+
 HienThiDanhSachItemGH() +  '</div>\n'+
'\n'+
'                <div class="Cart_Details_Box Cart_user_details">\n'+
'                    <div class="Cart_total">\n'+
'                        <h3>Total</h3>\n'+
'                        <div class="Total_info">\n'+
'                            <div class="previous_fee">\n'+
'                                <span>Tổng tiền</span>\n'+
'                                <span>'+ PriceToString(TinhTongTien()) +'</span>\n'+
'                            </div>\n'+
'\n'+
'                            <div class="delivery_fee">\n'+
'                                <span>Phí vận chuyển</span>\n'+
'                                <span class="delivery_fee_number"> Free </span>\n'+
'                            </div>\n'+
'\n'+
'\n'+
'                            <div class="final_fee">\n'+
'                                <span class="final_fee_title">Thanh toán</span>\n'+
'                                <span class="final_fee_number">'+PriceToString(TinhTongTien())+'</span>\n'+
'                            </div>\n'+
'                        </div>\n'+
'                    </div>\n'+
'                    \n'+
'                    <div class="Offer_btn">\n'+
'                        <button class="btn_Cart btn_Cart_offer" onclick="Cart_confirm_1()">Xác nhận</button>\n'+       //Them button onclick o day
// '                        <button class="btn_Cart btn_Cart_offer" onclick="thanhtoan()">Thanh toán</button>\n'+       //Them button onclick o day 
'                    </div>\n'+
'                </div>\n'+
'            </div>';

    return html;
}

var NodeCartModal = document.getElementById('Cart_Modal')
function Cart_confirm_1(){
    NodeCartModal.style.display ='flex'
}


var NodeContainer = document.getElementById('container')

function DivGioHang(){
    NodeContainer.innerHTML = Cart_container();

}



var NodeModalCart = document.getElementById('Modal_Cart_details')
var NodeModalInner = document.getElementById('Modal_Cart_details__inner')

function DivThongTinThanhToan(){
    

    NodeModalFix.style.display = 'flex';
    NodeModalInner.innerHTML = '       ';
}

function getProductById(productId) {
    // Lấy danh sách sản phẩm từ Local Storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Tìm sản phẩm theo id
    const product = products.find(item => parseInt(item.id) === productId);

    // Trả về sản phẩm nếu tìm thấy, hoặc null nếu không
    return product || null;
}

function Check_UserDetails() {
    var customerName = document.getElementById('customer_name').value;
    var customerPhone = document.getElementById('customer_phone').value;
    var customerAddress = document.getElementById('customer_address').value;
    var customerDistrict = document.getElementById('customer_district').value;
    var customerWard = document.getElementById('customer_ward').value;

    var nameRegex = /^[A-Za-zÀ-ỹ\s-]+$/; 
    var numberRegex = /^[0-9]+$/;       
    var addressRegex = /^[0-9/]+[A-Za-z]?\s[A-Za-zÀ-ỹ\s]+$/; 
    var CityRegex = /^[A-Za-zÀ-ỹ\s.]+$/;
    var LettersRegex = /^[A-Za-zÀ-ỹ\s]+$/;

    // Kiểm tra Họ và Tên
    if (!customerName) {
        document.getElementById('customer_warning_name_1').style.display = "block";
        document.getElementById('customer_warning_name_2').style.display = "none";
        document.getElementById('customer_warning_name_3').style.display = "none";
        document.getElementById('customer_name').focus();
        return false;
    }
    if (customerName.split(' ').join('').length < 4) {
        document.getElementById('customer_warning_name_1').style.display = "none";
        document.getElementById('customer_warning_name_2').style.display = "block";
        document.getElementById('customer_warning_name_3').style.display = "none";
        document.getElementById('customer_name').focus();
        return false;
    }
    if (!customerName.match(nameRegex)) {
        document.getElementById('customer_warning_name_1').style.display = "none";
        document.getElementById('customer_warning_name_2').style.display = "none";
        document.getElementById('customer_warning_name_3').style.display = "block";
        document.getElementById('customer_name').focus();
        return false;
    }
    document.getElementById('customer_warning_name_1').style.display = "none";
    document.getElementById('customer_warning_name_2').style.display = "none";
    document.getElementById('customer_warning_name_3').style.display = "none";

    // Kiểm tra Số điện thoại
    if (!customerPhone) {
        document.getElementById('customer_warning_phone_1').style.display = "block";
        document.getElementById('customer_warning_phone_2').style.display = "none";
        document.getElementById('customer_phone').focus();
        return false;
    }
    if (customerPhone.length < 7 || customerPhone.length > 11 || !customerPhone.match(numberRegex)) {
        document.getElementById('customer_warning_phone_1').style.display = "none";
        document.getElementById('customer_warning_phone_2').style.display = "block";
        document.getElementById('customer_phone').focus();
        return false;
    }
    document.getElementById('customer_warning_phone_1').style.display = "none";
    document.getElementById('customer_warning_phone_2').style.display = "none";

    // Kiểm tra Địa chỉ
    if (!customerAddress) {
        document.getElementById('customer_warning_address_1').style.display = "block";
        document.getElementById('customer_warning_address_2').style.display = "none";
        document.getElementById('customer_address').focus();
        return false;
    }
    if (!customerAddress.match(addressRegex)) {
        document.getElementById('customer_warning_address_1').style.display = "none";
        document.getElementById('customer_warning_address_2').style.display = "block";
        document.getElementById('customer_address').focus();
        return false;
    }
    document.getElementById('customer_warning_address_1').style.display = "none";
    document.getElementById('customer_warning_address_2').style.display = "none";

   

    // Kiểm tra Quận
    if (!customerDistrict) {
        document.getElementById('customer_warning_district_1').style.display = "block";
        document.getElementById('customer_warning_district_2').style.display = "none";
        document.getElementById('customer_district').focus();
        return false;
    }
    if (!customerDistrict.match(LettersRegex) && !customerDistrict.match(numberRegex) ) {
        document.getElementById('customer_warning_district_1').style.display = "none";
        document.getElementById('customer_warning_district_2').style.display = "block";
        document.getElementById('customer_district').focus();
        return false;
    }
    document.getElementById('customer_warning_district_1').style.display = "none";
    document.getElementById('customer_warning_district_2').style.display = "none";

    // Kiểm tra Phường
    if (!customerWard) {
        document.getElementById('customer_warning_ward_1').style.display = "block";
        document.getElementById('customer_warning_ward_2').style.display = "none";
        document.getElementById('customer_ward').focus();
        return false;
    }
    if (!customerWard.match(LettersRegex) && !customerWard.match(numberRegex) ) {
        document.getElementById('customer_warning_ward_1').style.display = "none";
        document.getElementById('customer_warning_ward_2').style.display = "block";
        document.getElementById('customer_ward').focus();
        return false;
    }
    document.getElementById('customer_warning_ward_1').style.display = "none";
    document.getElementById('customer_warning_ward_2').style.display = "none";

    if (checkPaymentMethod() == 0 )
        document.getElementById('customer_warning_payment').style.display = "block";
    else
        document.getElementById('customer_warning_payment').style.display = "none";

    if (checkPaymentMethod() == 2 ){
        var CardName = document.getElementById('card_name').value
        var CardNumber = document.getElementById('card_number').value
        var CardDate = document.getElementById('expiry_date').value
        var CardCVV = document.getElementById('cvv').value

        var cardNumberRegex = /^[0-9]{16}$/;
        var cardNameRegex = /^[A-Za-z\s-]+$/;
        var cardDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        var cvvRegex = /^[0-9]{3,4}$/;


        //Kiểm tra số thẻ
        if (!CardNumber) {
            document.getElementById('card_number_warning_2').style.display = 'none';
            document.getElementById('card_number_warning_1').style.display ='block';
            document.getElementById('card_number').focus();
            return false;
        }

        else if (!CardNumber.match(cardNumberRegex)){
            document.getElementById('card_number_warning_1').style.display ='none';
            document.getElementById('card_number_warning_2').style.display ='block';
            document.getElementById('card_number').focus();
            return false;
        }

        else {
            document.getElementById('card_number_warning_1').style.display ='none';
            document.getElementById('card_number_warning_2').style.display ='none';
        }

        //Kiểm tra tên chủ thẻ
        if (!CardName) {
            document.getElementById('card_name_warning_2').style.display = 'none';
            document.getElementById('card_name_warning_1').style.display ='block';
            document.getElementById('card_name').focus();
            return false;
        }

        else if (!CardName.match(cardNameRegex)){
            document.getElementById('card_name_warning_1').style.display ='none';
            document.getElementById('card_name_warning_2').style.display ='block';
            document.getElementById('card_name').focus();
            return false;
        }

        else {
            document.getElementById('card_name_warning_1').style.display ='none';
            document.getElementById('card_name_warning_2').style.display ='none';
        }

        //Kiểm tra ngày hết hạn thẻ
        if (!CardDate) {
            document.getElementById('card_date_warning_2').style.display = 'none';
            document.getElementById('card_date_warning_1').style.display ='block';
            document.getElementById('card_date').focus();
            return false;
        }

        else if (!CardDate.match(cardDateRegex)){
            document.getElementById('card_date_warning_1').style.display ='none';
            document.getElementById('card_date_warning_2').style.display ='block';
            document.getElementById('card_date').focus();
            return false;
        }

        else {
            document.getElementById('card_date_warning_1').style.display ='none';
            document.getElementById('card_date_warning_2').style.display ='none';
        }

         //Kiểm tra CVV thẻ
         if (!CardCVV) {
            document.getElementById('card_cvv_warning_2').style.display = 'none';
            document.getElementById('card_cvv_warning_1').style.display ='block';
            document.getElementById('card_cvv').focus();
            return false;
        }

        else if (!CardCVV.match(cvvRegex)){
            document.getElementById('card_cvv_warning_1').style.display ='none';
            document.getElementById('card_cvv_warning_2').style.display ='block';
            document.getElementById('card_cvv').focus();
            return false;
        }

        else {
            document.getElementById('card_cvv_warning_1').style.display ='none';
            document.getElementById('card_cvv_warning_2').style.display ='none';
        }
    }

    return true; 
}

// Kiểm tra phương thức thanh toán nào được chọn
function checkPaymentMethod() {
    const cashPayment = document.getElementById('cash_payment');
    const transferPayment = document.getElementById('transfer_payment');
    const cardPayment = document.getElementById('card_payment');

    // Tiền mặt và chuyển khoản
    if (cashPayment.checked || transferPayment.checked) {
        return 1;
    } 
    
    // Thẻ tín dụng
    else if (cardPayment.checked) {
        return 2;
    } 

    //Chưa chọn
    else {
        return 0;
    }

}

var NodeCart_ModalBody = document.getElementById('Cart_Modal_Body')

function PrintPaymentForm() {
    // Lấy các radio button
    const cardPayment = document.getElementById('card_payment');
    const paymentForm = document.getElementById('payment_gateway');

    // Kiểm tra nếu chọn "Thanh toán qua thẻ"
    if (cardPayment.checked) {
        paymentForm.style.display = "block"; 
        NodeCart_ModalBody.style.overflowY ='auto'
    } 
    else {
        paymentForm.style.display = "none"; 
        NodeCart_ModalBody.style.overflowY ='none'
    }
}

function CheckPaymentCard(){

}

function Cart_Confirm_Details(){
    if ( !Check_UserDetails())
        return false;

    
    
}












function thanhtoan() {
    const user = JSON.parse(localStorage.getItem('userlogin'));
    const cart = JSON.parse(localStorage.getItem('DSGH')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (!user) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
        window.location.href = "/login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm!");
        return;
    }
    const orderDetails = [];

    cart.map(item => {
        const product = getProductById(item.idSP);
        console.log(product);
        const orderDetail = {
            productId: product.id,
            productName: product.name,
            quantity: item.sl,
            totalPrice: product.price * item.sl
        };
        orderDetails.push(orderDetail);
    });
    const order = {
        orderId: orders.length + 1,
        userId: user.id,
        fullname: user.fullname,
        status: "Chưa xử lý", 
        createdAt: new Date().toISOString(),
        orderDetails: orderDetails,
        totalAmount: orderDetails.map(item => item.totalPrice).reduce((a, b) => a + b, 0)
    };
    localStorage.setItem('orders', JSON.stringify([...orders, order]));
}


