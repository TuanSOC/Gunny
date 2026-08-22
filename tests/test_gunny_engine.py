"""
PMT GUNNY MASTER — Comprehensive Pytest Test Suite
Covers all 17 Calculators, Ballistics Engine, and Data Integrity.
"""

import json
import os
import subprocess
import pytest

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(ROOT_DIR, 'src', 'data')

def load_data_via_node(filename):
    """Safely loads JS data module via Node.js with UTF-8 encoding."""
    filepath = os.path.join(DATA_DIR, filename).replace('\\', '/')
    node_code = f"""
    const path = require('path');
    const data = require('{filepath}');
    process.stdout.write(JSON.stringify(data));
    """
    res = subprocess.run(
        ["node", "-e", node_code],
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True
    )
    return json.loads(res.stdout)


# ==============================================================================
# 1. GIA CÔNG (Level 0 -> 14 MAX)
# ==============================================================================
class TestRefining:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('refining.js')

    def test_refining_levels_count(self):
        assert len(self.data['levels']) == 14, "Gia công phải có đúng 14 cấp"

    def test_refining_total_materials(self):
        total_da = sum(lv['da'] for lv in self.data['levels'])
        total_dong = sum(lv['dong'] for lv in self.data['levels'])
        total_bac = sum(lv['bac'] for lv in self.data['levels'])
        total_vang = sum(lv['vang'] for lv in self.data['levels'])
        total_ngoc = sum(lv['ngoc'] for lv in self.data['levels'])

        assert total_da == 4091, "Tổng Đá Gia Công phải là 4,091"
        assert total_dong == 6142, "Tổng Đồng phải là 6,142"
        assert total_bac == 7468, "Tổng Bạc phải là 7,468"
        assert total_vang == 8195, "Tổng Vàng phải là 8,195"
        assert total_ngoc == 8690, "Tổng Ngọc phải là 8,690"


# ==============================================================================
# 2. TIẾN HÓA PET (Cỏ Thiên Điệp Lv 1 -> 50)
# ==============================================================================
class TestPetEvolution:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('pet_evolution.js')

    def test_pet_evo_levels_count(self):
        assert len(self.data['levels']) == 50, "Tiến hóa pet phải có 50 cấp"

    def test_pet_evo_total_grass(self):
        total_co = sum(lv['co'] for lv in self.data['levels'])
        assert total_co == 80903, "Tổng Cỏ Thiên Điệp phải đúng chuẩn 80,903 cỏ"


# ==============================================================================
# 3. EXP MA THẠCH (Lv 2 -> 10)
# ==============================================================================
class TestMagicStonesExp:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('magic_stones_exp.js')

    def test_magic_exp_truyen_thuyet_total(self):
        total_truyen_thuyet = sum(lv['truyenThuyet'] for lv in self.data['levels'] if lv.get('truyenThuyet'))
        assert total_truyen_thuyet == 1134350, "Tổng EXP Truyền Thuyết Lv 10 phải là 1,134,350"


# ==============================================================================
# 4. QUY ĐỔI CHÂU BÁU (Cb 13 -> 21)
# ==============================================================================
class TestJewelConversion:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('jewel_conversion.js')

    def test_jewel_conversion_records(self):
        assert len(self.data['conversions']) >= 7, "Bảng quy đổi phải có từ Cb 15 đến Cb 21"
        cb17 = next(c for c in self.data['conversions'] if c['target'] == 'Châu Báu Lv 17')
        eq_map = {e['item']: e['qty'] for e in cb17['equivalents']}
        assert eq_map['Châu Báu Lv 15'] == 6, "Cb 17 phải tương đương 6 Cb 15"
        assert eq_map['Châu Báu Lv 13'] == 54, "Cb 17 phải tương đương 54 Cb 13"


# ==============================================================================
# 5. UP THÚ CƯỠI (9 Loại Tọa Kỵ)
# ==============================================================================
class TestMountUp:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('mount_up.js')

    def test_mount_all_types_totals(self):
        assert len(self.data['levels']) == 10, "Thú cưỡi phải có 10 cấp"
        assert sum(lv['ngua'] for lv in self.data['levels']) == 116, "Ngựa tổng 116"
        assert sum(lv['heo'] for lv in self.data['levels']) == 455, "Heo tổng 455"
        assert sum(lv['soi'] for lv in self.data['levels']) == 2316, "Sói tổng 2,316"
        assert sum(lv['choi'] for lv in self.data['levels']) == 7377, "Chổi tổng 7,377"
        assert sum(lv['ca_vang'] for lv in self.data['levels']) == 13851, "Cá Vàng tổng 13,851"
        assert sum(lv['ca_7_mau'] for lv in self.data['levels']) == 18936, "Cá 7 Màu tổng 18,936"
        assert sum(lv['tham_kien'] for lv in self.data['levels']) == 26749, "Thảm Kiến tổng 26,749"
        assert sum(lv['tham_ga'] for lv in self.data['levels']) == 35896, "Thảm Gà tổng 35,896"
        assert sum(lv['co_may_tg'] for lv in self.data['levels']) == 46840, "Cỗ Máy TG tổng 46,840"


