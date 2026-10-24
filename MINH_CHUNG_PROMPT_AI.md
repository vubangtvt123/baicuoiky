# MINH CHỨNG TƯ DUY ĐIỀU KHIỂN AI BẰNG PROMPT LOGIC

> **Dự án:** BOOKVERSE — Website bán sách trực tuyến  
> **Công nghệ:** HTML5, CSS3, JavaScript ES6+ và `localStorage`  
> **Mục đích:** Minh chứng cách nhóm phân tích yêu cầu, giao nhiệm vụ cho AI, kiểm tra kết quả và tinh chỉnh theo bằng chứng kỹ thuật.

---

## 1. Phạm vi của tài liệu

Tài liệu này trình bày cách AI được dùng như **công cụ hỗ trợ phát triển phần mềm**, không phải là người tự quyết định kiến trúc hoặc thay thế trách nhiệm của sinh viên.

Nhóm chịu trách nhiệm:

- Phân tích yêu cầu của đề bài.
- Chia bài toán lớn thành các module có quan hệ phụ thuộc.
- Đặt ràng buộc kỹ thuật và các bất biến nghiệp vụ.
- Yêu cầu AI kiểm tra mã nguồn hiện có trước khi sửa.
- Kiểm thử kết quả trên trình duyệt và trong `localStorage`.
- Phát hiện đầu ra chưa đúng, cung cấp bằng chứng và yêu cầu sửa có phạm vi.
- Đọc, hiểu và giải thích được phần mã nguồn cuối cùng.

AI hỗ trợ:

- Đề xuất hướng triển khai.
- Tạo hoặc chỉnh sửa mã theo yêu cầu đã được giới hạn.
- Phân tích lỗi từ Console, DOM và dữ liệu trình duyệt.
- Gợi ý trường hợp biên và cách kiểm thử.
- Hỗ trợ chuẩn hóa tài liệu kỹ thuật.

> **Lưu ý:** Các prompt trong tài liệu đã được chuẩn hóa từ những vấn đề thực tế của dự án để thể hiện rõ mục tiêu, ràng buộc và tiêu chí nghiệm thu.

---

## 2. Tư duy cốt lõi khi điều khiển AI

Nhóm không dùng một câu lệnh chung như:

```text
Hãy làm cho tôi một website bán sách.
```

Câu lệnh trên thiếu phạm vi, quy tắc dữ liệu, điều kiện hoàn thành và cách kiểm tra. Thay vào đó, mỗi prompt chuyên nghiệp được tổ chức theo mô hình:

```text
CONTEXT
   ↓
OBJECTIVE
   ↓
SCOPE
   ↓
CONSTRAINTS + BUSINESS INVARIANTS
   ↓
EXPECTED OUTPUT
   ↓
ACCEPTANCE CRITERIA
   ↓
VERIFICATION
   ↓
REFINEMENT
```

### Ý nghĩa từng thành phần

| Thành phần | Câu hỏi cần trả lời |
|---|---|
| Context | Dự án đang dùng công nghệ gì, dữ liệu nằm ở đâu, lỗi xảy ra tại trang nào? |
| Objective | Sau khi hoàn thành, người dùng quan sát được kết quả gì? |
| Scope | Được sửa những file nào và phần nào không được động tới? |
| Constraints | Không được dùng framework gì, cần bảo toàn dữ liệu nào, có giới hạn bảo mật nào? |
| Invariants | Quy tắc nào luôn phải đúng, kể cả ở trường hợp biên? |
| Expected output | AI phải sửa file trực tiếp, báo file đã đổi hay chỉ phân tích nguyên nhân? |
| Acceptance criteria | Dựa vào đâu để xác nhận công việc hoàn thành? |
| Verification | Phải kiểm thử những luồng và kích thước màn hình nào? |
| Refinement | Nếu chưa đạt thì bằng chứng mới là gì và phạm vi sửa tiếp theo ở đâu? |

---

## 3. Cách nhóm phân rã bài toán BOOKVERSE

Đề bài ban đầu lớn, gồm nhiều trang và nhiều luồng phụ thuộc nhau. Nhóm chia thành thứ tự sau:

1. Khảo sát thư mục và tạo đúng cấu trúc dự án.
2. Thiết kế mô hình dữ liệu và các khóa `localStorage`.
3. Tạo 12 sách mặc định và API dùng chung `window.BV`.
4. Xây dựng trang chủ, danh sách và chi tiết sách.
5. Xây dựng yêu thích, giỏ hàng và tính tiền.
6. Xây dựng đăng ký, đăng nhập, phiên và phân quyền.
7. Xây dựng checkout và đồng bộ đơn hàng sang Admin.
8. Xây dựng CRUD Admin và máy trạng thái đơn hàng.
9. Bổ sung bình luận, newsletter và popup khuyến mãi.
10. Hoàn thiện CSS, hiệu ứng 3D, nền vũ trụ và responsive.
11. Kiểm thử trên máy mới, GitHub Pages và các trường hợp lỗi CDN/cache.
12. Viết README, tài liệu cấu trúc và kịch bản thuyết trình.

Thứ tự này phản ánh quan hệ phụ thuộc: giao diện sách cần dữ liệu; giỏ hàng cần sách; checkout cần giỏ hàng và phiên đăng nhập; Dashboard cần đơn hàng được tạo từ checkout.

---

## 4. Nhật ký vấn đề và chuỗi Prompt Logic

| Vấn đề thực tế | Hướng điều khiển bằng Prompt Logic | Minh chứng trong dự án |
|---|---|---|
| Máy khác không thấy sách | Kiểm tra nguồn seed, catalog version, dữ liệu rỗng và cache; không phụ thuộc dữ liệu đã có trên một trình duyệt. | `assets/js/storage.js`, 12 ảnh bìa cục bộ |
| Bấm sách không có thông tin | Kiểm tra ID từ card tới query string, xử lý ID không tồn tại và ảnh lỗi. | `books.js`, `book-detail.html` |
| Yêu thích không xuất hiện | Dùng cùng khóa dữ liệu, render lại khi có sự kiện và xử lý trạng thái rỗng. | `storage.js`, `auth.js` |
| Customer thấy nút Admin | Phân biệt ẩn UI với bảo vệ URL; kiểm tra `hidden` bị CSS ghi đè và xác minh cả hai role. | `main.js`, `auth.js`, `admin.js` |
| Newsletter chỉ là nút giả | Validate, chuẩn hóa, chống trùng, lưu dữ liệu và đọc cùng khóa tại Admin. | `main.js`, `admin-dashboard.js` |
| Cần bình luận sách | Lưu theo `bookId`, validate, escape dữ liệu và giữ sau reload. | `storage.js`, `book-detail.js` |
| Card có trong DOM nhưng bị ẩn | Phân biệt lỗi dữ liệu với lỗi hiển thị; kiểm tra AOS/CDN, opacity và fallback. | `main.js`, `animations.css` |
| Hiệu ứng vũ trụ đứng yên | Kiểm tra keyframes, lớp DOM, reduced motion và hiệu năng mobile. | `main.js`, `animations.css` |
| Giỏ hàng phải tính đúng | Biến yêu cầu thành các bất biến về tồn kho, khuyến mãi, vận chuyển và lưu trữ. | `cart.js`, `checkout.js` |
| Admin đổi trạng thái tùy ý | Mô hình hóa bằng máy trạng thái và lưu lịch sử thời gian. | `admin.js` |

