# BOOKVERSE — Website bán sách trực tuyến

BOOKVERSE là đồ án môn Thiết kế Website được xây dựng hoàn toàn bằng HTML5, CSS3 và JavaScript ES6+ thuần. Website mô phỏng trọn vẹn luồng mua sách và quản trị dữ liệu ngay trên trình duyệt, không cần backend.

> Slogan: **“Mở trang sách, mở thế giới.”**

## Công nghệ sử dụng

- HTML5 Semantic (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `form`, `table`).
- CSS3 thuần: CSS Variables, Flexbox, Grid, glass effect, dark mode và hiệu ứng 3D.
- JavaScript ES6+ thuần.
- `localStorage` cho sách, tài khoản, phiên đăng nhập, giỏ hàng, yêu thích, đơn hàng, khuyến mãi và cài đặt.
- Google Fonts — Be Vietnam Pro.
- Font Awesome 6.5.2 qua cdnjs.
- Animate.css 4.1.1 qua cdnjs.
- AOS 2.3.1 qua unpkg.
- Biểu đồ Admin được vẽ bằng CSS, không dùng Chart.js.

## Cấu trúc dự án

```text
baicuoiky/
├── index.html              # Trang chủ
├── books.html              # Danh sách, tìm kiếm, lọc, sắp xếp
├── book-detail.html        # Chi tiết theo query ?id=BV001
├── cart.html               # Giỏ hàng và mã giảm giá
├── checkout.html           # Tạo đơn hàng mô phỏng
├── login.html
├── register.html
├── account.html
├── about.html
├── contact.html
├── 404.html
├── assets/
│   ├── css/                # Design system, responsive, animation, auth, admin
│   ├── js/                 # Storage, UI, sách, giỏ, auth, checkout, admin
│   ├── images/books/       # 12 bìa sách AI-generated cục bộ
│   ├── images/banners/     # Hero banner AI-generated cục bộ
│   ├── images/categories/
│   ├── images/logo/
│   └── icons/
└── admin/
    ├── index.html          # Dashboard
    ├── books.html
    ├── categories.html
    ├── orders.html
    ├── customers.html
    ├── promotions.html
    ├── reports.html
    ├── settings.html
    ├── css/admin-dashboard.css
    └── js/admin-dashboard.js
```

## Cách chạy bằng Live Server

1. Mở thư mục `baicuoiky` trong Visual Studio Code.
2. Cài extension **Live Server** nếu chưa có.
3. Nhấn chuột phải vào `index.html` và chọn **Open with Live Server**.
4. Không mở riêng từng file bằng đường dẫn hệ thống nếu trình duyệt chặn `localStorage`; Live Server cho kết quả ổn định nhất.

Không cần chạy `npm install`, không cần build và không cần cơ sở dữ liệu.

## Các trang chính

- `index.html`: hero, 8 danh mục, sách nổi bật, sách mới, bán chạy, khuyến mãi, bộ sưu tập, đánh giá và newsletter.
- `books.html`: tìm theo tên/tác giả, lọc danh mục/khoảng giá/khuyến mãi, sắp xếp và tải thêm.
- `book-detail.html?id=BV001`: ảnh bìa, mô tả, thông tin xuất bản, tồn kho, số lượng, mua ngay và sách liên quan.
- `cart.html`: tăng/giảm/xóa sản phẩm, giới hạn tồn kho, mã `BOOK10` hoặc `FREESHIP` và tính tổng.
- `checkout.html`: COD/chuyển khoản mô phỏng, kiểm tra form, sinh mã đơn và lưu đơn.
- `login.html`, `register.html`, `account.html`: xác thực demo, hồ sơ, đơn hàng, yêu thích và đổi mật khẩu.
- `about.html`, `contact.html`, `404.html`: nội dung thông tin và hỗ trợ.
- `admin/*.html`: dashboard, CRUD sách/danh mục/khuyến mãi, đơn hàng, khách hàng, báo cáo CSV và cài đặt.

## Tài khoản demo

### Khách hàng

- Email: `customer@bookverse.demo`
- Mật khẩu: `Book123!`

### Quản trị

- Email: `admin@bookverse.demo`
- Mật khẩu: `Admin123!`

Trang đăng nhập có nút tự điền hai tài khoản này để giảng viên kiểm thử nhanh.

## Hướng dẫn kiểm thử chức năng

### 1. Danh mục và tìm kiếm

1. Mở `books.html`.
2. Nhập một phần tên sách hoặc tác giả.
3. Chọn danh mục, khoảng giá hoặc chỉ sách khuyến mãi.
4. Đổi sắp xếp giữa giá, đánh giá và sách mới.
5. Nhấn **Xóa bộ lọc** để khôi phục toàn bộ danh sách.

### 2. Giỏ hàng và mã giảm giá

1. Thêm sách từ trang chủ, trang danh sách hoặc trang chi tiết.
2. Mở `cart.html`, tăng/giảm số lượng và thử vượt tồn kho.
3. Áp dụng `BOOK10` cho đơn từ 200.000đ hoặc `FREESHIP` cho đơn từ 350.000đ.
4. Tải lại trang để kiểm tra giỏ hàng vẫn còn.