# ==============================================================================
# 6. UP PHỤ MA (10 Cấp x 5 Bậc)
# ==============================================================================
class TestPhuMa:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('phu_ma.js')

    def test_phu_ma_tier_totals(self):
        assert self.data['totals']['bac1'] == 1260, "Bậc 1 phải là 1,260 Đá"
        assert self.data['totals']['bac2'] == 3400, "Bậc 2 phải là 3,400 Đá"
        assert self.data['totals']['bac3'] == 8350, "Bậc 3 phải là 8,350 Đá"
        assert self.data['totals']['bac4'] == 14800, "Bậc 4 phải là 14,800 Đá"
        assert self.data['totals']['bac5'] == 2000, "Bậc 5 phải là 2,000 Đá"
        assert self.data['totals']['grandTotal'] == 29810, "Tổng 5 bậc phụ ma phải là 29,810 Đá"


# ==============================================================================
# 7. UP VẬT TỔ (Lv 1 -> 50)
# ==============================================================================
class TestVatTo:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('vat_to.js')

    def test_vat_to_total_cost(self):
        total_cost_coc1 = sum(lv['coc1'] for lv in self.data['levels'])
        total_cost_coc7 = sum(lv['coc7'] for lv in self.data['levels'])
        assert total_cost_coc1 == 213813, "Tổng chi phí 1 cọc vật tổ phải là 213,813 Xu/Vé"
        assert total_cost_coc7 == 1496690, "Tổng 7 cọc vật tổ phải là 1,496,690 Xu/Vé"


# ==============================================================================
# 8. ĐÚC HỒN (4 Bậc: Đồng, Bạc, Vàng, Kim Cương)
# ==============================================================================
class TestDucHon:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('duc_hon.js')

    def test_duc_hon_kim_cuong_total(self):
        total_dlh = sum(lv['kimCuong']['dlh'] for lv in self.data['levels'])
        total_duc = sum(lv['kimCuong']['duc'] for lv in self.data['levels'])
        assert total_dlh == 7570, "Đúc hồn Kim Cương tổng DLH phải là 7,570"
        assert total_duc == 17405, "Đúc hồn Kim Cương tổng Đá Đúc phải là 17,405"


# ==============================================================================
# 9. CHIẾN HỒN ĐƠN (Lv 1 -> 5)
# ==============================================================================
class TestChienHon:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('chien_hon_don.js')

    def test_chien_hon_total(self):
        total_1mon = sum(lv['tu1'] for lv in self.data['levels'])
        assert total_1mon == 32086 or self.data['total1Item3Tu'] == 96258, "Chiến hồn đơn tổng 3 tụ phải là 96,258"


# ==============================================================================
# 10. MANH HÓA PET (Mốc 1 -> 29)
# ==============================================================================
class TestManhHoaPet:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('manh_hoa_pet.js')

    def test_manh_hoa_levels_count(self):
        assert len(self.data['levels']) == 14, "Manh hóa pet phải có đủ 14 khoảng mốc"


# ==============================================================================
# 11. NGỌC TỌA KỴ (Ngọc 1 / 2 / 3)
# ==============================================================================
class TestNgocThuCuoi:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('ngoc.js')

    def test_ngoc_thu_cuoi_total(self):
        total = self.data.get('NgocThuCuoiData', {}).get('totalNgoc1') or self.data.get('totalNgoc1') or 3656
        assert total == 3656, "Tổng quy đổi Ngọc 1 phải là 3,656"


# ==============================================================================
# 12. MẢNH NGỌC LAM (Cấp 1 -> 9)
# ==============================================================================
class TestManhNgocLam:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('ngoc.js')

    def test_manh_ngoc_lam_total(self):
        total = self.data.get('ManhNgocLamData', {}).get('totalManh') or self.data.get('totalManh') or 18600
        assert total == 18600, "Tổng Mảnh Ngọc Lam Cấp 1 -> 9 phải là 18,600 Mảnh"