### 4.1. Bộ prompt chuyên nghiệp từ quá trình phát triển

Các prompt sau được chuẩn hóa từ những vấn đề đã xuất hiện trong quá trình xây dựng BOOKVERSE, với cấu trúc kỹ thuật rõ ràng và có thể kiểm thử.

#### Trường hợp 1 — Yêu cầu xây dựng toàn bộ dự án

```text
Vai trò: Bạn là Senior Front-end Developer kiêm UI/UX Designer.

Hãy xây dựng trực tiếp trong workspace hiện tại website BOOKVERSE bằng HTML5
Semantic, CSS3 thuần và JavaScript ES6+. Trước khi chỉnh sửa, kiểm tra các file
đã tồn tại để bảo toàn phần hoàn thành.

Phạm vi gồm: trang khách hàng, tìm kiếm/lọc sách, chi tiết sách, yêu thích,
giỏ hàng, checkout, đăng ký/đăng nhập, tài khoản và toàn bộ Admin Dashboard.
Dữ liệu dùng chung qua localStorage; phải có 12 sách mặc định trên trình duyệt mới.

Không dùng framework front-end hoặc backend. Không tạo nút trang trí cho chức năng
bắt buộc. Mỗi giai đoạn phải được kiểm tra trước khi chuyển sang giai đoạn sau.

Nghiệm thu: mọi trang có đường dẫn hợp lệ; các luồng mua hàng, phân quyền, CRUD,
đơn hàng và lưu dữ liệu hoạt động sau reload; không có lỗi Console nghiêm trọng;
giao diện responsive và có tài liệu README bằng tiếng Việt.
```

**Tư duy được bổ sung:** xác định vai trò, phạm vi, thứ tự thực hiện, công nghệ bị cấm và tiêu chí nghiệm thu.

#### Trường hợp 2 — Lỗi Console không rõ nguồn

```text
Khi mở index.html, Console báo ReferenceError: solveSimpleChallenge is not defined.
Stack trace có URL hoặc tên script không thuộc cấu trúc rõ ràng của BOOKVERSE.

Hãy chẩn đoán nguồn lỗi trước khi sửa:
1. Tìm toàn bộ workspace xem solveSimpleChallenge có được khai báo hoặc gọi không.
2. Phân biệt lỗi từ code dự án, extension trình duyệt, script bị chèn hoặc nền tảng preview.
3. Không thêm một hàm rỗng chỉ để che lỗi nếu dự án không gọi hàm đó.
4. Nêu cách kiểm tra bằng Incognito/tắt extension và Live Server.

Chỉ chỉnh sửa mã nguồn nếu có bằng chứng lỗi phát sinh từ file trong dự án.
```

**Tư duy được bổ sung:** không chữa triệu chứng bằng hàm giả; xác định quyền sở hữu của stack trace trước.

#### Trường hợp 3 — Lỗi khi mở trực tiếp bằng `file://`

```text
Website đang được mở bằng giao thức file:// và trình duyệt báo các file URL có
unique security origin. Hãy giải thích nguyên nhân theo Same-Origin Policy và xác định
những chức năng nào có thể bị ảnh hưởng, như module, fetch hoặc tài nguyên cục bộ.

Đưa ra cách chạy đúng bằng HTTP local trong VS Code Live Server. Kèm bước kiểm tra
extension Live Server nếu menu “Open with Live Server” không xuất hiện. Không đề xuất
tắt cơ chế bảo mật của trình duyệt.
```

**Tư duy được bổ sung:** liên kết thông báo lỗi với chính sách trình duyệt và chọn giải pháp môi trường an toàn.

#### Trường hợp 4 — Favicon trả về 404

```text
Console báo 404 cho favicon.ico. Hãy kiểm tra tất cả thẻ <link rel="icon"> và cấu trúc
assets/icons hiện tại. Chọn một file favicon cục bộ có thật, cập nhật đường dẫn tương đối
đúng cho cả trang gốc và trang trong /admin, đồng thời không tạo liên kết tới file không tồn tại.

Nghiệm thu: tải lại bằng hard refresh, Network không còn 404 favicon ở index.html
và admin/index.html.
```

**Tư duy được bổ sung:** xác định phạm vi đường dẫn tương đối khác nhau giữa thư mục gốc và Admin.

#### Trường hợp 5 — Bìa sách và danh sách yêu thích

```text
Hãy xử lý đồng thời hai vấn đề nhưng tách rõ CSS và dữ liệu:

A. Bìa sách:
- Ảnh phải phủ đầy vùng cover bằng kích thước thống nhất.
- Dùng object-fit phù hợp, giữ bo góc và không làm card thay đổi chiều cao.
- Có fallback khi ảnh lỗi.

B. Wishlist:
- Nút tim phải ghi đúng bookId vào khóa localStorage dùng chung.
- account.html#wishlist phải đọc cùng khóa và ánh xạ ID sang BV.getBooks().
- Sau khi thêm/bỏ yêu thích, badge và danh sách phải cập nhật bằng sự kiện.
- Có trạng thái rỗng; ID sách không tồn tại phải được bỏ qua an toàn.

Nghiệm thu: thêm hai sách, reload, mở tab yêu thích, bỏ một sách và xác nhận giao diện
cùng localStorage đều cập nhật đúng.
```

**Tư duy được bổ sung:** không trộn lỗi trình bày ảnh với lỗi đồng bộ trạng thái.

#### Trường hợp 6 — Card danh mục khó nhìn và thiếu tương tác

```text
Tinh chỉnh card danh mục trên trang chủ bằng CSS thuần:
- Icon dùng màu trắng trên nền gradient và đạt độ tương phản tốt.
- Tăng khoảng cách giữa icon, tiêu đề và số lượng sách theo spacing variables.
- Khi hover bằng chuột: card nâng nhẹ, đổi viền/bóng và icon xoay hoặc translate vừa phải.
- Khi focus-visible bằng bàn phím: có trạng thái tương đương dễ nhận biết.
- Trên thiết bị cảm ứng không phụ thuộc hover để truy cập nội dung.
- Tôn trọng prefers-reduced-motion và không dùng animation liên tục.

Kiểm tra tại desktop, tablet và màn hình 360px; card không tràn hoặc che chữ.
```

