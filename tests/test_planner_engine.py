import pytest
import subprocess
import json

def load_planner_via_node(js_code):
    cmd = [
        'node', '-e',
        f"""
        // Load datasets directly onto global scope for CalculatorEngine
        global.RefiningData = require('./src/data/refining.js');
        global.PetEvolutionData = require('./src/data/pet_evolution.js');
        global.MagicStonesExpData = require('./src/data/magic_stones_exp.js');
        global.JewelConversionData = require('./src/data/jewel_conversion.js');
        global.MountUpData = require('./src/data/mount_up.js');
        global.PhuMaData = require('./src/data/phu_ma.js');
        global.VatToData = require('./src/data/vat_to.js');
        global.DucHonData = require('./src/data/duc_hon.js');
        global.ChienHonDonData = require('./src/data/chien_hon_don.js');
        global.ManhHoaPetData = require('./src/data/manh_hoa_pet.js');
        global.NgocData = require('./src/data/ngoc.js');
        global.MieuThanData = require('./src/data/mieu_than.js');
        global.PetLinhHachData = require('./src/data/pet_linh_hach.js');
        global.PetTaiNangData = require('./src/data/pet_tai_nang.js');
        global.HoaThanTuLuyenData = require('./src/data/hoa_than_tu_luyen.js');
        global.NgocVuKhiData = require('./src/data/ngoc_vu_khi.js');
        global.ThanHoMenhData = require('./src/data/than_ho_menh.js');
        global.TheBaiDotPhaData = require('./src/data/the_bai_dot_pha.js');
        global.TinhHachThuCuoiData = require('./src/data/tinh_hach_thu_cuoi.js');

        global.CalculatorEngine = require('./src/core/calculatorEngine.js');
        const PlannerEngine = require('./src/core/plannerEngine.js');
        {js_code}
        """
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


class TestCharacterProfile:
    def test_create_default_character(self):
        js = """
        const char = PlannerEngine.createDefaultCharacter('Tuan Main');
        console.log(JSON.stringify(char));
        """
        data = load_planner_via_node(js)
        assert data['name'] == 'Tuan Main'
        assert data['version'] == 1
        assert data['systems']['refining'] == 0
        assert data['systems']['pet'] == 1
        assert 'id' in data

    def test_progress_percent_calculation(self):
        js = """
        const p1 = PlannerEngine.calculateProgressPercent(5, 10, 0); // 50%
        const p2 = PlannerEngine.calculateProgressPercent(10, 10, 0); // 100%
        const p3 = PlannerEngine.calculateProgressPercent(0, 10, 0); // 0%
        const p4 = PlannerEngine.calculateProgressPercent(12, 10, 0); // 100%
        console.log(JSON.stringify({ p1, p2, p3, p4 }));
        """
        data = load_planner_via_node(js)
        assert data['p1'] == 50
        assert data['p2'] == 100
        assert data['p3'] == 0
        assert data['p4'] == 100


class TestMultiGoalPlanning:
    def test_single_system_goal_refining(self):
        js = """
        const cur = { refining: 0 };
        const tgt = { refining: 2 };
        const plan = PlannerEngine.planMultiGoals(cur, tgt);
        console.log(JSON.stringify(plan));
        """
        data = load_planner_via_node(js)
        assert 'refining' in data['systemPlans']
        assert data['totalUpgradesCount'] == 2
        # Level 1 (21 da, 30 dong) + Level 2 (28 da, 42 dong) = 49 da, 72 dong
        assert data['aggregatedResources']['da'] == 49
        assert data['aggregatedResources']['dong'] == 72

    def test_multi_system_goals_aggregation(self):
        js = """
        const cur = { refining: 0, pet: 1, mount: 0 };
        const tgt = { refining: 1, pet: 3, mount: 2 };
        const plan = PlannerEngine.planMultiGoals(cur, tgt);
        console.log(JSON.stringify(plan));
        """
        data = load_planner_via_node(js)
        assert len(data['systemPlans']) == 3
        # Level 1 refining = 21 da
        assert data['aggregatedResources']['da'] == 21
        assert data['aggregatedResources']['coThienDiep'] > 0
        assert data['aggregatedResources']['thuocToaKy'] == (4 + 5) # Ngua Lv 1(4) + Lv 2(5) = 9
