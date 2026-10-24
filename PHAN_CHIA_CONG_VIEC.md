# PHÂN CHIA CÔNG VIỆC DỰ ÁN BOOKVERSE

Tài liệu này mô tả phạm vi phụ trách của hai thành viên **Dev Bằng** và **Dev Khôi** trong dự án website bán sách BOOKVERSE. Nội dung được tổng hợp từ cấu trúc mã nguồn, chức năng thực tế và lịch sử commit trên Git.

---

## 1. Thông tin nhóm

| Thành viên | Mã sinh viên | Nhánh làm việc | Vai trò chính |
|---|---|---|---|
| DINH VU BANG | 526000149 | `dev_bang` | HTML, JavaScript, dữ liệu, nghiệp vụ website, Admin và tài liệu |
| LE ANH KHOI | 526000143 | `dev_khoi` | CSS, thiết kế giao diện, responsive, hiệu ứng và trải nghiệm người dùng |

Nhánh tích hợp chính của dự án là `main`. Mỗi thành viên phát triển trên nhánh riêng, sau đó tạo Pull Request hoặc merge vào `main` sau khi kiểm tra.

---

## 2. Nguyên tắc phân chia

Công việc được chia theo **module và trách nhiệm kỹ thuật**, không chỉ dựa trên số lượng file:

- Mỗi chức năng có một người phụ trách chính.
- Người còn lại kiểm tra chéo trước khi merge.
- Các file dùng chung như `style.css`, `main.js`, `books.js` có thể được cả hai chỉnh sửa nhưng phải trao đổi trước để hạn chế xung đột.
- Không làm trực tiếp trên `main` khi đang phát triển chức năng lớn.
- Commit cần có nội dung rõ ràng và chỉ chứa thay đổi liên quan.

---

## 3. Bảng phân công tổng quan

| Nhóm công việc | Dev Bằng | Dev Khôi |
|---|---:|---:|
| Phân tích yêu cầu và kiến trúc dự án | Phụ trách chính | Góp ý, kiểm tra |
| Dữ liệu mẫu và `localStorage` | Phụ trách chính | Kiểm tra dữ liệu hiển thị đúng giao diện |
| HTML các trang khách hàng | Phụ trách chính | Góp ý bố cục và khả năng sử dụng |
| Giỏ hàng và checkout | Viết logic JavaScript | Thiết kế giao diện và trạng thái responsive |
| Đăng nhập, đăng ký và tài khoản | Viết logic JavaScript | Thiết kế form và phản hồi lỗi |
| Admin Dashboard | Viết logic quản trị | Thiết kế dashboard, bảng và modal |
| Design system và CSS Variables | Phối hợp cấu trúc HTML | Phụ trách chính |
| Hiệu ứng 3D và nền vũ trụ | Hỗ trợ JavaScript tương tác | Phụ trách CSS và animation |
| Responsive | Kiểm tra chức năng | Phụ trách chính |
| Kiểm thử | Phụ trách luồng nghiệp vụ | Phụ trách giao diện đa kích thước |
| Git, merge và xử lý xung đột | Quản lý nhánh `dev_bang` | Quản lý nhánh `dev_khoi`, xử lý merge phần CSS |
| README, tài liệu và slide | Phụ trách nội dung chính | Bổ sung phần giao diện và CSS |

---

## 4. Công việc của Dev Bằng

### 4.1. Xây dựng cấu trúc dự án