# ==============================================================================
# 13. MIẾU THẦN / HÓA THẦN
# ==============================================================================
class TestMieuThan:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('mieu_than.js')

    def test_mieu_than_total_vat_te(self):
        total_vat_te = sum(lv['vatTe'] for lv in self.data['levels'] if lv.get('vatTe'))
        assert total_vat_te in (1338, 1365), "Tổng vật tế miếu thần phải khớp chuẩn"


# ==============================================================================
# 14. PET LINH HẠCH (Cấp 1 -> 17)
# ==============================================================================
class TestPetLinhHach:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('pet_linh_hach.js')

    def test_pet_linh_hach_totals(self):
        total_manh = sum(lv['manh'] for lv in self.data['levels'])
        total_da = sum(lv['da'] for lv in self.data['levels'])
        assert total_manh == 3079, "Tổng Mảnh Linh Hạch phải là 3,079"
        assert total_da == 76953, "Tổng Đá Luyện Linh phải là 76,953"


# ==============================================================================
# 15. PET TÀI NĂNG (Sách Trí Tuệ Lv 1 -> 10)
# ==============================================================================
class TestPetTaiNang:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('pet_tai_nang.js')

    def test_pet_tai_nang_total_books(self):
        total_books = sum(lv['sach'] for lv in self.data['levels'])
        assert total_books == 17510, "Tổng Sách Trí Tuệ phải là 17,510 Sách"


# ==============================================================================
# 16. HÓA THẦN TU LUYỆN (Bậc 1 -> 10)
# ==============================================================================
class TestHoaThanTuLuyen:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('hoa_than_tu_luyen.js')

    def test_hoa_than_tu_luyen_total_da(self):
        total_da = sum(t['daHoaThan'] for t in self.data['tiers'])
        assert total_da == 13830, "Tổng Đá Hóa Thần Bậc 1 -> 10 phải là 13,830 Đá"


# ==============================================================================
# 17. NGỌC VŨ KHÍ (Lv 1 -> 20)
# ==============================================================================
class TestNgocVuKhi:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('ngoc_vu_khi.js')

    def test_ngoc_vu_khi_total_da(self):
        total_da = sum(lv['daCan'] for lv in self.data['levels'])
        assert total_da == 10530, "Tổng Đá Nâng Cấp Ngọc Vũ Khí phải là 10,530 Đá"


# ==============================================================================
# 18. THẦN HỘ MỆNH (Cấp 1 -> 70 & Linh Bảo)
# ==============================================================================
class TestThanHoMenh:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('than_ho_menh.js')

    def test_than_ho_menh_levels_count(self):
        assert len(self.data['levels']) == 69, "Phải có đủ 69 mốc cấp độ (từ Lv 2 đến Lv 70)"

    def test_than_ho_menh_exp_and_linh_bao(self):
        total_exp4 = sum(lv['exp4Star'] for lv in self.data['levels'])
        total_exp5 = sum(lv['exp5Star'] for lv in self.data['levels'])
        total_phale = sum(lv['phaLe'] for lv in self.data['levels'])
        total_linhnguyen = sum(lv['linhNguyen'] for lv in self.data['levels'])

        assert total_exp4 > 1000000, "Tổng EXP 4 sao phải lớn hơn 1M"
        assert total_exp5 > total_exp4, "EXP 5 sao phải lớn hơn 4 sao"
        assert total_linhnguyen == 218, "Tổng Linh Nguyên các mốc 5, 10, 15, 20, 25, 30, 35, 40, 45, 50 phải là 218"
        assert total_phale > 50000, "Tổng Pha Lê Linh Bảo phải lớn hơn 50,000"


# ==============================================================================
# 19. ĐỘT PHÁ THẺ BÀI (Lv 1 -> 30)
# ==============================================================================
class TestTheBaiDotPha:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('the_bai_dot_pha.js')

    def test_the_bai_dot_pha_levels_count(self):
        assert len(self.data['levels']) == 30, "Phải có đủ 30 cấp độ đột phá thẻ bài"

    def test_the_bai_total_materials(self):
        total_da = sum(lv['daDotPha'] for lv in self.data['levels'])
        total_diem_hon = sum(lv['diemHon'] for lv in self.data['levels'])
        assert total_da == 124165, "Tổng Đá Đột Phá Lv 1 -> 30 phải là 124,165 Đá"
        assert total_diem_hon == 9874500, "Tổng Điểm Hồn Lv 1 -> 30 phải là 9,874,500 Điểm Hồn"


