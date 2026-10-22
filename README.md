# Luyện chép từ vựng tiếng Anh – PWA

## Cài đặt lên GitHub Pages
1. Tạo repository công khai trên GitHub, ví dụ `luyen-tu-vung`.
2. Giải nén ZIP và tải **toàn bộ các file trong thư mục** lên thư mục gốc của repository (đặc biệt phải có `index.html`, `sw.js`, `manifest.webmanifest`).
3. Vào **Settings → Pages → Build and deployment → Deploy from a branch**, chọn `main` và `/ (root)`, nhấn Save.
4. Mở `https://TEN-TAI-KHOAN.github.io/luyen-tu-vung/` bằng HTTPS. Chờ GitHub Pages triển khai.

## Cài đặt ứng dụng
- **iPhone (Safari):** mở website → Chia sẻ → Thêm vào Màn hình chính. Chrome iOS có thể có tùy chọn tương tự tùy phiên bản, Safari là lựa chọn ổn định.
- **Android (Chrome):** mở website → menu ⋮ → Cài đặt ứng dụng hoặc Thêm vào màn hình chính.
- **Máy tính (Chrome/Edge):** mở website → biểu tượng Cài đặt trên thanh địa chỉ hoặc menu → Install app.

## Sử dụng và lưu dữ liệu
- Các bài luyện chép, Flashcard, lựa chọn từ, số lần đúng/sai và dữ liệu CSV đã nhập lưu trong **localStorage của từng trình duyệt/thiết bị**.
- Không tự đồng bộ giữa các thiết bị. Xóa dữ liệu website, chế độ riêng tư, hoặc gỡ ứng dụng (tùy hệ điều hành) có thể xóa tiến độ.
- Tránh dùng chế độ riêng tư. Dữ liệu lớn có thể vượt giới hạn localStorage của trình duyệt.
- Để nhập CSV ngoại tuyến, chọn file CSV có sẵn trên thiết bị.

## Ngoại tuyến
- Sau khi **mở website thành công ít nhất một lần khi có mạng**, trang HTML, giao diện, script, biểu tượng và dữ liệu cục bộ được dùng khi ngoại tuyến.
- Google Sheets **cần mạng** để tải bảng mới; CSV có sẵn trên thiết bị vẫn dùng được.
- Kokoro AI tải `kokoro-js` từ CDN và mô hình từ nguồn ngoài. **Không bảo đảm ngoại tuyến**; tùy trình duyệt mô hình có thể được cache riêng nhưng service worker không lưu trọn bộ tài nguyên này. Nếu không tải được, ứng dụng thử chuyển sang giọng trình duyệt.
- Giọng Speech Synthesis của trình duyệt có thể cần dữ liệu giọng đọc trực tuyến trên một số hệ điều hành; không bảo đảm phát âm ngoại tuyến trên mọi thiết bị.

## Cập nhật
1. Thay file `index.html` bằng phiên bản HTML mới, **giữ nguyên tên khóa localStorage** (`vocab_data`, `vocab_progress`, `vocab_flash_ratings`, v.v.) để bảo toàn dữ liệu.
2. Mỗi lần phát hành, tăng `APP_VERSION` trong `sw.js`, ví dụ `v1.0.0` → `v1.0.1`.
3. Tải các file thay đổi lên GitHub. Khi trình duyệt phát hiện Service Worker mới, banner cập nhật xuất hiện; nhấn **Cập nhật ứng dụng**. Có thể cần mở lại ứng dụng để kiểm tra bản mới.
4. Không xóa localStorage khi nâng cấp. Nếu thay đổi cấu trúc dữ liệu, cần viết migration tương thích.

## Kiểm tra thủ công sau khi triển khai
- Mở trang online, cài ứng dụng, tắt mạng rồi tải lại: vẫn xem được giao diện.
- Luyện chép đúng/sai, đóng mở ứng dụng: thống kê giữ nguyên.
- Chọn từ, dùng Flashcard, đánh dấu Đã nhớ/Chưa nhớ, đóng mở: dữ liệu giữ nguyên.
- Nhập CSV offline và kiểm tra từ mới.
- Thử Google Sheets khi online, xác nhận lỗi có thông báo khi offline.
- Thử phát âm trình duyệt và Kokoro online; thử riêng offline để xác định khả năng của thiết bị.
- Tăng APP_VERSION và triển khai lại, kiểm tra banner cập nhật.

**Lưu ý:** Mã được kiểm tra cấu trúc và tính nhất quán tĩnh; chưa thể xác nhận mọi tính năng thực tế trên iPhone/Android hoặc tải mô hình Kokoro trong môi trường này.
