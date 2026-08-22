# SPECIFICATION: Gunny Master — Standalone Web Application

## 1. Overview & Objectives
**Gunny Master Web App** là trang web tĩnh (Static Web Application) độc lập, hiện đại, hỗ trợ toàn diện 100% nhu cầu tra cứu và tính toán cho Gunner trên mọi nền tảng (PC, Tablet, Mobile):
1. **12 Bảng Tra Cứu Nguyên Liệu Master**: Gia Công (0->14 MAX), Tiến Hóa Pet, Ma Thạch EXP, Quy Đổi Châu Báu, Up Thú Cưỡi, Up Phụ Ma, Up Vật Tổ, Đúc Hồn, Chiến Hồn Đơn, Manh Hóa Pet, Ngọc Thú Cưỡi, Mảnh Ngọc Lam.
2. **Thước Tính Góc & Lực Bắn Trực Quan (Ballistics Assistant)**: Công thức Góc 65, Góc 70, Góc 30, Siêu Cao (Góc 90), Góc 50 kèm điều chỉnh gió/khoảng cách và đường đạn SVG Canvas tương tác.
3. **Bộ Mô Phỏng Lực Chiến (Power Simulator)**: Tính toán & dự đoán Lực chiến chi tiết dựa trên cấp cường hóa, trang bị, châu báu, tu luyện và tọa kỵ.
4. **Wiki Phó Bản & Kho Vũ Khí (Dungeon & Weapon DB)**: Tra cứu phó bản chiến thuật và bộ 4 chỉ số cơ bản của Vũ khí (**Tấn Công**, **Phòng Thủ**, **Nhanh Nhẹn**, **May Mắn**).

---

## 2. Feature Matrix (Danh Sách Tính Năng Web App)

### A. 🧮 12 Bảng Tra Cứu Nguyên Liệu Master
- **Gia Công**: Level 0 -> Level 14 MAX (4,091 Đá | 6,142 Đồng | 7,468 Bạc | 8,195 Vàng | 8,690 Ngọc).
- **Tiến Hóa Pet**: Level 1 -> Level 50 (80,903 Cỏ Thiên Điệp).
- **Ma Thạch EXP**: Hoàn Mỹ, Siêu Việt, Truyền Thuyết (Level 2 -> 10).
- **Quy Đổi Châu Báu**: Châu Báu Lv 13 -> 21.
- **Up Thú Cưỡi**: 9 Loại Thú Cưỡi từ Ngựa -> Cỗ Máy Thời Gian (Level 1 -> 10).
- **Up Phụ Ma**: Bậc 1 -> Bậc 5 (Đá Phụ Ma).
- **Up Vật Tổ**: Level 1 -> Level 50 (1,496,690 Xu / Vé).
- **Đúc Hồn**: Level 1 -> 5 (Đồng, Bạc, Vàng, Kim Cương).
- **Chiến Hồn Đơn**: Level 1 -> 5 & Kim Hồn (1 Tụ vs 3 Tụ).
- **Manh Hóa Pet**: Mốc 1 -> Mốc 29 (Số lượng mảnh cần).
- **Ngọc Thú Cưỡi**: Quy đổi Ngọc 1, 2, 3 cho Thú cưỡi (3,656 Ngọc 1).
- **Mảnh Ngọc Lam**: Cấp 1 -> Cấp 9 (18,600 Mảnh).

### B. 🎯 Thước Tính Góc & Lực Bắn (Ballistics Engine & Trajectory Arc)
- Công thức Góc 65, Góc 70, Góc 30, Siêu Cao (Góc 90), Góc 50.
- Điều chỉnh gió xuôi / gió ngược, khoảng cách màn hình (1 - 20 đoạn).
- Mô phỏng độ cong đường đạn đồ họa SVG Canvas kết hợp góc & lực bắn tối ưu.

### C. ⚡ Bộ Mô Phỏng Lực Chiến (Power Engine)
- Tính toán tổng Lực chiến theo các thông số nhân vật (Vũ khí cơ bản, Cường hóa, Châu báu, Tu luyện, Thẻ bài, Pet, Tọa kỵ, Ma thạch).

### D. 📖 Hướng Dẫn Phó Bản & Kho Vũ Khí (4 Chỉ Số Cơ Bản)
- Chiến thuật phó bản (Khu Rừng Ma Thuật, Đấu Trường Dũng Sĩ, Rồng Băng Giá, Kiến Vương, Vua Gà, Ma Vương, Đào Hoa Đảo).
- Kho Vũ khí tra cứu 4 chỉ số cơ bản: **Tấn Công**, **Phòng Thủ**, **Nhanh Nhẹn**, **May Mắn**.

---

## 3. Architecture & Files
- `index.html` (Trang chủ tĩnh duy nhất)
- `css/style.css` (Hệ thống giao diện Modern Premium Glassmorphic)
- `js/app.js` (Logic web client độc lập)
- `src/core/calculatorEngine.js`
- `src/core/ballisticsEngine.js`
- `src/core/powerEngine.js`
- `src/data/*.js` (Dữ liệu 12 bảng & Wiki)
- `server.js` (Server chạy localhost đơn giản)
- `scripts/test_engine.js` (Unit test kiểm định thuật toán)

---

## 4. Verification Plan
- Runs `node scripts/test_engine.js` để đảm bảo độ chính xác 100% của 10 bảng tính.
- Khởi động local dev server bằng `node server.js` và kiểm tra giao diện trên `http://localhost:8080/`.