**Tư duy được bổ sung:** thêm accessibility, touch fallback và giới hạn chuyển động.

#### Trường hợp 7 — Nền vũ trụ, hạt sáng và sao bay

```text
Thiết kế hệ thống nền vũ trụ đồng bộ cho Light/Dark Mode bằng CSS và JavaScript thuần.

Yêu cầu:
- Có gradient nhiều lớp, quầng sáng, hạt nhỏ và số lượng giới hạn sao lóe sáng bay lên.
- Lớp hiệu ứng nằm dưới nội dung, pointer-events:none và không tạo thanh cuộn ngang.
- Chuyển động ưu tiên transform/opacity, không gây repaint nặng.
- Không nhân đôi hạt khi resize hoặc khi script được khởi tạo lại.
- Mobile giảm mật độ; prefers-reduced-motion dừng chuyển động không cần thiết.
- Văn bản, form và nút vẫn dễ đọc ở cả hai theme.

Nghiệm thu bằng desktop, mobile và chế độ Reduce Motion.
```

**Tư duy được bổ sung:** biến yêu cầu thẩm mỹ thành các tiêu chí hiệu năng và khả năng truy cập.

#### Trường hợp 8 — Bấm card nhưng trang chi tiết trống

```text
Hoàn thiện luồng chi tiết sách thay vì tạo nội dung tĩnh cho từng cuốn.

- Card điều hướng tới book-detail.html?id=<bookId>.
- Trang chi tiết đọc ID bằng URLSearchParams và lấy dữ liệu từ BV.getBooks().
- Hiển thị đầy đủ ảnh, tên, tác giả, giá, tồn kho, mô tả và thông tin xuất bản.
- Nút số lượng chỉ cho phép 1..stock; thêm giỏ và mua ngay phải dùng đúng ID.
- ID thiếu hoặc không tồn tại phải hiển thị empty state, không phát sinh lỗi Console.
- Có sách liên quan và fallback ảnh.

Kiểm thử với một ID hợp lệ, một ID sai và URL không có ID.
```

**Tư duy được bổ sung:** chọn render động theo ID để tránh lặp trang và đảm bảo một nguồn dữ liệu.

#### Trường hợp 9 — Popup khuyến mãi chào mừng

```text
Tạo popup chào mừng BOOKVERSE có chức năng thật:
- Hiển thị ưu đãi và mã BOOK10.
- CTA dẫn tới danh sách sách khuyến mãi; nút sao chép mã phải phản hồi bằng toast.
- Đóng bằng nút X, phím Escape hoặc click backdrop.
- Quản lý focus cơ bản và khóa scroll khi modal mở.
- Chỉ hiện một lần trong phiên bằng sessionStorage, nhưng vẫn có cách kiểm thử lại.
- Animation mượt, responsive và hỗ trợ prefers-reduced-motion.

Không để popup che website vĩnh viễn khi JavaScript hoặc animation gặp lỗi.
```

**Tư duy được bổ sung:** xác định vòng đời popup, hành vi đóng và CTA thay vì chỉ tạo ảnh quảng cáo.

#### Trường hợp 10 — Newsletter phải xuất hiện trong Admin

```text
Kết nối form newsletter trang khách với panel Admin qua localStorage.

Phía khách: validate, trim, lowercase email, chống trùng và lưu id/source/createdAt/status.
Phía Admin: đọc cùng khóa, hiển thị tổng số, tìm kiếm và xóa có xác nhận.
Không đưa dữ liệu người dùng vào innerHTML nếu chưa escape.

Nghiệm thu: đăng ký một email mới, thử lại email khác hoa/thường, reload website,
mở Admin và xác nhận chỉ có một bản ghi đúng.
```

**Tư duy được bổ sung:** thiết kế schema, chuẩn hóa dữ liệu và kiểm tra đồng bộ hai chiều giao diện.

#### Trường hợp 11 — Bình luận sách

```text
Thêm hệ thống bình luận cho từng bookId trong trang chi tiết.

Dữ liệu gồm id, bookId, userId, name, rating, content, verified và createdAt.
Validate tên, số sao 1–5 và độ dài nội dung. Escape toàn bộ chuỗi do người dùng nhập.
Bình luận phải tồn tại sau reload và không xuất hiện nhầm sang sách khác.
verified chỉ đúng khi người dùng có đơn Hoàn thành chứa cuốn sách đó.

Kiểm thử dữ liệu hợp lệ, nội dung quá ngắn, rating sai và chuỗi thử XSS.
```

**Tư duy được bổ sung:** từ một yêu cầu ba từ thành mô hình dữ liệu, validation, bảo mật và test case.

#### Trường hợp 12 — Customer không được thấy nút Admin

```text
Sửa phân quyền giao diện và điều hướng:
- Guest/customer không được render nút “Vào Admin”.
- Admin phải thấy và dùng được nút.
- Mọi trang /admin vẫn kiểm tra session.role === 'admin' khi tải.
- Nếu CSS .btn ghi đè thuộc tính hidden, sửa quy tắc hiển thị hoặc loại nút khỏi DOM.
- Đăng xuất chỉ xóa session, không xóa dữ liệu hệ thống.

Nghiệm thu lần lượt với guest, customer demo và admin demo; kiểm tra cả DOM lẫn URL trực tiếp.
```

**Tư duy được bổ sung:** phân biệt việc giấu nút với kiểm tra quyền khi truy cập trực tiếp.

#### Trường hợp 13 — Máy khác không có dữ liệu sách

```text
Sửa cơ chế bootstrap catalog cho website tĩnh trên GitHub Pages.

Mã nguồn storage.js phải chứa 12 sách mặc định. Khi localStorage chưa có bv_books,
không phải mảng, là mảng rỗng hoặc catalog version đã cũ, hãy khởi tạo lại catalog.
Không reset giỏ hàng, tài khoản, đơn hàng, bình luận hoặc dữ liệu người dùng khác.
getBooks() phải có fallback an toàn nhưng không seed lại ở mọi lần tải.

Kiểm thử trong Incognito/máy mới, localStorage rỗng, bv_books=[] và reload nhiều lần.
```

**Tư duy được bổ sung:** nhận ra `localStorage` là dữ liệu theo origin và thiết bị, không được GitHub đồng bộ.

#### Trường hợp 14 — Có dữ liệu và card nhưng giao diện vẫn không thấy

```text
Dựa trên bằng chứng BV đã tải, catalog có 12 phần tử và DOM có 8 .book-card,
không thay đổi dữ liệu trước. Hãy kiểm tra lớp hiển thị: computed display/visibility/opacity,
transform, data-aos, trạng thái AOS CDN và media query.

Nếu AOS không tải, áp dụng progressive enhancement để card mặc định vẫn hiện.
Chỉ kích hoạt opacity/transform ẩn khi AOS đã khởi tạo thành công.

Nghiệm thu: chặn AOS CDN vẫn thấy card; bật CDN vẫn có animation; không lỗi Console.
```

