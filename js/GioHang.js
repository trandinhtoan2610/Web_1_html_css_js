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


function ThemVaoGioHang(product) {
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


/*Chuyen 1 doi tuong item gio hang thanh HTML
    input : doi tuong item gio hang
    output : doan HTML
*/

function ChuyenItemGioHangThanhHTML (itemGH){
    var SanPham = LayItemTheoID(itemGH.idSP)
    console.log(SanPham)

    var html = ''
    html = '<div class="item-gio-hang">\n'+
'                        <div class="hinhAnh-itemGH">\n'+
'                            <img src = "'+ SanPham.image + '">\n'+
'                        </div>\n'+
'                        \n'+
'                        <div class="ten_itemGH"><p> '+ SanPham.name + ' </p></div>\n'+
'\n'+
'                        <div> <span>'+ SanPham.price + '</span> </div>\n'+
'                        <div> <input type="number" class="so-luong" value="'+itemGH.sl + '"></div>\n'+
'\n'+
'                        <div class="hanh_dong">\n'+
'                            <i class="fa-solid fa-trash" onclick = "XoaItemGH('+ itemGH.idSP+')"></i>\n'+
'                        </div>\n'+
'                    </div>';
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

    /*B3 : Truy cap vao node HTML de hien thi */
    var NodeGioHang = document.getElementById('gio-hang')
    NodeGioHang.innerHTML = '<div class="item-gio-hang">\n'+
'                        <div class="DanhMuc">\n'+
'                            Hình ảnh \n'+
'                        </div>\n'+
'                        \n'+
'                        <div class="DanhMuc"><p> Tên sản phẩm</p></div>\n'+
'\n'+
'                        <div class="DanhMuc"> <span>Giá tiền</span> </div>\n'+
'                        <div class="DanhMuc"> <p> Số lượng </p></div>\n'+
'\n'+
'                        <div class="DanhMuc">\n'+
'                            <p>Thao tác</p>\n'+
'                        </div>\n'+
'                    </div>' + html;

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



//On / off gio hang // 
var NodeModal2 = document.getElementById('Modal_2')

function Close_Cart(){
    NodeModal2.style.display = 'none';
}


function GoToCart () {
    NodeModal2.style.display = 'flex';
}


HienThiDanhSachItemGH()



//Xoa item trong gio hang */

function XoaItemGH(ItemID){
    alert("ID là " + ItemID)
    var DSGioHang = layDanhSachItemGH();
    DSGioHang = DSGioHang.filter(function (item) {
        return String(item.idSP) !== String(ItemID); 
    });
    

    LuuDSGHvaoLocalStorage(DSGioHang);
    HienThiDanhSachItemGH()

}
