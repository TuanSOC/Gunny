# SPECIFICATION: Gunny Master — Complete Companion, Planner & Optimizer

> **Phiên bản**: 2.1.0  
> **Kiến trúc**: Vanilla ES6 Modular Static Web App (Zero heavy dependencies, siêu nhẹ, siêu mượt)  
> **Repository**: [https://github.com/TuanSOC/Gunny](https://github.com/TuanSOC/Gunny)

---

## 1. Mục Tiêu Tổng Thể (Primary Objective)
Tiến hóa Gunny Master từ một tập hợp các bảng tính rời rạc thành một **Hệ Thống Trợ Thủ Toàn Diện (Gunny Companion / Character Planner / Resource Optimizer / Wiki)**:
1. **Tra Cứu Dữ Liệu Chuẩn**: 17 Bảng nâng cấp, Kho thời trang 540+ set, Dữ liệu Vũ khí & Pet.
2. **Hồ Sơ Nhân Vật (Character Planner)**: Quản lý cấp độ hiện tại của nhân vật trên mọi hệ thống (Gia công, Thú cưỡi, Pet, Phụ ma, Vật tổ, Đúc hồn, Tu luyện...).
3. **Mục Tiêu Nâng Cấp (Target Goal Planner)**: Thiết lập mục tiêu mong muốn và tính toán chính xác tổng tài nguyên còn thiếu.
4. **Mô Phỏng Chuỗi Quy Đổi Tài Nguyên (Resource Conversion Chain)**: Tính toán chuỗi chuyển đổi cấp tiến (Đá ➔ Đồng ➔ Bạc ➔ Vàng ➔ Ngọc) và cấp tối đa có thể đạt được.
5. **Gợi Ý Nâng Cấp Tối Ưu (Upgrade Optimizer)**: Xếp hạng độ hiệu quả `Power Gain / Resource Cost` giúp người chơi đầu tư tài nguyên thông minh nhất.
6. **So Sánh Vũ Khí & Pet (Comparison Engine)**: So sánh trực quan thông số giữa 2 vũ khí hoặc pet.
7. **Thước Bắn Góc & Quỹ Đạo Đạn (Ballistics Assistant)**: Công thức 65, 90, 70, 50, 30, 20 chuẩn xác 100%.
8. **Dự Toán Thời Gian Cày Cuốc (Daily Planner & ETA)**: Tính số ngày hoàn thành mục tiêu theo thu nhập tài nguyên trung bình mỗi ngày.
9. **Chất Lượng Dữ Liệu (Data Quality & Verification)**: Quản lý phiên bản dữ liệu và cơ chế báo lỗi dữ liệu.

---

## 2. Phân Tách Kiến Trúc (Architecture Breakdown)

### A. Tầng Dữ Liệu (Data Layer - `src/data/`)
- `src/data/refining.js`: Gia công 0 ➔ 14
- `src/data/pet_evolution.js`: Cỏ thiên điệp 1 ➔ 50
- `src/data/magic_stones_exp.js`: Ma thạch thường, ưu tú, truyền thuyết
- `src/data/jewel_conversion.js`: Quy đổi châu báu 13 ➔ 21
- `src/data/mount_up.js`: 9 loại thú cưỡi 1 ➔ 10
- `src/data/phu_ma.js`: Phụ ma 1 ➔ 5
- `src/data/vat_to.js`: Vật tổ 1 ➔ 50
- `src/data/duc_hon.js`: Đúc hồn vũ khí, nón, áo
- `src/data/chien_hon_don.js`: Chiến hồn đơn 1 ➔ 100
- `src/data/manh_hoa_pet.js`: Manh hóa pet 1 ➔ 50
- `src/data/ngoc.js`: Ngọc thú cưỡi & Mảnh ngọc lam
- `src/data/mieu_than.js`: Miếu thần 1 ➔ 20
- `src/data/pet_linh_hach.js`: Linh hạch pet 1 ➔ 10
- `src/data/pet_tai_nang.js`: Tài năng pet 1 ➔ 100
- `src/data/hoa_than_tu_luyen.js`: Hóa thần tu luyện 1 ➔ 10
- `src/data/ngoc_vu_khi.js`: Ngọc vũ khí 1 ➔ 20
- `src/data/weapons.js`: Danh mục vũ khí chuẩn
- `src/data/pets.js`: Danh mục pet chuẩn
- `src/data/fashion.js`: 540+ set thời trang

### B. Tầng Thuật Toán Core (Core Engines - `src/core/`)
- `calculatorEngine.js`: 17 hàm tính toán chi phí nâng cấp rời rạc.
- `ballisticsEngine.js`: Thuật toán góc lực và bù trừ gió Gunny PC.
- `resourceEngine.js`: [NEW] Quản lý túi tài nguyên & chuỗi quy đổi đa tầng.
- `plannerEngine.js`: [NEW] Quản lý profile nhân vật, delta tài nguyên và tiến độ %.
- `optimizerEngine.js`: [NEW] Thuật toán xếp hạng độ hiệu quả Lực Chiến / Chi Phí.
- `comparisonEngine.js`: [NEW] Thuật toán so sánh vũ khí & pet.
- `dailyPlannerEngine.js`: [NEW] Thuật toán tính số ngày ETA hoàn thành mục tiêu.

### C. Tầng Giao Diện Người Dùng (UI Layer - `js/modules/` & `css/modules/`)
- `js/modules/calculators.js`: Giao diện 17 bảng tính.
- `js/modules/ballistics.js`: Giao diện Thước bắn góc.
- `js/modules/fashion.js`: Giao diện Kho thời trang.
- `js/modules/planner.js`: [NEW] Giao diện Hồ sơ nhân vật & Mục tiêu.
- `js/modules/optimizer.js`: [NEW] Giao diện Gợi ý nâng cấp.
- `js/modules/wiki.js`: [NEW] Giao diện Tra cứu & So sánh Vũ khí/Pet.
- `js/modules/dailyPlanner.js`: [NEW] Giao diện Kế hoạch cày cuốc & ETA.
- `js/modules/nav.js`: Điều hướng, Command Palette (`Ctrl + K`).
- `js/modules/utils.js`: Tiện ích lưu trữ LocalStorage, Toast, Format số.

---

## 3. Lộ Trình Triển Khai (Roadmap)
- **Phase 0**: Audit toàn diện & Trình kế hoạch kiến trúc (Đang thực hiện).
- **Phase 1**: Xây dựng Core Engines (`resourceEngine.js`, `plannerEngine.js`, Pytest tests).
- **Phase 2**: Xây dựng UI Character Planner & Lưu trữ nhiều hồ sơ nhân vật.
- **Phase 3**: Xây dựng Upgrade Optimizer (Gợi ý đầu tư thông minh).
- **Phase 4**: Xây dựng Weapon & Pet DB kèm tính năng So Sánh trực quan.
- **Phase 5**: Cải tiến trải nghiệm Ballistics Engine.
- **Phase 6**: Xây dựng Gunny Wiki & Global Search.
- **Phase 7**: Xây dựng Daily Resource Planner & ETA.
- **Phase 8**: Hoàn thiện Data Quality, Mobile Testing, Versioning.

---

## 4. Kế Hoạch Kiểm Thử (Verification Plan)
- Giữ vững **25/25 test cases** hiện tại trong `tests/test_gunny_engine.py`.
- Viết mới các bài test cho từng engine mới (`tests/test_resource_engine.py`, `tests/test_planner_engine.py`, `tests/test_optimizer_engine.py`).
- Đảm bảo 100% không có lỗi JS syntax, không có lỗi console, không tràn viền mobile (320px - 1440px).
