const products = [
    {
        id: 1,
        name: "Laptop Acer Aspire 3 A315 44P R9W8 ",
        price: "13990000",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 3060Ti 8GB",
        location: "TP.HCM",
        kind: "Acer",
        image: "../img/lap1.png",
        description: [
            "Thiết kế mỏng nhẹ, năng động nhưng không kém phần sang trọng",
            "CPU Intel Core i5 11400H mạnh mẽ, chạy mượt mọi tác vụ học tập và văn phòng",
            "RAM DDR4 16GB đa nhiệm tốt, mở nhiều Tab khi làm việc mà không bị giật, lag",
            "Ổ cứng SSD 512GB lưu trữ nhiều dữ liệu, khởi động máy và ứng dụng nhanh",
            "Tích hợp card Intel Iris Xe Graphics, phục vụ ổn định các tác vụ làm việc đồ họa",
            "Thời lượng pin tốt, công nghệ sạc nhanh cho phép bạn làm việc cả ngày"
        ]
    },
    {
        id: 2,
        name: "Acer Aspire 5 A514 56P 742F i7 1355U (NX.KHRSV.005)",
        price: "9990000",
        ram: "8GB",
        ssd: "512GB",
        card: "GTX 3060Ti 6GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap2.png",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 3,
        name: "Acer Swift Go SFG14 71 513F i5 13500H (NX.KPZSV.003)",
        price: "16590000",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap3.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 4,
        name: "Acer Gaming Aspire 5 A515 58GM 51LB i5 13420H",
        price: "16490000",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap4.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 5,
        name: "Acer Gaming Nitro AN515 58 773Y i7 12700H",
        price: "22.990.000đ",
        ram: "16GB",
        ssd: "1TB",
        card: "GTX 4060 8GB",
        location: "Hà Nội",
        kind: "Acer",
        image: "../img/lap5.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 6,
        name: "Lenovo Gaming Legion Pro 5 16IRX9 i9 14900HX",
        price: "47.990.000đ",
        ram: "32GB",
        ssd: "2TB",
        card: "GTX 4080Ti 12GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap6.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 7,
        name: "Lenovo ThinkBook 14 Ultra 7 155U",
        price: "26.990.000đ",
        ram: "32GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap7.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 8,
        name: "Lenovo V15 G4 IRU i5 1335U (83A1000LVN)",
        price: "15.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 3050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap8.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 9,
        name: "Lenovo Ideapad Slim 5 14IAH8 i5 12450H",
        price: "16.790.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 6GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap9.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 10,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 11,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 12,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 13,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 14,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 15,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },
    {
        id: 16,
        name: "Lenovo Ideapad Slim 3 15IRH8 i7 13620H (83EM003FVN)",
        price: "18.990.000đ",
        ram: "16GB",
        ssd: "512GB",
        card: "GTX 4050 8GB",
        location: "TP.HCM",
        kind: "Lenovo",
        image: "../img/lap10.jpg",
        description: [
            "Thiết kế trẻ trung, năng động",
            "CPU Intel Core i5-1235U hiệu năng ổn định",
            "RAM 8GB cho khả năng xử lý mượt mà các tác vụ cơ bản",
            "Ổ cứng SSD 512GB tốc độ cao, mở ứng dụng nhanh chóng",
            "Màn hình 15 inch Full HD, hiển thị sắc nét",
            "Tích hợp công nghệ sạc nhanh, sử dụng lâu dài"
        ]

    },

    // Thêm sản phẩm khác nếu cần
];