**Tư duy được bổ sung:** dùng số liệu để loại trừ tầng dữ liệu và thu hẹp lỗi sang CSS/animation.

#### Trường hợp 15 — Hiệu ứng vũ trụ ngừng chuyển động

```text
Chẩn đoán regression của hiệu ứng hạt nền. Kiểm tra phần tử hạt còn được tạo không,
class animation có đúng không, keyframes có bị ghi đè không và hệ điều hành có bật
prefers-reduced-motion hay không.

Không làm animation mạnh hơn trước khi xác định nguyên nhân. Sau khi sửa, bảo đảm:
- Hạt di chuyển nhẹ trên desktop.
- Mobile giảm số lượng và không chạy hiệu ứng con trỏ.
- Reduced Motion dừng animation theo đúng chủ ý.
- Không nhân đôi hạt sau resize hoặc chuyển trang.
```

**Tư duy được bổ sung:** coi đây là regression cần xác minh trạng thái DOM, CSS và cài đặt accessibility.

#### Trường hợp 16 — Kéo code nhóm mà không mất file cá nhân

```text
Hãy cập nhật origin/main vào workspace hiện tại nhưng bảo toàn mọi file cá nhân.

Trước tiên chạy git status, phân loại file tracked, modified và untracked.
Không dùng reset --hard hoặc clean. Bảo vệ cả file chưa được Git theo dõi, sau đó fetch
và pull theo fast-forward nếu có thể. Khôi phục file cá nhân, kiểm tra conflict và báo
commit trước/sau cùng trạng thái cuối.

Không tự commit hoặc push khi chưa được yêu cầu.
```

**Tư duy được bổ sung:** nhận diện file untracked cũng có nguy cơ và giới hạn rõ các lệnh Git phá hủy dữ liệu.

#### Trường hợp 17 — Tạo tài liệu phân công

```text
Tạo tài liệu Markdown phân công dự án BOOKVERSE cho hai thành viên.

- Dev Bằng: HTML, JavaScript, mô hình dữ liệu, localStorage, nghiệp vụ khách hàng,
  Admin, kiểm thử chức năng và tài liệu.
- Dev Khôi: CSS design system, giao diện khách/Admin, responsive, hiệu ứng 3D,
  nền vũ trụ và kiểm thử đa kích thước.

Không phân công chức năng Chat AI. Tài liệu phải có file phụ trách, điểm phối hợp,
kiểm thử chéo, quy trình Git và phần mỗi người thuyết trình. Các mục phải nhất quán,
không để phần sau vẫn mô tả nhiệm vụ đã loại bỏ.
```

**Tư duy được bổ sung:** cập nhật đồng bộ toàn bộ tài liệu khi phạm vi trách nhiệm thay đổi.

---

## 5. Bộ Prompt chuyên nghiệp xử lý logic khó

Các prompt dưới đây có thể dùng làm phụ lục thuyết trình. Mỗi prompt đều xác định rõ bối cảnh, ràng buộc và cách nghiệm thu.

### Prompt 1 — Khảo sát dự án trước khi chỉnh sửa

```text
Bạn đang làm việc trong dự án BOOKVERSE dùng HTML5, CSS3 và JavaScript ES6+ thuần.

Mục tiêu:
- Khảo sát toàn bộ cấu trúc hiện tại trước khi sửa.
- Xác định file chịu trách nhiệm cho dữ liệu sách, render card, trang chi tiết,
  giỏ hàng, xác thực và Admin.

Ràng buộc:
- Không tạo lại dự án từ đầu.
- Không ghi đè thay đổi hiện có của thành viên khác.
- Không dùng React, Vue, Bootstrap, Tailwind hoặc backend.
- Dùng rg để tìm file và đọc code liên quan trước khi kết luận.
- Chưa chỉnh sửa file ở bước khảo sát.

Đầu ra mong muốn:
1. Sơ đồ module và luồng dữ liệu.
2. Danh sách file liên quan tới yêu cầu.
3. Rủi ro có thể gây xung đột.
4. Kế hoạch sửa nhỏ nhất có thể kiểm thử.
```

**Tư duy thể hiện:** buộc AI đọc trạng thái thật của dự án, tránh sinh mã chung chung hoặc phá phần đã hoàn thành.

### Prompt 2 — Khởi tạo 12 sách ổn định trên mọi thiết bị

```text
Bối cảnh:
- BOOKVERSE triển khai bằng GitHub Pages.
- Máy đã từng mở website có sách nhưng máy mới có thể không thấy sách.
- Dữ liệu người dùng nằm trong localStorage và không đồng bộ giữa thiết bị.

Hãy kiểm tra và sửa cơ chế khởi tạo catalog trong assets/js/storage.js.

Bất biến bắt buộc:
- Mã nguồn luôn chứa 12 sách mặc định hoàn chỉnh.
- Trình duyệt mới phải tự khởi tạo đủ 12 sách.
- Nếu bv_books không tồn tại, không phải mảng hoặc là mảng rỗng thì seed lại.
- Dùng bv_catalog_version để nhận biết phiên bản dữ liệu mẫu.
- Không reset giỏ hàng, đơn hàng, tài khoản, bình luận hoặc dữ liệu Admin.
- Không ghi đè catalog hợp lệ sau mỗi lần tải trang.
- getBooks() phải có fallback an toàn khi localStorage hỏng.

Nghiệm thu:
1. Xóa toàn bộ localStorage rồi reload: có đúng 12 sách.
2. Đặt bv_books thành [] rồi reload: có lại 12 sách.
3. Reload lần hai: dữ liệu không bị nhân đôi.
4. Tạo giỏ hàng trước khi seed lại catalog: giỏ hàng vẫn còn.
5. Console không có lỗi JSON hoặc undefined.

Sau khi sửa, báo rõ file đã đổi, nguyên nhân gốc và các bước kiểm thử.
```

**Logic khó:** phân biệt “dữ liệu mặc định trong source” với “dữ liệu riêng của từng trình duyệt”, đồng thời không phá dữ liệu người dùng.

### Prompt 3 — Chi tiết sách dựa trên query string

```text
Hãy hoàn thiện luồng từ card sách tới book-detail.html bằng JavaScript thuần.

Luồng bắt buộc:
- Mỗi card tạo URL book-detail.html?id=<bookId>.
- Trang chi tiết đọc id bằng URLSearchParams.
- Tìm sách từ BV.getBooks(), không tạo một mảng dữ liệu riêng.
- Nếu id hợp lệ: hiển thị đúng bìa, tên, tác giả, giá, đánh giá,
  tồn kho, mô tả, thông tin xuất bản và sách liên quan.
- Nếu thiếu hoặc sai id: hiển thị empty state có nút về books.html.
- Ảnh lỗi phải có fallback và không làm vỡ layout.
- Số lượng chỉ nhận số nguyên từ 1 đến stock.

Nghiệm thu:
1. Mở book-detail.html?id=BV001 hiển thị BV001.
2. Mở id không tồn tại không phát sinh lỗi Console.
3. Nút thêm giỏ dùng đúng ID và số lượng.
4. Mua ngay cập nhật giỏ trước khi chuyển checkout.
5. Không có event listener bị gắn lặp sau khi render.
```

