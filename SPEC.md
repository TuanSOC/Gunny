# SPECIFICATION & ROADMAP: PMT Gunny Master — Modern Gaming Utility Dashboard & Services Hub

> **Phiên bản**: 3.1.0 (PMT Services & Future Roadmap Edition)  
> **Kiến trúc**: Vanilla ES6 Modular Static Web App (Zero heavy dependencies, 100% Client-side, Ultra-fast, Accessible, Fully Responsive)  
> **Repository**: [https://github.com/TuanSOC/Gunny](https://github.com/TuanSOC/Gunny)

---

## 1. Mục Tiêu Tổng Thể (Primary Objectives)

1. **Nhấn Mạnh & Tối Đa Hóa Chuyển Đổi Dịch Vụ PMT Gaming**:
   - Tích hợp **Welcome & Promo Modal Popup (Popup Dịch Vụ PMT)** hiển thị ngay khi người dùng vào trang (hỗ trợ ghi nhớ "Không nhắc lại hôm nay" qua `localStorage` và nút mở lại bất cứ lúc nào từ Header).
   - Nút liên hệ trực tiếp: Chat Zalo (`0981052217`), Sao chép SĐT 1-click với Toast thông báo, Facebook PMT (`fb.com/tinyy139`).
2. **Kế Hoạch & Lộ Trình Phát Triển Dài Hạn (Comprehensive Future Roadmap)**:
   - Xây dựng lộ trình 6 giai đoạn đưa PMT Gunny Master trở thành siêu trợ thủ Gunny hàng đầu thị trường.

---

## 2. Thiết Kế Chi Tiết Popup Dịch Vụ PMT (Welcome Promo Modal)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 👑 DỊCH VỤ GUNNY TRỌN GÓI — PMT GAMING                           [ ✕ Đóng ] │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │                  [ BANNER PMT GAMING — LỰC CHIẾN 8B+ ]                  │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ✨ Nâng Tầm Lực Chiến & Đồng Hành Cùng Gunner Đua Top Server Mới / Cũ       │
│                                                                             │
│  • 🚀 Up LC Siêu Tốc & Đua Top          • 🪙 Tối Ưu Tiêu Xu Thông Minh      │
│  • 🔨 Tối Ưu Cường Hóa & Rèn Đồ         • 💎 Hướng Dẫn & Build Acc Newbie   │
│  • 🚜 Cày Thuê Phó Bản & Ải Khó         • ⚔️ Hỗ Trợ Đấu Rank Siêu Cấp       │
│                                                                             │
│  ┌─────────────────────────┐  ┌───────────────────┐  ┌──────────────────┐  │
│  │ 💬 Chat Zalo 0981052217 │  │ 📋 Copy SĐT Zalo  │  │ 📘 Facebook PMT  │  │
│  └─────────────────────────┘  └───────────────────┘  └──────────────────┘  │
│                                                                             │
│  [x] Không hiển thị lại hôm nay               [ 🚀 Khám Phá Công Cụ Ngay ➔ ] │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Chi tiết hành vi Popup:
- **Tự động kích hoạt**: Khi người dùng vào trang lần đầu, popup sẽ xuất hiện với hiệu ứng mờ kính mượt mà (`fadeInModal`).
- **Ghi nhớ thông minh**: Khi người dùng chọn *"Không hiển thị lại hôm nay"* hoặc bấm *"Khám Phá Công Cụ Ngay"*, trạng thái ngày hiện tại sẽ được lưu vào `localStorage` (`pmt_dismiss_service_popup_date`).
- **Nút Mở Lại Bất Kỳ Lúc Nào**: Nút `👑 Dịch Vụ PMT` nổi bật trên Top Header cho phép người dùng mở lại popup bất cứ khi nào cần.

---

## 3. Lộ Trình Phát Triển Chi Tiết (Comprehensive Feature Roadmap)

### 📌 Giai Đoạn 1: Hồ Sơ Nhân Vật & Lưu Trữ Đa Tài Khoản (Character Profile Engine)
- **Mô tả**: Cho phép người chơi nhập cấp độ hiện tại của nhân vật mình cho tất cả 21 hệ thống.
- **Tính năng**:
  - Lưu trữ hồ sơ nhân vật vào `localStorage` (hỗ trợ tạo nhiều acc: Acc Chính, Acc Phụ, Acc Cày Thuê).
  - Tự động tính toán tổng số nguyên liệu còn thiếu để đạt mốc mục tiêu mong muốn.
  - Dự đoán điểm Lực Chiến tăng thêm (Estimated Battle Power Delta).

### 📌 Giai Đoạn 2: Túi Mục Tiêu & Trích Xuất Báo Giá (Goal Shopping Bag & Quote Exporter)
- **Mô tả**: Chọn nhiều mục tiêu nâng cấp cùng lúc (ví dụ: Gia công 14 + Cá tính 60 + Thần hộ mệnh 70) và gộp thành 1 danh sách nguyên liệu tổng thể.
- **Tính năng**:
  - Xuất báo cáo đẹp mắt dạng Text / Ảnh chụp báo giá để người chơi gửi trực tiếp cho PMT Gaming báo giá dịch vụ kéo acc.
  - Nút "Gửi Yêu Cầu Cho PMT" tự động soạn sẵn tin nhắn Zalo kèm thông số cần nâng.

### 📌 Giai Đoạn 3: Tra Cứu & So Sánh Vũ Khí / Pet (Interactive Weapon & Pet Database)
- **Mô tả**: Kho dữ liệu vũ khí và pet Gunny chuẩn xác.
- **Tính năng**:
  - Bộ lọc vũ khí theo loại: WOW, VIP, Super, Legend, Vật Phẩm Thần Thoại.
  - So sánh trực quan thông số giữa 2 vũ khí hoặc 2 Pet (Sát thương, Nhanh nhẹn, Thủ, May mắn, Góc bắn min-max).

### 📌 Giai Đoạn 4: Nhật Ký Cày Cuốc & Lịch Sự Kiện Gunny (Daily Quest & Event Tracker)
- **Mô tả**: Danh sách việc cần làm hằng ngày cho Gunner.
- **Tính năng**:
  - Check-list phó bản hằng ngày, nhiệm vụ nông trại, boss thế giới, giờ xuất hiện x2 exp.
  - Đếm ngược thời gian reset ngày mới và giờ boss.

### 📌 Giai Đoạn 5: Trợ Thủ Bắn Góc Nâng Cao (Smart Ballistics Pro)
- **Mô tả**: Bổ sung các công thức đặc biệt và chế độ căn màn hình ảo.
- **Tính năng**:
  - Thêm công thức 3 vạch, 5 vạch, góc siêu cao 90° nâng cao theo tỉ lệ gió lẻ 0.05.
  - Thước đo overlay trong suốt hỗ trợ căn khoảng cách màn hình trực quan.

### 📌 Giai Đoạn 6: Ứng Dụng Đa Nền Tảng (PWA & Offline Support)
- **Mô tả**: Đóng gói thành Progressive Web App (PWA).
- **Tính năng**:
  - Cài đặt như app native trên Windows, Android, iOS.
  - Chạy mượt mà offline không cần mạng, dữ liệu tự cache 100%.

---

## 4. Kế Hoạch Kiểm Thử & Xác Thực (Verification Plan)

1. **Kiểm thử Unit Tests**: Toàn bộ 33/33 Pytest unit tests phải luôn PASS 100%.
2. **Kiểm thử UI & Trình Duyệt**:
   - Popup dịch vụ hiển thị chuẩn xác, không làm vỡ giao diện.
   - Nút Copy SĐT Zalo hoạt động và bật Toast thông báo.
   - Nút đóng và ghi nhớ ngày hoạt động trơn tru.
   - 0 lỗi console trên cả Desktop và Mobile.
