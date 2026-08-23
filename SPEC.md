# SPECIFICATION: PMT Gunny Master — Modern Gaming Utility Dashboard

> **Phiên bản**: 3.0.0 (Premium Gaming Utility Dashboard Edition)  
> **Kiến trúc**: Vanilla ES6 Modular Static Web App (Zero heavy dependencies, 100% Client-side, Ultra-fast, Accessible, Fully Responsive)  
> **Repository**: [https://github.com/TuanSOC/Gunny](https://github.com/TuanSOC/Gunny)

---

## 1. Mục Tiêu Thiết Kế (Design Objective)

Nâng cấp toàn diện giao diện frontend từ phong cách bảng tính rời rạc thành một **Hệ Thống Trợ Thủ & Bảng Điều Khiển Game Cao Cấp (Modern, Premium Gaming Utility Dashboard)**:
- **Phong cách visual**: Sự kết hợp giữa *Premium Gaming Companion* + *Modern Dashboard* + *Technical Precision Tool*. Tông màu tối (Dark theme) sang trọng, sạch sẽ, card nổi nhẹ nhàng, viền tinh tế, điểm nhấn cyan/purple/amber gold, typography hiện đại (Inter + Outfit), visual hierarchy rõ nét, không lạm dụng neon chói mắt hay animation giật lag.
- **Nguyên tắc cốt lõi**: **TUYỆT ĐỐI KHÔNG làm thay đổi, làm sai lệch hoặc phá vỡ bất kỳ logic tính toán, dữ liệu, công thức, ID phần tử, router hay core engine hiện có**.

---

## 2. Cấu Trúc Khung Ứng Dụng (Application Shell)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ TOP HEADER: [Logo + Title] [Global Search Ctrl+K] [Theme/Sound] [Contact]   │
├───────────────────┬─────────────────────────────────────────────────────────┤
│ COLLAPSIBLE       │ BREADCRUMB & MAIN CONTENT AREA                          │
│ SIDEBAR           │ ┌─────────────────────────────────────────────────────┐ │
│ ───────────────── │ │ [Dashboard Hub] / [Character Overview] /            │ │
│ 📊 Tổng Quan      │ │ [21 Calculators] / [Ballistics AI] /                │ │
│ 👤 Hồ Sơ NV       │ │ [Fashion Wiki] / [Services PMT]                     │ │
│ ⚔️ Trang Bị & Rèn │ │                                                     │ │
│ 🐾 Pet & Thú Cưỡi │ │ • Standardized Resource Cards (Gold/Cyan/Purple)    │ │
│ 🔥 Hóa Thần       │ │ • Live Trajectory Radar Canvas                      │ │
│ 🎯 Thước Bắn Góc  │ │ • Filterable Knowledge Base & Catalogs              │ │
│ 👗 Kho Thời Trang │ │ • Step-by-Step Level Breakdown Tables               │ │
│ 👑 Dịch Vụ PMT    │ └─────────────────────────────────────────────────────┘ │
└───────────────────┴─────────────────────────────────────────────────────────┘
```

### A. Left Sidebar (Thanh Điều Hướng Bên Trái)
- Khả năng **Thu gọn (Collapse)** / Mở rộng linh hoạt với lưu trạng thái vào `localStorage`.
- Phân nhóm logic chuyên nghiệp:
  1. **TỔNG QUAN**: Dashboard (Trang Chủ Hub), Character Overview (Tổng Quan Tiến Độ & Lực Chiến).
  2. **TRANG BỊ & RÈN (7 tính năng)**: Gia Công, Châu Báu, Phụ Ma, Đúc Hồn, Ngọc Vũ Khí, Mảnh Ngọc Lam, Đột Phá Thẻ Bài.
  3. **PET & THÚ CƯỠI (8 tính năng)**: Tiến Hóa Pet, Manh Hóa, Linh Hạch, Tài Năng, Thú Cưỡi, Ngọc Tọa Kỵ, Ô Tinh Hạch, Cá Tính Pet.
  4. **HÓA THẦN & THẦN KHÍ (6 tính năng)**: Miếu Thần, Hóa Thần Tu Luyện, Thần Hộ Mệnh, EXP Ma Thạch, Vật Tổ, Chiến Hồn.
  5. **CÔNG CỤ & WIKI**: Thước Bắn Góc (AI Ballistics), Kho Thời Trang (540+ Set), Dịch Vụ PMT Gaming.
- Trên thiết bị di động (<= 1024px), sidebar chuyển thành **Slide-in Drawer** có backdrop mượt mà, không gây tràn viền (horizontal overflow).

### B. Top Header (Thanh Tiêu Đề Trên Cùng)
- Nút Toggle Sidebar (trên mobile và desktop).
- Logo Gunny Master phát sáng tinh tế kèm Subtitle.
- Thanh **Global Search Bar** với placeholder `"Tìm tính năng, vũ khí, công thức... (Ctrl + K)"` mở Command Palette.
- Bộ chuyển Theme 4 chế độ (Cyan, Gold, Purple, Emerald).
- Toggle Âm thanh Web Audio API.
- Nút liên hệ nhanh Zalo / Facebook PMT và Trạng thái kết nối.

### C. Reusable Design System Components
- `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`, `btn-icon`
- `form-group`, `input-select`, `input-number`, `slider-neon`
- `stat-box`, `resource-card`, `glass-card`, `card-header-bar`
- `badge` (Gold, Cyan, Purple, Green, Red)
- `data-table`, `breakdown-table`, `formula-compare-table`
- `modal-overlay`, `command-palette-card`
- `toast-container`, `toast-item`

---

## 3. Các Trang & Chức Năng Chi Tiết (Views & Features)

### 1. Dashboard (Trang Chủ Hub)
- Banner chào đón Gunner với thống kê hệ thống (21 Calculators, 540+ Sets, 6 Công thức, 100% Dữ liệu chuẩn).
- Quick Actions card truy cập nhanh các tính năng phổ biến nhất.
- Khối phân loại hệ thống thông minh (Trang bị, Pet, Hóa Thần) với 1-click chuyển đến từng bảng tính.

### 2. Character Overview (Hồ Sơ & Tiến Độ Nhân Vật)
- Dashboard trực quan hiển thị Lực Chiến Ước Tính và Tỷ Lệ Tiến Độ Toàn Diện.
- Lưới Card Tiến Độ cho từng hệ thống (Gia Công, Pet, Thú Cưỡi, Đúc Hồn, Phụ Ma, Thần Hộ Mệnh, Vật Tổ...).
- Mỗi card hiển thị cấp hiện tại, mốc max, thanh tiến độ % và nút điều hướng tức thì tới Calculator tương ứng.

### 3. Hệ Thống 21 Calculators Chuẩn Hóa
- Form nhập liệu gọn gàng: Mốc bắt đầu và Mốc mục tiêu nằm cạnh nhau trên desktop.
- Hộp tổng kết tài nguyên nổi bật (Resource Cards): Đá, Đồng, Bạc, Vàng, Ngọc, Cỏ, EXP, Thuốc... với số lượng lớn, định dạng phân cách hàng nghìn.
- Bảng phân tích chi tiết từng bước nâng (Itemized Step-by-Step Breakdown) kèm nút Sao Chép Báo Cáo 1-click.
- Bảng tra cứu dữ liệu gốc đầy đủ (Master Data Table).

### 4. Thước Bắn Góc & Radar Parabol (AI Ballistics)
- Đưa khung mô phỏng Quỹ Đạo Radar Parabol (SVG Canvas) lên vị trí trung tâm, trực quan và sắc nét.
- 6 Công thức kinh điển: 65° Chuẩn, 70° Chiều sâu, 50° Tầm trung, 30° Đường thẳng, 20° Siêu thấp, 90° Siêu cao.
- Bảng so sánh đa công thức tự động tính toán theo Gió và Khoảng cách theo thời gian thực.
- Thanh đo lực bắn Power Gauge động.

### 5. Kho Thời Trang & Wiki (Fashion Knowledge Base)
- Danh mục 540+ Set trang phục & 1,139+ vật phẩm (Cánh, Bong bóng, Nón, Áo, Tóc...).
- 2 Chế độ hiển thị: Xem theo trọn bộ và Xem chi tiết từng món.
- Bộ lọc nhanh (Pills) + Search tức thì + Lọc giới tính & loại trang bị.
- Card thời trang sắc nét có nút sao chép tên/danh sách món 1-click.

### 6. Dịch Vụ & Liên Hệ PMT
- Bảng giới thiệu các gói dịch vụ Gunny uy tín (Up acc, tối ưu xu, cày phó bản, đua top LC...).
- Hộp liên hệ Zalo & Facebook với nút sao chép SĐT Zalo tích hợp Toast thông báo.

### 7. Global Command Palette (`Ctrl + K` / `Cmd + K`)
- Tìm kiếm nhanh tức thì toàn bộ 21 tính năng, 6 công thức bắn, thời trang và dịch vụ.

---

## 4. Kế Hoạch Kiểm Thử & Đảm Bảo Chất Lượng (Verification)

1. **Automated Unit Tests**:
   - Chạy toàn bộ test suite Pytest `tests/test_gunny_engine.py` (33/33 tests passed).
2. **Visual & Responsive Testing**:
   - Kiểm tra hiển thị trên các kích thước màn hình: 320px (iPhone SE), 375px, 414px (iPhone Pro Max), 768px (iPad/Tablet), 1024px (Small Laptop), 1440px (Desktop Full HD).
   - Đảm bảo 0 lỗi console, 0 horizontal overflow.
3. **Logic Integrity**:
   - Đảm bảo 21/21 calculators trả về số liệu tính toán chính xác tuyệt đối như bản gốc.