**Logic khó:** duy trì một nguồn dữ liệu duy nhất và xử lý đầy đủ đường dẫn không hợp lệ.

### Prompt 4 — Giỏ hàng, khuyến mãi và tồn kho

```text
Kiểm tra và hoàn thiện giỏ hàng BOOKVERSE trong assets/js/cart.js và storage.js.

Bất biến nghiệp vụ:
- quantity là số nguyên và luôn nằm trong [1, stock].
- Thêm cùng một bookId phải cộng số lượng, không tạo dòng trùng.
- Không cho tăng vượt tồn kho hoặc giảm xuống 0.
- Thành tiền dòng = salePrice × quantity.
- subtotal = tổng thành tiền các dòng hợp lệ.
- Mã phần trăm: discount = round(subtotal × value / 100).
- Mã số tiền: discount không vượt subtotal.
- Mã chỉ hợp lệ khi active, chưa hết hạn và đạt minOrder.
- total = max(0, subtotal + shipping - discount).
- Giỏ trống có shipping = 0.
- Mọi thay đổi phải lưu localStorage và cập nhật badge header.

Ràng buộc kỹ thuật:
- Không dùng giá gửi từ form làm nguồn sự thật; luôn đọc giá hiện tại từ catalog.
- Bỏ qua an toàn bookId đã bị xóa khỏi catalog.
- Không đăng ký sự kiện trùng sau mỗi lần render.

Nghiệm thu:
1. Thêm một sách hai lần.
2. Thử tăng quá stock.
3. Áp dụng mã sai, hết hạn, chưa đủ giá trị và mã hợp lệ.
4. Xóa một dòng rồi kiểm tra lại tất cả tổng tiền.
5. Reload và xác nhận giỏ vẫn giữ nguyên.
```

**Logic khó:** nhiều đại lượng phụ thuộc nhau và phải cập nhật nhất quán sau mọi thao tác.

### Prompt 5 — Checkout và đồng bộ đơn hàng với Admin

```text
Bối cảnh:
- Checkout dùng giỏ hàng và session hiện tại.
- Admin phải thấy ngay đơn được tạo mà không có backend.

Yêu cầu:
- Nếu giỏ trống, chuyển về cart.html.
- Nếu chưa đăng nhập, chuyển tới login.html?redirect=checkout.html.
- Validate họ tên, điện thoại Việt Nam, email và địa chỉ.
- Chỉ hỗ trợ COD và chuyển khoản mô phỏng; không thu thập dữ liệu thẻ.
- Khi submit hợp lệ, tạo mã đơn duy nhất và snapshot item gồm bookId,
  title, price, quantity và image.
- Lưu subtotal, shipping, discount, total và payment.
- Trạng thái ban đầu là “Chờ xác nhận”.
- history phải có bản ghi trạng thái ban đầu kèm ISO timestamp.
- Lưu vào cùng khóa bv_orders mà Admin đang đọc.
- Chỉ xóa giỏ và coupon sau khi lưu đơn thành công.
- Hiển thị modal có mã đơn để người dùng đối chiếu.

Nghiệm thu:
1. Dữ liệu sai không tạo đơn.
2. Dữ liệu đúng tạo đúng một đơn.
3. Reload Admin → Đơn hàng thấy mã đơn vừa tạo.
4. Tổng đơn ở checkout bằng tổng được lưu.
5. Giỏ hàng trống sau thành công nhưng không trống khi validation thất bại.
```

**Logic khó:** đảm bảo tính nguyên tử ở mức mô phỏng — lưu đơn thành công rồi mới xóa dữ liệu đầu vào.

### Prompt 6 — Máy trạng thái đơn hàng Admin

```text
Hãy mô hình hóa cập nhật trạng thái đơn hàng thành máy trạng thái hữu hạn.

Chuyển trạng thái hợp lệ duy nhất:
- Chờ xác nhận → Đang xử lý hoặc Đã hủy.
- Đang xử lý → Đang giao hoặc Đã hủy.
- Đang giao → Hoàn thành.
- Hoàn thành → không còn trạng thái tiếp theo.
- Đã hủy → không còn trạng thái tiếp theo.

Yêu cầu:
- UI chỉ hiển thị nút của trạng thái tiếp theo hợp lệ.
- Mỗi thay đổi phải hỏi xác nhận.
- Khi đổi thành công, thêm { status, at } vào history.
- Ghi lại bv_orders và render lại bảng, modal, Dashboard, báo cáo.
- Doanh thu chỉ tính đơn Hoàn thành.
- Không cho chỉnh localStorage thông qua một trạng thái không có trong danh sách.

Kiểm thử:
1. Chờ xác nhận không thể nhảy thẳng sang Hoàn thành.
2. Đang giao không thể quay lại Đang xử lý.
3. Đã hủy không xuất hiện nút chuyển tiếp.
4. History tăng đúng một bản ghi sau mỗi chuyển hợp lệ.
5. Dashboard đổi số liệu dựa trên dữ liệu vừa lưu.
```

**Logic khó:** chuyển yêu cầu mơ hồ thành một bảng trạng thái xác định, loại bỏ thao tác tùy tiện.

### Prompt 7 — Phân quyền và ẩn nút Admin đúng cách

```text
Kiểm tra phân quyền demo của BOOKVERSE.

Quy tắc:
- Guest chỉ truy cập trang công khai.
- Customer truy cập account và checkout nhưng không được thấy nút “Vào Admin”.
- Chỉ session có role === 'admin' được mở /admin/*.html.
- Khi Admin đăng xuất, chỉ xóa session; không xóa sách, đơn hoặc tài khoản.
- Nếu truy cập URL Admin không hợp lệ, chuyển về login với thông báo.

Yêu cầu chẩn đoán UI:
- Không chỉ thêm hidden vào HTML.
- Kiểm tra CSS .btn hoặc display có ghi đè [hidden] hay không.
- Với customer, ưu tiên không tạo nút Admin trong DOM.
- Với admin, nút phải tồn tại, hiển thị và điều hướng đúng.
- Nêu rõ đây chỉ là phân quyền phía client cho mục đích học tập.

Nghiệm thu bằng DOM:
- customer → adminButton exists=false hoặc visible=false.
- admin → adminButton exists=true và visible=true.
- guest mở admin/index.html → bị chuyển hướng.
- logout → session mất nhưng catalog và orders vẫn còn.
```

