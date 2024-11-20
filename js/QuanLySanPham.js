var DSSP_json = localStorage.getItem('products')
var DSSP = JSON.parse(DSSP_json)

if (DSSP == null)
{
    DSSP = new Array();
}

if (!localStorage.getItem('countID')) {
    localStorage.setItem('countID', 1); 
}
var ProductsPerPage = 10;

function KhoiTaoSanPham(hinh, brand, ten, gia, vitri, id, ram, ssd, card, MoTa){
    SanPham = new Object();
    SanPham.image = hinh;
    SanPham.kind = brand;
    SanPham.name = ten;
    SanPham.price = gia;
    SanPham.location = vitri;
    SanPham.id = id;
    SanPham.ram = ram;
    SanPham.ssd = ssd;
    SanPham.card = card;
    SanPham.description = MoTa;
    return SanPham;
}

//Function them san pham vao local storage.
function TaoSanPham (){
    var countID = parseInt(localStorage.getItem('countID'), 10);

    var NodeHinhAnh = document.getElementById("hinhAnh")
    var NodeBrand = document.getElementById('kind')
    var NodeTen = document.getElementById('name')
    var NodeGiaTien = document.getElementById('price')
    var NodeViTri = document.getElementById('location')
    var NodeRam = document.getElementById('ram')
    var NodeSSD = document.getElementById('ssd')
    var NodeCard = document.getElementById('card')
    var NodeMoTa = document.getElementById('description')

    /*Kiểm tra tính hợp lý */
    if (NodeHinhAnh.files.length === 0) {
        document.getElementById('AP_IMG_Warning').style.display ='block';
        return false;
    }
    else
        document.getElementById('AP_IMG_Warning').style.display ='none';

    if (NodeTen.value == ''){
        document.getElementById('AP_NAME_Warning').style.display ='block';
        NodeTen.focus()
        return false
    }
    else{
        document.getElementById('AP_NAME_Warning').style.display ='none';
    }

    if (NodeGiaTien.value == ''){
        document.getElementById('AP_PRICE1_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE1_Warning').style.display ='none';

    
    if (NodeGiaTien.value < 9000000){
        document.getElementById('AP_PRICE2_Warning').style.display ='block';
        NodeGiaTien.focus()
        return false
    }
    else
        document.getElementById('AP_PRICE2_Warning').style.display ='none';
    

    if (NodeViTri.value == ''){
        document.getElementById('AP_LOCATION_Warning').style.display ='block';
        NodeViTri.focus()
        return false
    }
    else
        document.getElementById('AP_LOCATION_Warning').style.display ='none';


    if (NodeRam.value == ''){
        document.getElementById('AP_RAM_Warning').style.display ='block';
        NodeRam.focus()
        return false
    }
    else
        document.getElementById('AP_RAM_Warning').style.display ='none';

    if (NodeSSD.value == ''){
        document.getElementById('AP_SSD_Warning').style.display ='block';
        NodeSSD.focus()
        return false
    }
    else
        document.getElementById('AP_RAM_Warning').style.display ='none';

    if (NodeCard.value == ''){
        document.getElementById('AP_CARD_Warning').style.display ='block';
        NodeCard.focus()
        return false
    }
    else
        document.getElementById('AP_CARD_Warning').style.display ='none';

    if (NodeMoTa.value == ''){
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='block';
        NodeMoTa.focus()
        return false
    }
    else
        document.getElementById('AP_DESCRIPTION_Warning').style.display ='none';



    var Brand = NodeBrand.value
    var Ten = NodeTen.value
    var GiaTien = NodeGiaTien.value
    var ViTri = NodeViTri.value

    var NodeID = document.getElementById('id')
    var ID = NodeID.value
    NodeID.value = countID+1;

    var Ram = NodeRam.value
    var SSD = NodeSSD.value
    var Card = NodeCard.value
    var MoTa = NodeMoTa.value
  

    const fr = new FileReader();
    var HinhAnh
    fr.readAsDataURL(NodeHinhAnh.files[0]) 
    fr.addEventListener('load', () => {
        const url = fr.result
        HinhAnh = url
        console.log(url);

        var SanPham = KhoiTaoSanPham(HinhAnh,Brand,Ten,GiaTien,ViTri,ID,Ram,SSD,Card,MoTa)
        DSSP.push(SanPham);
        console.log(DSSP)


        /*Chuyen array DSSP thanh JSON roi them vao localStorage */
        var JSON_DSSP = JSON.stringify(DSSP)
        localStorage.setItem('products',JSON_DSSP)
        localStorage.setItem('countID', countID + 1); // Tăng countID và lưu lại

    
        alert("Thêm sản phẩm thành công")
     
        NodeBrand.value = 'Acer';
        NodeTen.value = '';
        NodeGiaTien.value = '';
        NodeViTri.value = '';
        NodeRam.value = '';
        NodeSSD.value = '';
        NodeCard.value = '';
        NodeMoTa.value = '';
        NodeHinhAnh.value = ''; 

    });
    
}


//*PHAN CHINH CUA TRANG
NodeContainer = document.getElementById('container')
console.log(NodeContainer)

NodeContainer.innerHTML = Products_container()


//Các hàm chứa html : //
//<------------------------------------------------------------------ //
function Products_container (){
    return '    <!--phan loai theo hang san pham-->\n'+
    '            <div class="brand-list">\n'+
    '                <a href="indexAdmin.html?brand=Acer"><img src="../img/acer.png" alt="acer"></a>\n'+
    '                <a href="indexAdmin.html?brand=Lenovo"><img src="../img/lenovo.png" alt="lenovo"></a>\n'+
    '            </div>\n'+
    '            <!--List cac san pham-->\n'+
    '            <section class="product-one"> <!--section product list-->\n'+
    '				<h2>Các sản phẩm nổi bật</h2>\n'+
    '				<div id="product-list" class="product-row"> </div>	<!-- Sản Phẩm-->		\n'+
    '				<div id="product-info" class="modal" style="display: none;"><!--Chi Tiết Sản Phẩm-->\n'+
    '					<div id="info">\n'+
    '						<button type="button" id="close" onclick="closeProductInfo()">x</button>\n'+
    '						<div class="left">\n'+
    '							<img id="productImg">\n'+
    '						</div>\n'+
    '						<div class="right">\n'+
    '							<h2 id="productName"></h2>\n'+
    '							<h4 id="productPrice"></h4>\n'+
    '							<h4 id="productRam"></h4>\n'+
    '							<h4 id="productSSD"></h4>\n'+
    '							<h4 id="productCard"></h4>\n'+
    '							<h4 id="productLocation"></h4>\n'+
    '							<h6 id="productDescription"></h6>\n'+
    '							<button class="addtoCart" id="color-Cart">Thêm vào giỏ hàng</button>\n'+
    '						</div>\n'+
    '					</div>\n'+
    '				</div>\n'+
    '			</section>\n'+
    '            <!--phan trang-->\n'+
    '            <div id="pagination">\n'+
    '				<button>&lt;</button>\n'+
    '				<button class="active">1</button>\n'+
    '				<button>2</button>\n'+
    '				<button>3</button>\n'+
    '				<button>&gt;</button>\n'+
    '			</div>\n'+
    '        </div>';
}

function SettingProducts_Container(){
    var countID = parseInt(localStorage.getItem('countID'), 10);

    return '<div class="Modal__AddProducts">\n'+
'                <div class="AddProducts__Header">\n'+
'                    <ul class="AP_HeaderList">\n'+
'                        <li>Thêm sản phẩm</li>\n'+
'                        <li><a href="indexAdmin.html" id="Thoat_TaoSP">Trở lại</a></li>\n'+
'                    </ul>\n'+
'                </div>\n'+
'                <div class="AP_main">\n'+
'                    <div>\n'+
'                        <label for="hinhAnh">Hình ảnh</label>\n'+
'                        <input type="file" id="hinhAnh" accept="image/*" />\n'+
'                        <p class="AP_Warning" id = "AP_IMG_Warning">*Hình ảnh không được để trống</p>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="kind">Hãng máy</label>\n'+
'                        <select id="kind">\n'+
'                            <option>Acer</option>\n'+
'                            <option>Lenovo</option>\n'+
'                            <option>MSI</option>\n'+
'                        </select>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="name">Tên sản phẩm</label>\n'+
'                        <input type="text" id="name">\n'+
'                        <p class="AP_Warning" id = "AP_NAME_Warning">*Tên sản phẩm không được để trống</p>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="price">Giá tiền</label>\n'+
'                        <input type="number" id="price">\n'+
'                        <p class="AP_Warning" id = "AP_PRICE1_Warning" >*Giá tiền phẩm không được để trống</p>\n'+
'                        <p class="AP_Warning" id = "AP_PRICE2_Warning">*Giá tiền sản phẩm phải trên 9.000.000đ</p>\n'+
'                    </div>\n'+
'                    <div class="ChiTietSP">\n'+
'                        <div>\n'+
'                            <label for="location">Vị trí</label>\n'+
'                            <input type="text" id="location">\n'+
'                            <p class="AP_Warning" id = "AP_LOCATION_Warning">*Vị trí không được để trống</p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="id">ID</label>\n'+
'                            <input type="text" id="id" value="'+ countID+'" readonly>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="ram">Ram</label>\n'+
'                            <input type="text" id="ram">\n'+
'                            <p class="AP_Warning" id = "AP_RAM_Warning" >*Ram không được để trống </p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="ssd">SSD</label>\n'+
'                            <input type="text" id="ssd">\n'+
'                            <p class="AP_Warning" id = "AP_SSD_Warning">*SSD không được để trống</p>\n'+
'                        </div>\n'+
'                        <div>\n'+
'                            <label for="card">Card</label>\n'+
'                            <input type="text" id="card">\n'+
'                            <p class="AP_Warning" id = "AP_CARD_Warning">*card không được để trống</p>\n'+
'                        </div>\n'+
'                    </div>\n'+
'                    <div>\n'+
'                        <label for="description">Mô tả</label>\n'+
'                        <input type="text" id="description">\n'+
'                         <p class="AP_Warning" id = "AP_DESCRIPTION_Warning">*Mô tả không được để trống</p>\n'+
'                    </div>\n'+
'                    <div class="AP_Button_Div">\n'+
'                        <button class="AP_button" onclick="return TaoSanPham()">Thêm sản phẩm</button>\n'+
'                    </div>\n'+
'                </div>\n'+
'            </div>';

}

function FixProducts_Container(){
    return '<div class="FixProducts_Header">\n'+          //Phan nay hien thi truc tiep
'                <ul class="AP_HeaderList">\n'+
'                    <li>Sửa sản phẩm</li>\n'+
'                    <li><a href="indexAdmin.html" id="Thoat_TaoSP">Trở lại</a></li>\n'+
'                </ul>\n'+
'            </div>\n'+
'\n'+        //Phan nay duoc load tu javascript
'            <div class = "Modal_FixProducts" id = "FixProducts_Main">\n'+
'                \n'+
'            </div>\n'+
'\n'+
'            <div class="FixProducts_Footer" id = "FixProducts__Footer">\n'+
'                <div class="FixProduct_Paging">\n'+
'                     <a href ="#" class="FixProduct_page" id = "FixProduct_page_1" onclick="Fix_Page_1()"> 1 </a></li>\n'+
'                     <a href ="#" class="FixProduct_page" id = "FixProduct_page_2" onclick="Fix_Page_2()"> 2 </a></li>\n'+
'                </div>\n'+
'            </div>';
}


//------------------------> //


//Các hàm hiển thị : 
//<---------------------------------------------------------------------    //
function DivThemSanPham(){
   NodeContainer.innerHTML =  SettingProducts_Container()
}

var NodeFixMain, NodeFixFooter, NodeBtn_1, NodeBtn_2;

function DivSuaSanPham() {
    NodeContainer.innerHTML = FixProducts_Container(); // Chèn HTML động vào container

    // Lấy lại các phần tử sau khi HTML đã được chèn vào DOM
    NodeFixMain = document.getElementById('FixProducts_Main');
    NodeFixFooter = document.getElementById('FixProducts__Footer');
    NodeBtn_1 = document.getElementById('FixProduct_page_1');
    NodeBtn_2 = document.getElementById('FixProduct_page_2');

    if (!NodeFixMain || !NodeFixFooter) {
        console.error("NodeFixMain hoặc NodeFixFooter không tồn tại sau khi chèn HTML!");
        return;
    }

    TrangSanPham(); // Gọi hàm hiển thị sản phẩm và phân trang
}

// -------------------------------------------------> //



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


function ChuyenSanPhamSangHTML (SanPham){
    var html = '<div class = "Products_box">\n'+
'                    <div class="FixProduct_id">\n'+
'                        <span> '+ SanPham.id + ' </span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_img">\n'+
'                        <img src=" '+ SanPham.image + '">\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_name">\n'+
'                        <p>'+ SanPham.name + '</p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_brand">\n'+
'                        <p>'+ SanPham.kind + '</p>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="FixProduct_price">\n'+
'                        <span> '+ PriceToString(SanPham.price) + '</span>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="ChiTiet FixProduct_ram"> <span> '+ SanPham.ram + ' </span> </div>\n'+
'                    <div class="ChiTiet FixProduct_ssd"> <span> '+ SanPham.ssd + '</span> </div>\n'+
'                    <div class="ChiTiet FixProduct_card"> <span> '+ SanPham.card + '</span> </div>\n'+
'                    <div class="ChiTiet FixProduct_location"> <span> '+ SanPham.location+ '</span> </div>\n'+
'                    \n'+
'                    <div class="Hanh-Dong">\n'+
'                        <i class="fa-solid fa-wrench"> </i>\n'+
'                    </div>\n'+
'\n'+
'                    <div class="Hanh-Dong" onclick = "XoaSanPham('+SanPham.id +')">\n'+
'                        <i class="fa-solid fa-trash"> </i>\n'+
'                    </div>\n'+
'                </div>';
    
    return html;
}


function ChuyenDanhSachThanhHTML (DSSP, page ){
    var html = ''
    var StartIndex = (page-1)*ProductsPerPage;
    var EndIndex = Math.min(StartIndex + ProductsPerPage, DSSP.length);

    for (var i = StartIndex ; i < EndIndex ; i++ )
        html += ChuyenSanPhamSangHTML(DSSP[i]);

    return html
}



//Trang 1
function Fix_Page_1(){
    NodeBtn_1.classList.add('active');
    NodeBtn_2.classList.remove('active');
    var html = ChuyenDanhSachThanhHTML(DSSP,1)
    NodeFixMain.innerHTML = html;
}

//Trang 2
function Fix_Page_2(){
    NodeBtn_2.classList.add('active');
    NodeBtn_1.classList.remove('active')
    var html = ChuyenDanhSachThanhHTML(DSSP,2)
    NodeFixMain.innerHTML = html;
}


//Hien thị lựa chọn trang nếu trong danh sách có hơn 10 phần tử. Nếu không thì ẩn.

function TrangSanPham() {
    if (DSSP.length <= 10) {
        NodeFixFooter.style.display = 'none'; // Ẩn footer
        // Hiển thị tất cả sản phẩm trong 1 trang
        NodeFixMain.innerHTML = ChuyenDanhSachThanhHTML(DSSP, 1);
    } else {
        NodeFixFooter.style.display = 'flex'; // Hiển thị footer nếu có nhiều hơn 10 sản phẩm
        Fix_Page_1(); // Chuyển về trang 1
    }
}

function XoaSanPham(idSanPham){
    if (confirm("Bạn muốn xóa sản phẩm?")== false)
        return
    else
    {
        DSSP = DSSP.filter(function(item){
            return String(item.id) !== String(idSanPham);
        });

        var DSSP_JSON = JSON.stringify(DSSP);
        localStorage.setItem('products',DSSP_JSON);
    }
    if (idSanPham > 10 )
        Fix_Page_2()
    else
        Fix_Page_1()
}


