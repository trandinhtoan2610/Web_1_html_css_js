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
'                        <button class="btn_Cart btn_Cart_offer" >Thanh toán</button>\n'+       //Them button onclick o day 
'                    </div>\n'+
'                </div>\n'+
'            </div>';

    return html;
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
function LoadLocation() {

    const districtSelect = document.getElementById('district');
    const wardSelect = document.getElementById('ward')
    for (var i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        const option_ward = document.createElement('option');
        option.value = i;
        option_ward.value = i;
        option.textContent = 'Quận '+i+'';
        option_ward.textContent= 'Phường '+i+'';
        districtSelect.appendChild(option);
        wardSelect.append(option_ward);
    }
}

LoadLocation()