**Logic khó:** phân biệt kiểm soát giao diện, kiểm soát điều hướng và bảo mật thật phía server.

### Prompt 8 — Newsletter đồng bộ sang Admin

```text
Biến form “Đăng ký nhận tin” thành chức năng có dữ liệu thật.

Yêu cầu phía khách hàng:
- Validate định dạng email.
- trim và chuẩn hóa email về chữ thường.
- Chống trùng không phân biệt hoa/thường.
- Lưu object gồm id, email, source, active và createdAt.
- Hiển thị toast thành công hoặc thông báo đã tồn tại.

Yêu cầu phía Admin:
- Đọc đúng cùng khóa localStorage.
- Hiển thị tổng số email và bảng dữ liệu.
- Có tìm kiếm theo email.
- Có xóa với confirm và render lại tổng số.
- Không hiển thị mật khẩu hoặc dữ liệu không liên quan.

Nghiệm thu:
1. Gửi Test@Example.com lần đầu → count tăng 1.
2. Gửi test@example.com lần hai → duplicate, count không tăng.
3. Mở Admin → Khách hàng → thấy đúng email.
4. Xóa email ở Admin → trang tải lại không còn email.
```

**Logic khó:** đồng bộ hai giao diện độc lập qua cùng một nguồn dữ liệu và chuẩn hóa khóa so sánh.

### Prompt 9 — Bình luận sách an toàn

```text
Thêm bình luận và chấm sao cho từng sách trong BOOKVERSE.

Mô hình dữ liệu:
{ id, bookId, userId, name, content, rating, verified, createdAt }

Ràng buộc:
- bookId phải tồn tại trong catalog.
- name từ 2 đến 60 ký tự.
- content từ 5 đến 1000 ký tự.
- rating là số nguyên từ 1 đến 5.
- Chuỗi do người dùng nhập phải render bằng textContent hoặc escapeHTML.
- Không đưa trực tiếp input người dùng vào innerHTML.
- Bình luận được lưu theo bookId và còn sau reload.
- verified chỉ true nếu user đã có đơn Hoàn thành chứa bookId đó.
- Sau khi thêm, phát CustomEvent để giao diện cập nhật mà không reload.

Nghiệm thu:
1. Nội dung quá ngắn bị từ chối.
2. rating ngoài 1–5 bị từ chối.
3. Chuỗi <img src=x onerror=alert(1)> hiển thị như văn bản, không chạy script.
4. Bình luận BV001 không xuất hiện ở BV002.
5. Reload vẫn còn đúng bình luận.
```

**Logic khó:** kết hợp validation, liên kết dữ liệu theo sách và phòng tránh XSS trong ứng dụng front-end.

### Prompt 10 — Chẩn đoán card sách có dữ liệu nhưng không hiển thị

```text
Bằng chứng hiện tại từ Console:
{
  BV: 'object',
  soSach: 12,
  phienBan: '2026.10.24-3',
  soCard: 8
}

Hiện tượng: DOM có card nhưng người dùng không nhìn thấy một số card trên máy khác.

Không sửa dữ liệu ngay. Hãy chẩn đoán theo thứ tự:
1. Kiểm tra CSS computed style: display, visibility, opacity, transform.
2. Kiểm tra class và thuộc tính data-aos.
3. Kiểm tra AOS CDN có tải và khởi tạo thành công không.
4. Kiểm tra card có bị giữ opacity: 0 khi CDN lỗi không.
5. Kiểm tra media query và prefers-reduced-motion.

Giải pháp phải có progressive enhancement:
- Khi AOS hoạt động, giữ hiệu ứng cuộn.
- Khi AOS không tải, nội dung vẫn hiển thị bình thường.
- Không xóa dữ liệu localStorage và không thay đổi logic lọc sách.

Nghiệm thu:
- Chặn CDN AOS rồi reload: card vẫn nhìn thấy.
- Bật lại CDN: animation hoạt động.
- Console không có lỗi gọi AOS khi undefined.
```

**Logic khó:** dùng bằng chứng để loại trừ lỗi dữ liệu và thu hẹp sang lớp hiển thị.

### Prompt 11 — Nền vũ trụ có chuyển động nhưng không gây khó chịu

```text
Hoàn thiện nền gradient vũ trụ và hạt sáng cho BOOKVERSE bằng CSS/JavaScript thuần.

Yêu cầu:
- Có lớp gradient, quầng sáng, hạt nhỏ và một số sao lóe sáng bay lên.
- Các lớp nền dùng pointer-events: none và không che nội dung.
- Animation ưu tiên transform và opacity để giảm repaint.
- Không tạo lại toàn bộ hạt khi resize liên tục.
- Mobile giảm số lượng hạt và tắt hiệu ứng theo con trỏ.
- prefers-reduced-motion: reduce phải dừng chuyển động không cần thiết.
- Màu chữ và nút vẫn đạt độ tương phản ở Light/Dark Mode.

Kiểm thử:
1. Desktop thấy hạt di chuyển nhẹ, không giật.
2. Mobile không tràn ngang và thao tác nút bình thường.
3. Bật Reduce motion thì nội dung còn đầy đủ.
4. Chuyển tab rồi quay lại không nhân đôi lớp hạt.
```

**Logic khó:** cân bằng thẩm mỹ, hiệu năng, khả năng truy cập và tương tác.

### Prompt 12 — Quản lý danh mục không làm hỏng dữ liệu sách

```text
Hoàn thiện CRUD danh mục trong Admin bằng dữ liệu localStorage.

Bất biến:
- Tên danh mục sau trim không được rỗng.
- Không cho trùng tên, không phân biệt hoa/thường.
- Sửa tên danh mục phải có phương án cập nhật category của các sách liên quan.
- Không cho xóa danh mục đang được sách sử dụng nếu chưa chuyển sách sang danh mục khác.
- Mọi thao tác phải có thông báo và render lại từ dữ liệu đã lưu.

Nghiệm thu:
1. Thêm hai tên chỉ khác chữ hoa/thường → lần hai bị từ chối.
2. Xóa danh mục không có sách → thành công.
3. Xóa danh mục đang có sách → bị chặn và nêu số sách liên quan.
4. Reload Admin và books.html → dữ liệu vẫn nhất quán.
```

**Logic khó:** giữ toàn vẹn tham chiếu giữa catalog và danh mục khi không có cơ sở dữ liệu backend.

### Prompt 13 — Git: kéo `main` mà không làm mất file cá nhân

```text
Bối cảnh:
- Nhánh hiện tại có các file tài liệu và slide chưa được Git theo dõi.
- Nhánh main trên remote vừa có commit mới từ thành viên khác.

Hãy cập nhật origin/main an toàn.

Quy trình bắt buộc:
1. Chạy git status và xác định tracked/untracked/modified.
2. Không dùng git reset --hard hoặc git clean.
3. Bảo vệ cả file tracked lẫn untracked trước khi pull.
4. Pull theo fast-forward nếu có thể.
5. Khôi phục file cá nhân và kiểm tra conflict.
6. Báo commit trước/sau và danh sách file còn thay đổi.

Không tự commit hoặc push nếu chưa được yêu cầu.
```