### 3. Đăng ký, đăng nhập và tài khoản

1. Tạo tài khoản mới tại `register.html`; thử đăng ký trùng email để xem kiểm tra lỗi.
2. Đăng nhập bằng tài khoản khách hàng mẫu.
3. Chỉnh sửa hồ sơ, xem yêu thích, lịch sử đơn và đổi mật khẩu demo.
4. Nhấn đăng xuất; dữ liệu sách và đơn hàng không bị xóa.

### 4. Checkout và đồng bộ Admin

1. Đăng nhập tài khoản khách hàng, thêm sách vào giỏ và mở checkout.
2. Điền thông tin hợp lệ, chọn COD hoặc chuyển khoản mô phỏng.
3. Xác nhận để sinh mã đơn; giỏ hàng sẽ được làm trống.
4. Đăng xuất, đăng nhập tài khoản Admin và mở **Đơn hàng**.
5. Tìm mã đơn vừa tạo, xem chi tiết và chuyển trạng thái theo thứ tự hợp lệ:
   - Chờ xác nhận → Đang xử lý hoặc Đã hủy.
   - Đang xử lý → Đang giao hoặc Đã hủy.
   - Đang giao → Hoàn thành.
6. Quay lại Dashboard/Báo cáo để kiểm tra số liệu được cập nhật từ cùng dữ liệu.

### 5. CRUD Admin

- **Sách:** thêm/sửa/xóa, nhập ảnh cục bộ dạng `assets/images/...` hoặc URL `https://...`; thay đổi xuất hiện ngay ở trang bán hàng.
- **Danh mục:** thêm/đổi tên; đổi tên cập nhật luôn sách liên quan; không thể xóa danh mục đang được sử dụng.
- **Khuyến mãi:** tạo/sửa/xóa, phần trăm hoặc số tiền, đơn tối thiểu, hạn dùng và trạng thái.
- **Khách hàng:** tìm kiếm, phân trang, xem thông tin và lịch sử đơn; mật khẩu không xuất hiện trong bảng.
- **Báo cáo:** lọc theo ngày và xuất CSV từ dữ liệu đang lưu.
- **Cài đặt:** tên cửa hàng, liên hệ, phí vận chuyển và giao diện sáng/tối.

### 6. Phân quyền

- Mở `admin/index.html` khi chưa đăng nhập: hệ thống chuyển về login và hiển thị thông báo.
- Đăng nhập bằng tài khoản khách hàng rồi nhập URL Admin: vẫn bị từ chối.
- Chỉ tài khoản có `role: "admin"` mới hiển thị dashboard.

## Xóa dữ liệu demo và khởi tạo lại

Cách đơn giản:

1. Mở DevTools (`F12`) → tab **Application**.
2. Chọn **Local Storage** → địa chỉ Live Server.
3. Xóa các khóa bắt đầu bằng `bv_`.
4. Tải lại trang. `storage.js` sẽ tự tạo lại dữ liệu mẫu chỉ khi chưa có dữ liệu.

Hoặc chạy trong Console:

```js
BV.reset();
location.reload();
```

## Nguồn ảnh và thư viện

- Hero banner và 12 ảnh bìa trong `assets/images/` được tạo riêng bằng công cụ tạo ảnh AI tích hợp cho dự án này; ảnh không chứa logo, nhãn hiệu hoặc watermark của bên thứ ba.
- Phông chữ: [Google Fonts — Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro).
- Icon: [Font Awesome Free](https://fontawesome.com/) qua cdnjs.
- Hiệu ứng: [Animate.css](https://animate.style/) và [AOS](https://michalsnik.github.io/aos/).

Khi không có mạng, nội dung, chức năng và ảnh cục bộ vẫn hoạt động; font/icon/AOS/Animate.css từ CDN có thể không tải. Giao diện vẫn có font hệ thống dự phòng và CSS chuyển động nội bộ.

## Giới hạn của bản demo

- Mật khẩu được lưu dạng văn bản trong `localStorage` để minh họa, **không an toàn cho sản phẩm thật**.
- Phân quyền JavaScript phía client có thể bị thay đổi bởi người dùng có quyền sửa source/localStorage; hệ thống thực tế phải xác thực và phân quyền ở server.
- Không tích hợp cổng thanh toán, không yêu cầu và không lưu dữ liệu thẻ ngân hàng.
- Dữ liệu chỉ tồn tại trên cùng trình duyệt/origin và không đồng bộ giữa thiết bị.
- Biểu đồ và báo cáo phản ánh dữ liệu localStorage hiện tại, không tạo số liệu ngẫu nhiên sau mỗi lần tải.

## Gợi ý thuyết trình

Luồng nên demo: **lọc sách → xem chi tiết → thêm giỏ → đăng nhập → checkout → đăng nhập Admin → thấy đơn mới → cập nhật trạng thái → xem dashboard/báo cáo**. Đây là luồng thể hiện rõ nhất cách các module JavaScript dùng chung dữ liệu localStorage.