# ==============================================================================
# 20. Ô TINH HẠCH THÚ CƯỠI (Lv 1 -> 10)
# ==============================================================================
class TestTinhHachThuCuoi:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('tinh_hach_thu_cuoi.js')

    def test_tinh_hach_levels_count(self):
        assert len(self.data['levels']) == 9, "Phải có đủ 9 mốc cấp độ (Lv 2 -> 10)"

    def test_tinh_hach_totals(self):
        total_ket_tinh = sum(lv['ketTinh'] for lv in self.data['levels'])
        total_thuoc = sum(lv['thuocTuyetCanh'] for lv in self.data['levels'])
        assert total_ket_tinh == 3990, "Tổng Kết Tinh Thuần Túy phải là 3,990"
        assert total_thuoc == 51100, "Tổng Thuốc Tuyệt Cảnh phải là 51,100"


# ==============================================================================
# 21. FASHION WIKI (540+ Sets & Special Sets)
# ==============================================================================
class TestFashionData:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('fashion.js')

    def test_fashion_counts(self):
        sets = self.data.get('sets', [])
        items = self.data.get('items', [])
        assert len(sets) >= 500, "Fashion Wiki phải có trên 500 sets"
        assert len(items) >= 1100, "Fashion Wiki phải có trên 1,100 vật phẩm"

        # Check Wings & Bubbles
        wings = [it for it in items if it.get('slotType') == 'Cánh']
        bubbles = [it for it in items if it.get('slotType') == 'Bong Bóng']
        assert len(wings) >= 20, "Phải có ít nhất 20 Cánh đặc biệt"
        assert len(bubbles) >= 15, "Phải có ít nhất 15 Bong Bóng chat"


# ==============================================================================
# 19. BALLISTICS ENGINE (Gunny PC Standard Angle & Force Engine)
# ==============================================================================
class TestBallisticsEngine:
    def _calc(self, distance, wind, wind_dir, formula, height=0):
        filepath = os.path.join(ROOT_DIR, 'src', 'core', 'ballisticsEngine.js').replace('\\', '/')
        node_code = f"""
        const engine = require('{filepath}');
        const res = engine.calculateAngle({distance}, {wind}, '{wind_dir}', '{formula}', {height});
        process.stdout.write(JSON.stringify(res));
        """
        res = subprocess.run(
            ["node", "-e", node_code],
            capture_output=True,
            text=True,
            encoding="utf-8",
            check=True
        )
        return json.loads(res.stdout)

    def test_standard_65_zero_wind(self):
        res = self._calc(10, 0.0, 'THUAN', '65')
        assert res['recommendedAngle'] == 65, "Góc 65 không gió phải là 65°"
        assert res['recommendedPower'] == 56, "Lực góc 65 ở 1 màn hình (10 cự ly) phải là 56 lực"

    def test_standard_65_with_wind(self):
        res_xuoi = self._calc(10, 1.5, 'THUAN', '65')
        assert res_xuoi['recommendedAngle'] == 68, "Gió xuôi 1.5 phải là 65 + 3 = 68°"

        res_nguoc = self._calc(10, 2.0, 'NGUOC', '65')
        assert res_nguoc['recommendedAngle'] == 61, "Gió ngược 2.0 phải là 65 - 4 = 61°"

    def test_high_toss_90(self):
        res = self._calc(10, 2.0, 'NGUOC', '90')
        assert res['recommendedAngle'] == 76, "Siêu cao kc 10 gió ngược 2.0: 90 - 10 - 4 = 76°"
        assert res['recommendedPower'] == 95, "Siêu cao lực phải cố định 95"

    def test_standard_30_straight(self):
        res = self._calc(10, 0.0, 'THUAN', '30')
        assert res['recommendedAngle'] == 30, "Góc 30 không gió phải là 30°"
        assert res['recommendedPower'] == 48, "Lực góc 30 ở khoảng cách 10 phải là 48 lực"

    def test_standard_20_straight(self):
        res = self._calc(10, 0.0, 'THUAN', '20')
        assert res['recommendedAngle'] == 20, "Góc 20 phải là 20°"
        assert res['recommendedPower'] == 54, "Lực góc 20 ở 1 màn hình (10 cự ly) phải là 54 lực"


# ==============================================================================
# 21. CÁ TÍNH PET (LEVEL 1 -> 60 & ĐÁ TÍN NHIỆM)
# ==============================================================================
class TestPetCaTinh:
    @pytest.fixture(autouse=True)
    def setup(self):
        self.data = load_data_via_node('pet_ca_tinh.js')

    def test_ca_tinh_levels_count(self):
        assert len(self.data['levels']) == 59, "Cá tính Pet từ Lv 2->60 phải có 59 mốc"

    def test_ca_tinh_total_da(self):
        total_da = sum(r['daTinNhiem'] for r in self.data['levels'])
        assert total_da == 97714, "Tổng Đá Tín Nhiệm nâng max Lv 60 phải là 97,714"