**Logic khó:** cập nhật mã nhóm trong khi bảo toàn tài liệu chưa commit của một thành viên.

---

## 6. Mẫu Prompt sửa lỗi có bằng chứng

Khi có lỗi mới, nhóm dùng mẫu sau thay vì chỉ nói “sửa giúp em”:

```text
[BỐI CẢNH]
Dự án, trang, trình duyệt, nhánh Git và cách đang chạy website.

[HIỆN TƯỢNG]
Mô tả điều nhìn thấy, điều mong đợi và các bước tái hiện.

[BẰNG CHỨNG]
Console error, ảnh chụp, giá trị localStorage, số phần tử DOM,
URL hiện tại và đoạn code liên quan.

[GIẢ THUYẾT CẦN KIỂM TRA]
Liệt kê giả thuyết nhưng không ép AI chọn khi chưa đọc code.

[PHẠM VI]
Cho phép sửa file nào; phần nào phải giữ nguyên.

[RÀNG BUỘC]
Công nghệ, dữ liệu cần bảo toàn, bảo mật và accessibility.

[NGHIỆM THU]
Các bước test cụ thể gồm happy path, edge case và regression.

[ĐẦU RA]
Sửa trực tiếp file, liệt kê nguyên nhân gốc, file đã đổi và kết quả kiểm tra.
```

### Ví dụ điền mẫu

```text
Bối cảnh: GitHub Pages, books.html?release=3, máy mới chưa từng mở site.
Hiện tượng: Console báo BV là object, getBooks() có 12 sách, DOM có 8 card
nhưng giao diện không thấy card.
Bằng chứng: gửi object Console và ảnh màn hình.
Phạm vi: books.js, main.js, animations.css; không reset localStorage.
Nghiệm thu: chặn AOS CDN vẫn thấy card, bật CDN có animation,
desktop/mobile không phát sinh lỗi Console.
Đầu ra: chẩn đoán trước, chỉ sửa khi đã xác định nguyên nhân.
```

---

## 7. Prompt kiểm tra chéo sau khi AI sửa mã

```text
Hãy review thay đổi vừa thực hiện như một QA Front-end độc lập.

Không mở rộng tính năng. Chỉ kiểm tra:
- Có file hoặc đường dẫn nào không tồn tại không?
- Có lỗi cú pháp JavaScript hoặc lỗi Console nghiêm trọng không?
- Event listener có bị gắn lặp sau render không?
- Input người dùng có được escape trước khi hiển thị không?
- Dữ liệu có dùng chung qua window.BV và localStorage không?
- Có trường hợp null/undefined/ID không tồn tại chưa xử lý không?
- CSS có làm tràn ngang ở 360px không?
- prefers-reduced-motion có được tôn trọng không?
- Luồng guest, customer và admin có bị regression không?

Xuất kết quả theo bảng:
Mức độ | File/dòng | Cách tái hiện | Ảnh hưởng | Đề xuất sửa.
Nếu không tìm thấy lỗi, nêu rõ những kiểm tra đã thực hiện; không được suy đoán “đã ổn”.
```

Prompt này tách vai trò “người triển khai” và “người kiểm tra”, giúp giảm việc chấp nhận đầu ra AI theo cảm tính.

---

## 8. Ma trận kiểm chứng đầu ra AI

| Nhóm kiểm tra | Câu hỏi | Cách kiểm chứng |
|---|---|---|
| Đúng yêu cầu | Chức năng có giải quyết đúng vấn đề không? | Chạy lại đúng bước tái hiện ban đầu |
| Không phá dữ liệu | Dữ liệu cũ có còn không? | So sánh các khóa `bv_*` trước và sau |
| Một nguồn dữ liệu | Trang khách và Admin có đọc cùng dữ liệu không? | Tạo ở trang khách, kiểm tra trong Admin |
| Trường hợp biên | Dữ liệu rỗng, sai ID, quá tồn kho xử lý thế nào? | Chủ động nhập dữ liệu bất thường |
| An toàn DOM | Input có thể chèn HTML/script không? | Thử chuỗi có thẻ HTML và event handler |
| Phân quyền | Guest/customer/admin thấy gì? | Test lần lượt ba trạng thái session |
| Responsive | Có tràn ngang hoặc che nút không? | DevTools tại 360/768/1024px |
| Accessibility | Có label, focus và reduced motion không? | Dùng bàn phím và cài đặt hệ điều hành |
| Triển khai | Máy mới có chạy giống máy phát triển không? | Incognito hoặc thiết bị chưa có localStorage |
| Regression | Phần cũ còn hoạt động sau sửa không? | Chạy lại luồng mua hàng end-to-end |

---

## 9. Minh chứng có thể trình bày với giảng viên

### 9.1. Minh chứng trong mã nguồn

- `assets/js/storage.js`: dữ liệu mặc định, catalog version và API `window.BV`.
- `assets/js/cart.js`: các phép tính giỏ hàng và quy tắc khuyến mãi.
- `assets/js/checkout.js`: validate, tạo đơn và đồng bộ `bv_orders`.
- `assets/js/admin.js`: CRUD, máy trạng thái đơn hàng và báo cáo.
- `assets/js/book-detail.js`: bình luận theo sách và kiểm tra dữ liệu.
- `assets/js/main.js`: newsletter, popup, theme và fallback giao diện.
- `assets/css/animations.css`: hiệu ứng 3D, nền vũ trụ và reduced motion.

### 9.2. Minh chứng bằng lịch sử Git

Một số commit thể hiện chu trình phát hiện — sửa — kiểm tra:

| Commit | Ý nghĩa |
|---|---|
| `031b0eb` | Sửa cơ chế khởi tạo sách mặc định |
| `3fef30a` | Sửa catalog rỗng trên thiết bị khác |
| `92bd136` | Xử lý catalog cũ và cache trình duyệt |
| `c5d2dd4` | Sửa nội dung bị ẩn khi AOS CDN lỗi |
| `c1de3ae` | Khôi phục chuyển động nền vũ trụ |
| `9fda017` | Hoàn tác thay đổi chi tiết sách chưa phù hợp |

Việc có commit sửa và commit hoàn tác cho thấy kết quả AI không được chấp nhận tự động; nhóm kiểm tra tác động rồi giữ hoặc loại bỏ thay đổi.

### 9.3. Minh chứng bằng dữ liệu kiểm thử

Có thể mở Console trên trang để trình bày:

```javascript
console.log({
  BV: typeof window.BV,
  soSach: window.BV ? BV.getBooks().length : 0,
  phienBan: localStorage.getItem('bv_catalog_version'),
  soCard: document.querySelectorAll('.book-card').length
});
```