- Tổ chức các trang HTML khách hàng và Admin.
- Thiết lập cấu trúc thư mục `assets/css`, `assets/js`, `assets/images`, `admin/css`, `admin/js`.
- Áp dụng Semantic HTML5 với `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `form` và `table`.
- Thiết lập đường dẫn tài nguyên để dự án chạy bằng Live Server và GitHub Pages.

### 4.2. Xây dựng lớp dữ liệu dùng chung

File phụ trách chính:

- `assets/js/storage.js`

Nội dung thực hiện:

- Khai báo 12 sách mẫu với ID, tên, tác giả, giá, tồn kho, đánh giá và thông tin xuất bản.
- Khai báo tài khoản khách hàng và Admin demo.
- Khởi tạo đơn hàng, mã giảm giá và cài đặt mẫu.
- Xây dựng hệ thống khóa `localStorage`.
- Cung cấp API dùng chung qua `window.BV`.
- Xử lý đọc/ghi JSON và dữ liệu dự phòng khi `localStorage` lỗi.
- Bổ sung phiên bản danh mục `bv_catalog_version`.
- Khắc phục trường hợp trình duyệt mới hoặc dữ liệu cũ không hiển thị đủ sách.
- Giữ 12 sách mặc định trên mọi thiết bị mà không ghi đè sách tùy chỉnh của Admin.

### 4.3. Trang chủ và kho sách

File phụ trách:

- `index.html`
- `books.html`
- `assets/js/books.js`

Nội dung thực hiện:

- Hero, danh mục, sách nổi bật, sách mới, bán chạy và bộ sưu tập.
- Tạo card sách dùng lại trên nhiều trang.
- Tìm kiếm theo tên hoặc tác giả.
- Lọc danh mục, giá và khuyến mãi.
- Sắp xếp sách và tải thêm sản phẩm.
- Điều hướng từ card sang trang chi tiết.
- Xử lý trạng thái không có kết quả.

### 4.4. Trang chi tiết và bình luận sách

File phụ trách:

- `book-detail.html`
- `assets/js/book-detail.js`

Nội dung thực hiện:

- Lấy ID sách bằng `URLSearchParams`.
- Render thông tin sách và sách liên quan.
- Kiểm tra số lượng theo tồn kho.
- Thêm vào giỏ hoặc mua ngay.
- Xử lý ảnh bìa lỗi.
- Thêm bình luận, chấm sao và tính điểm trung bình.
- Lưu bình luận theo từng ID sách trong `localStorage`.

### 4.5. Giỏ hàng và thanh toán

File phụ trách:

- `cart.html`
- `checkout.html`
- `assets/js/cart.js`
- `assets/js/checkout.js`

Nội dung thực hiện:

- Thêm, tăng, giảm và xóa sách trong giỏ.
- Kiểm tra số lượng tối thiểu và tồn kho tối đa.
- Tính tạm tính, phí vận chuyển, giảm giá và tổng tiền.
- Áp dụng mã `BOOK10` và `FREESHIP`.
- Kiểm tra form thông tin người nhận.
- Tạo mã đơn hàng và lịch sử trạng thái.
- Lưu đơn vào `bv_orders` và xóa giỏ sau khi đặt thành công.

### 4.6. Xác thực và trang tài khoản

File phụ trách:

- `login.html`
- `register.html`
- `account.html`
- `assets/js/auth.js`
- `assets/css/auth.css`

Nội dung thực hiện:

- Đăng nhập, đăng ký và đăng xuất.
- Kiểm tra email, mật khẩu và email trùng.
- Điều hướng theo vai trò `customer` hoặc `admin`.
- Ẩn nút Admin với người dùng thường.
- Chỉnh sửa hồ sơ và đổi mật khẩu demo.
- Hiển thị lịch sử đơn hàng và sách yêu thích.

### 4.7. Admin Dashboard

File phụ trách:

- `admin/*.html`
- `assets/js/admin.js`
- `assets/css/admin.css`
- `admin/css/admin-dashboard.css`
- `admin/js/admin-dashboard.js`

Nội dung thực hiện:

- Kiểm tra quyền Admin trước khi render nội dung.
- Dashboard doanh thu, đơn hàng, sách, khách hàng và tồn kho.
- Quản lý thêm, sửa, xóa sách.
- Quản lý danh mục và bảo vệ danh mục đang được sử dụng.
- Quản lý đơn hàng theo quy tắc chuyển trạng thái.
- Quản lý khách hàng và lịch sử đơn.
- Quản lý khuyến mãi.
- Báo cáo theo thời gian và xuất CSV.
- Lưu cài đặt cửa hàng và giao diện.
- Hiển thị email đăng ký nhận tin trong Admin.

### 4.8. JavaScript cho giao diện dùng chung

File phụ trách chính:

- `assets/js/main.js`

Nội dung thực hiện:

- Điều khiển menu mobile, header sticky và chuyển đổi Light/Dark Mode.
- Xử lý popup khuyến mãi, modal, toast và button ripple.
- Khởi tạo AOS và xử lý dự phòng khi CDN lỗi để nội dung không bị ẩn.
- Cập nhật số lượng giỏ hàng, trạng thái đăng nhập và điều hướng dùng chung.
- Hỗ trợ hiệu ứng nghiêng card theo vị trí con trỏ; phần trình bày bằng CSS do Dev Khôi phụ trách.

### 4.9. Kiểm thử, sửa lỗi và triển khai

- Kiểm tra hiển thị trên trình duyệt mới và nhiều kích thước màn hình.
- Sửa lỗi dữ liệu sách không xuất hiện trên thiết bị khác.
- Sửa cache phiên bản CSS/JavaScript trên GitHub Pages.
- Sửa lỗi AOS làm card sách có trong DOM nhưng bị `opacity: 0`.
- Kiểm tra Local Storage, số lượng card và luồng chi tiết sách.
- Theo dõi GitHub Pages Actions sau khi merge.
- Quản lý nhánh `dev_bang` và phối hợp merge vào `main`.

### 4.10. Tài liệu và thuyết trình

File phụ trách:

- `README.md`
- `GIAI_THICH_CAU_TRUC_DU_AN.md`
- `KICH_BAN_THUYET_TRINH.md`
- `BOOKVERSE_ThuyetTrinh.pptx`

Nội dung thực hiện:

- Viết hướng dẫn chạy và kiểm thử.
- Giải thích kiến trúc và vai trò từng file.
- Chuẩn bị kịch bản thuyết trình.
- Chuẩn bị slide và ảnh xem trước.

---

## 5. Công việc của Dev Khôi

### 5.1. Xây dựng CSS Design System

File phụ trách chính:

- `assets/css/style.css`

Nội dung thực hiện:

- Xây dựng hệ thống CSS Variables cho màu sắc, khoảng cách, bo góc, bóng đổ, font chữ và tốc độ chuyển động.
- Chuẩn hóa typography, container, Grid, Flexbox, button, form, badge, modal và toast.
- Thiết kế header, navigation, hero, section, footer và các thành phần dùng chung.
- Bảo đảm độ tương phản, trạng thái `hover`, `focus-visible`, `active` và `disabled` rõ ràng.
- Hạn chế selector trùng lặp và tổ chức CSS theo từng nhóm thành phần để dễ bảo trì.

### 5.2. Giao diện trang khách hàng

File phụ trách:

- `assets/css/style.css`
- `assets/css/auth.css`

Nội dung thực hiện:

- Thiết kế card sách, danh mục, bộ lọc, chi tiết sách và khu vực sách liên quan.
- Hoàn thiện giao diện giỏ hàng, tóm tắt thanh toán và trạng thái giỏ hàng trống.
- Thiết kế form đăng nhập, đăng ký, tài khoản và checkout thống nhất với nhận diện BOOKVERSE.
- Căn chỉnh icon, khoảng cách, ảnh bìa, nhãn giảm giá và nút thao tác.
- Thiết kế Light Mode và Dark Mode đồng bộ trên các trang.

### 5.3. Giao diện Admin Dashboard

File phụ trách:

- `assets/css/admin.css`
- `admin/css/admin-dashboard.css`

Nội dung thực hiện:

- Thiết kế sidebar, header, thẻ thống kê và vùng nội dung theo phong cách dashboard SaaS.
- Trình bày bảng dữ liệu sách, đơn hàng, khách hàng và khuyến mãi dễ đọc.
- Thiết kế modal thêm/sửa, form cài đặt, biểu đồ CSS và các trạng thái dữ liệu trống.
- Xử lý sidebar thu gọn và điều hướng Admin trên màn hình nhỏ.
- Giữ giao diện Admin nhất quán với màu sắc và typography của website chính.

### 5.4. Hiệu ứng 3D và chuyển động

File phụ trách:

- `assets/css/animations.css`
- `assets/css/style.css`

Nội dung thực hiện:

- Tạo chiều sâu cho card và bìa sách bằng `perspective`, `transform-style` và `translateZ`.
- Tạo gáy sách, độ dày bìa và bóng đổ nhiều lớp bằng pseudo-element.
- Xây dựng nền gradient vũ trụ, hạt ánh sáng và sao lóe sáng bay lên.
- Tạo hiệu ứng hover nâng card, highlight, chuyển màu gradient và modal xuất hiện mượt.
- Tích hợp lớp hiệu ứng phù hợp với Animate.css và AOS.
- Giảm hoặc tắt chuyển động khi người dùng bật `prefers-reduced-motion`.

### 5.5. Responsive và khả năng sử dụng

File phụ trách chính:

- `assets/css/responsive.css`

Nội dung thực hiện:

- Xây dựng breakpoint cho desktop, laptop, tablet và điện thoại.
- Chuyển lưới sách, danh mục và dashboard về số cột phù hợp theo chiều rộng màn hình.
- Điều chỉnh menu mobile, form, bảng, modal và các nút nổi để không che nội dung.
- Ngăn tràn ngang và bảo đảm vùng bấm đủ lớn trên thiết bị cảm ứng.
- Kiểm tra giao diện tại các mốc 360px, 768px, 1024px và màn hình desktop.

### 5.6. Kiểm tra và tối ưu CSS

- Kiểm tra selector không còn được sử dụng và tránh khai báo lặp không cần thiết.
- Kiểm tra ảnh, chữ và thành phần không vượt khỏi container.
- Kiểm tra giao diện khi dữ liệu dài, giỏ hàng trống hoặc không có kết quả tìm kiếm.
- Tối ưu animation để không gây giật khi hiển thị nhiều card sách.
- Kiểm tra trên cả Light Mode, Dark Mode và thiết bị cảm ứng.

### 5.7. Merge và xử lý xung đột

- Phát triển trên nhánh `dev_khoi`.
- Đồng bộ thay đổi mới từ `main` trước khi tạo Pull Request.
- Giải quyết xung đột tại các file dùng chung như `style.css`, `animations.css`, `responsive.css` và `index.html`.
- Commit hợp nhất: `22e2469` — “Fix: Giai quyet xung dot giua dev_khoi va main”.
- Pull Request được merge vào `main` tại commit `deca863`.

---

## 6. Các file cả hai cùng tham gia

| File | Dev Bằng | Dev Khôi | Quy tắc phối hợp |
|---|---|---|---|
| `index.html` | Xây dựng nội dung và semantic HTML | Góp ý bố cục, class và thành phần giao diện | Pull mới nhất trước khi sửa |
| `assets/js/main.js` | Header, theme, popup và hành vi dùng chung | Phối hợp class trạng thái cho CSS | Tách rõ logic và trình bày |
| `assets/js/books.js` | Card, danh sách và bộ lọc | Kiểm tra class card và trạng thái hiển thị | Kiểm thử lại trang chủ và kho sách |
| `assets/css/style.css` | Góp ý yêu cầu từ chức năng | Thiết kế và bảo trì CSS chính | Dev Khôi duyệt thay đổi CSS dùng chung |
| `assets/css/animations.css` | Kết nối sự kiện JavaScript khi cần | 3D, vũ trụ, popup và chuyển động | Kiểm tra `prefers-reduced-motion` |
| `assets/css/responsive.css` | Kiểm tra chức năng trên màn hình nhỏ | Toàn bộ breakpoint responsive | Kiểm tra 360px, 768px, 1024px |
| `README.md` | Tài liệu dự án tổng thể | Bổ sung giải thích CSS và responsive | Kiểm tra nội dung trước khi merge |

---

## 7. Quy trình Git của nhóm

### Dev Bằng

```bash
git switch dev_bang
git pull origin main
# thực hiện công việc
git add <cac-file-lien-quan>
git commit -m "Feat/Fix/Docs: mo ta ngan gon"
git push origin dev_bang
```

### Dev Khôi

```bash
git switch dev_khoi
git pull origin main
# thực hiện công việc
git add <cac-file-lien-quan>
git commit -m "Feat/Fix/Docs: mo ta ngan gon"
git push origin dev_khoi
```

Sau khi kiểm tra, tạo Pull Request từ nhánh cá nhân vào `main`.

### Quy tắc commit

- `Feat:` thêm chức năng.
- `Fix:` sửa lỗi.
- `Docs:` cập nhật tài liệu.
- `Style:` thay đổi giao diện không ảnh hưởng nghiệp vụ.
- `Refactor:` tổ chức lại code nhưng không thay đổi kết quả.

Không commit hồ sơ Chrome `.debug-chrome-*`, `.qa-*`, file `.env` hoặc API key.

---

## 8. Kế hoạch kiểm thử chéo

### Dev Bằng kiểm tra phần của Dev Khôi

- CSS không làm mất hoặc che các nút chức năng.
- Light Mode và Dark Mode đều có độ tương phản tốt.
- Card sách, form, modal và bảng không bị tràn ngang.
- Hiệu ứng 3D hoạt động mượt và trở về trạng thái ban đầu khi rời chuột.
- `prefers-reduced-motion` làm giảm các chuyển động không cần thiết.
- Giao diện hiển thị tốt tại 360px, 768px, 1024px và desktop.
- Style của trang khách hàng và Admin nhất quán.

### Dev Khôi kiểm tra phần của Dev Bằng

- Máy mới có đủ 12 sách mẫu.
- Tìm kiếm, lọc và sắp xếp hoạt động.
- Chi tiết sách lấy đúng ID.
- Giỏ hàng không vượt tồn kho.
- Checkout tạo đơn và Admin nhìn thấy đơn.
- Khách hàng thường không mở được Admin.
- Email nhận tin và bình luận được lưu.
- AOS lỗi không làm nội dung biến mất.
- Responsive không tràn ngang.

### Cả hai cùng kiểm tra trước khi nộp

- Không có lỗi Console nghiêm trọng.
- Không có liên kết chết.
- GitHub Pages hiển thị phần website tĩnh.
- Các file CSS tải đúng và không trả về lỗi `404`.
- README khớp với chức năng thực tế.

---

## 9. Phân chia phần thuyết trình

### Dev Bằng trình bày

Thời lượng đề xuất: **4–5 phút**.

1. Giới thiệu đề tài và mục tiêu.
2. Kiến trúc HTML/CSS/JavaScript và `localStorage`.
3. Cấu trúc dữ liệu trong `storage.js`.
4. Demo tìm sách, yêu thích, giỏ hàng và checkout.
5. Demo Admin cập nhật sách và đơn hàng.
6. Giải thích cách các module JavaScript đồng bộ qua `localStorage`.

### Dev Khôi trình bày

Thời lượng đề xuất: **3–4 phút**.

1. Trình bày CSS Variables và hệ thống màu sắc BOOKVERSE.
2. Giải thích cách dùng Flexbox và Grid cho bố cục.
3. Demo card sách 3D, nền vũ trụ và các animation.
4. Giải thích cách tổ chức `style.css`, `animations.css` và `responsive.css`.
5. Demo responsive tại desktop, tablet và điện thoại.
6. Trình bày `prefers-reduced-motion`, focus và Dark Mode.

### Demo phối hợp

- Dev Bằng thao tác website và Admin.
- Dev Khôi trình bày giao diện, hiệu ứng và responsive.
- Khi phản biện, người phụ trách module trả lời trước; thành viên còn lại bổ sung khi câu hỏi liên quan đến tích hợp.

---

## 10. Minh chứng bằng lịch sử Git

### Dev Bằng

Một số commit tiêu biểu:

| Commit | Nội dung |
|---|---|
| `4589978` | Cập nhật chức năng website bán sách |
| `a621657` | Hoàn thiện README |
| `031b0eb` | Sửa khởi tạo dữ liệu sách mặc định |
| `3fef30a` | Sửa kho sách rỗng trên thiết bị khác |
| `92bd136` | Sửa dữ liệu cũ và cache trình duyệt |
| `c5d2dd4` | Sửa card sách bị AOS ẩn |
| `c1de3ae` | Khôi phục chuyển động nền vũ trụ |

### Dev Khôi

Các commit tiêu biểu:

| Commit | Nội dung |
|---|---|
| `41c22cf` | Cập nhật và hoàn thiện giao diện website |
| `22e2469` | Giải quyết xung đột giữa `dev_khoi` và `main` |
| `deca863` | Merge Pull Request từ `dev_khoi` vào `main` |

Lịch sử Git là bằng chứng khách quan về quá trình làm việc, nhưng phần trình bày nên tập trung vào kiến thức và trách nhiệm kỹ thuật thay vì chỉ đếm commit.

---

## 11. Lưu ý kỹ thuật khi bảo vệ đồ án

### Website chính

- Là front-end thuần và hoạt động trên GitHub Pages.
- Dữ liệu demo nằm trong `localStorage`.
- Phân quyền Admin phía client chỉ mang tính mô phỏng.
- Dữ liệu tự tạo không đồng bộ giữa các thiết bị.

### CSS và giao diện

- Dev Khôi chịu trách nhiệm chính về phần trình bày; Dev Bằng cung cấp cấu trúc HTML và các class trạng thái cần thiết cho JavaScript.
- Giao diện sử dụng CSS3 thuần, CSS Variables, Flexbox, Grid và media query, không sử dụng framework CSS.
- Hiệu ứng 3D được tạo bằng CSS `perspective` và `transform`, không dùng ảnh GIF nặng.
- Responsive phải được kiểm tra bằng kích thước thật, không chỉ thu nhỏ cửa sổ trình duyệt.
- Phần CSS không thay đổi dữ liệu hoặc nghiệp vụ; JavaScript của Dev Bằng chịu trách nhiệm cập nhật trạng thái và CSS thể hiện trạng thái đó.

Khi giảng viên hỏi cách hai thành viên phối hợp, Dev Khôi có thể trả lời:

> “Dev Bằng xây dựng cấu trúc HTML, dữ liệu và logic JavaScript. Em phụ trách hệ thống CSS, responsive và hiệu ứng. Hai phần kết nối qua class và trạng thái DOM đã thống nhất, vì vậy có thể phát triển riêng nhưng vẫn ghép thành một giao diện hoàn chỉnh.”

---

## 12. Xác nhận của thành viên

| Thành viên | Nội dung xác nhận | Chữ ký |
|---|---|---|
| Dev Bằng | Đồng ý với phạm vi công việc và nội dung đã thực hiện | __________ |
| Dev Khôi | Đồng ý với phạm vi công việc và nội dung đã thực hiện | __________ |

Ngày xác nhận: ____ / ____ / 2026