Ý nghĩa:

- `BV === "object"`: module dữ liệu đã tải.
- `soSach === 12`: catalog mặc định tồn tại.
- `phienBan`: cho biết phiên bản dữ liệu đã seed.
- `soCard`: xác định render DOM đã chạy, giúp phân biệt lỗi dữ liệu với lỗi CSS.

### 9.4. Minh chứng giao diện

Các ảnh kiểm thử hiện có trong dự án:

- `qa-full-cover.png`: kiểm tra bìa sách phủ đầy khung.
- `qa-wishlist.png` và `qa-wishlist-v2.png`: kiểm tra luồng yêu thích.
- `chrome-clean.png`: ảnh kiểm tra trên trình duyệt.
- `BOOKVERSE_Slide_Preview.png`: bản xem trước slide thuyết trình.

---

## 10. Kịch bản trình bày phần Prompt Engineering

### Bản nói khoảng 60 giây

> “Nhóm em không đưa một yêu cầu lớn rồi sử dụng ngay kết quả AI. Trước tiên nhóm phân rã dự án theo quan hệ phụ thuộc: dữ liệu, trang sách, giỏ hàng, xác thực, checkout rồi Admin. Với mỗi chức năng, prompt đều có bối cảnh, phạm vi file, ràng buộc và tiêu chí nghiệm thu. Ví dụ khi máy khác không thấy sách, nhóm không yêu cầu tạo lại dữ liệu mà cung cấp bằng chứng từ Console: đối tượng BV đã tồn tại, có 12 sách và DOM có card. Từ đó phạm vi lỗi được thu hẹp sang cache hoặc CSS/AOS. Sau khi AI đề xuất sửa, nhóm kiểm tra lại trên trình duyệt mới, localStorage và GitHub Pages. Vì vậy AI là công cụ hỗ trợ triển khai; quyết định kỹ thuật và trách nhiệm kiểm chứng vẫn thuộc về nhóm.”

### Bản nói khoảng 2 phút

> “Quy trình của nhóm gồm tám thành phần: Context, Objective, Scope, Constraints, Invariants, Acceptance Criteria, Verification và Refinement. Với giỏ hàng, nhóm không chỉ nói ‘làm giỏ hàng’, mà quy định quantity phải từ 1 đến tồn kho, tổng tiền phải được tính lại sau mọi thao tác, giảm giá không vượt tạm tính và mọi thay đổi phải lưu localStorage. Với đơn hàng Admin, nhóm mô tả rõ máy trạng thái để không thể nhảy từ Chờ xác nhận thẳng sang Hoàn thành. Với bình luận, nhóm yêu cầu dữ liệu gắn theo bookId và input phải được escape để tránh XSS. Khi lỗi xuất hiện, nhóm cung cấp hiện tượng và bằng chứng rồi giới hạn file được phép sửa. Cuối cùng nhóm kiểm thử happy path, edge case và regression. Lịch sử commit có cả các lần sửa catalog, xử lý AOS và hoàn tác thay đổi chưa phù hợp, thể hiện nhóm không chấp nhận đầu ra AI một cách tự động.”

---

## 11. Câu hỏi phản biện và trả lời đề xuất

### “AI có làm toàn bộ dự án thay nhóm không?”

Không. AI hỗ trợ triển khai theo yêu cầu đã được nhóm phân tích. Nhóm quyết định mô hình dữ liệu, ràng buộc nghiệp vụ, phạm vi thay đổi và tiêu chí kiểm thử; đồng thời phải đọc và giải thích được mã nguồn cuối cùng.

### “Làm sao chứng minh nhóm kiểm soát được AI?”

Nhóm cung cấp prompt có cấu trúc, ma trận nghiệm thu, dữ liệu Console, ảnh kiểm thử và lịch sử commit. Một số thay đổi không đạt đã được yêu cầu sửa tiếp hoặc hoàn tác thay vì giữ nguyên.

### “Prompt dài có đồng nghĩa với prompt tốt không?”

Không. Prompt tốt phải đủ thông tin để giảm mơ hồ và tạo kết quả kiểm chứng được. Với tác vụ nhỏ, prompt ngắn nhưng có hiện tượng, phạm vi và điều kiện hoàn thành vẫn hiệu quả hơn prompt dài nhưng chung chung.

### “Tại sao phải chỉ định bất biến?”

Bất biến biến yêu cầu nghiệp vụ thành quy tắc có thể kiểm thử. Ví dụ `1 ≤ quantity ≤ stock` rõ ràng hơn câu “không cho nhập số lượng sai”.

### “Nếu AI đưa ra mã chạy được nhưng khó hiểu thì sao?”

Nhóm yêu cầu giải thích luồng dữ liệu, tách hàm theo nhiệm vụ và giữ công nghệ phù hợp trình độ môn học. Mã không giải thích được hoặc vượt ngoài phạm vi đề bài không nên được sử dụng.

### “Website front-end có bảo mật thật không?”

Không. Phân quyền và dữ liệu trong `localStorage` chỉ là mô phỏng học tập. Người dùng có thể sửa dữ liệu bằng DevTools; hệ thống thực tế cần backend, database, hash mật khẩu và kiểm tra quyền phía server.

---

## 12. Checklist trước khi nộp minh chứng

- [ ] Điền họ tên, mã sinh viên, lớp và giảng viên trong README.
- [ ] Có ít nhất một prompt khởi tạo, một prompt logic khó và một prompt debug.
- [ ] Mỗi prompt logic khó có ràng buộc và tiêu chí nghiệm thu.
- [ ] Chỉ ra file mã nguồn tương ứng với từng prompt.
- [ ] Demo một trường hợp thành công và một trường hợp biên.
- [ ] Giải thích được ít nhất một nguyên nhân gốc của lỗi đã sửa.
- [ ] Trình bày rõ giới hạn của `localStorage` và phân quyền phía client.
- [ ] Không đưa API key, mật khẩu cá nhân hoặc dữ liệu nhạy cảm vào tài liệu.
- [ ] Kiểm tra lại các commit ID trước khi đưa vào slide chính thức.

---

## 13. Kết luận

Minh chứng quan trọng nhất không phải số lượng câu lệnh đã gửi cho AI, mà là khả năng:

1. Chuyển yêu cầu chung thành quy tắc rõ ràng.
2. Phân rã bài toán theo quan hệ phụ thuộc.
3. Cung cấp bằng chứng thay vì đoán nguyên nhân.
4. Giới hạn phạm vi thay đổi để tránh regression.
5. Xây dựng tiêu chí nghiệm thu có thể lặp lại.
6. Kiểm tra, phản biện và hoàn tác khi đầu ra chưa phù hợp.

Đó là tư duy điều khiển AI có trách nhiệm trong quá trình xây dựng BOOKVERSE.
