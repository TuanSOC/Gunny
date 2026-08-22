import pytest
import subprocess
import json

def load_engine_via_node(js_code):
    cmd = [
        'node', '-e',
        f"""
        const ResourceEngine = require('./src/core/resourceEngine.js');
        {js_code}
        """
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


class TestResourceDeficit:
    def test_exact_resources_available(self):
        js = """
        const req = { stone: 1000, gold: 50 };
        const avail = { stone: 1000, gold: 50 };
        const res = ResourceEngine.calculateDeficit(req, avail);
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['isSufficient'] is True
        assert data['missing']['stone'] == 0
        assert data['missing']['gold'] == 0
        assert data['surplus']['stone'] == 0

    def test_insufficient_resources_one_shortage(self):
        js = """
        const req = { stone: 1000, gold: 50 };
        const avail = { stone: 800, gold: 50 };
        const res = ResourceEngine.calculateDeficit(req, avail);
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['isSufficient'] is False
        assert data['missing']['stone'] == 200
        assert data['missing']['gold'] == 0
        assert data['surplus']['gold'] == 0

    def test_surplus_resources(self):
        js = """
        const req = { stone: 1000 };
        const avail = { stone: 1500, copper: 200 };
        const res = ResourceEngine.calculateDeficit(req, avail);
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['isSufficient'] is True
        assert data['missing']['stone'] == 0
        assert data['surplus']['stone'] == 500
        assert data['surplus']['copper'] == 200

    def test_zero_and_empty_inputs(self):
        js = """
        const res = ResourceEngine.calculateDeficit({}, {});
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['isSufficient'] is True
        assert data['summary'] == []


class TestRefiningConversionSimulation:
    def test_conversion_chain_sufficient(self):
        js = """
        // 100 Stone -> 10 Copper -> 1 Silver
        const inv = { da: 1000, dong: 0, bac: 0, vang: 0, ngoc: 0 };
        const needs = { da: 0, dong: 10, bac: 5, vang: 0, ngoc: 0 };
        const res = ResourceEngine.simulateRefiningConversion(inv, needs);
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['success'] is True
        assert data['missing']['dong'] == 0
        assert data['missing']['bac'] == 0

    def test_conversion_chain_insufficient(self):
        js = """
        const inv = { da: 50, dong: 0, bac: 0, vang: 0, ngoc: 0 };
        const needs = { da: 0, dong: 10, bac: 0, vang: 0, ngoc: 0 };
        const res = ResourceEngine.simulateRefiningConversion(inv, needs);
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['success'] is False
        assert data['missing']['dong'] > 0


class TestMaxAchievableLevel:
    def test_max_level_with_single_cost(self):
        js = """
        const levels = [
            { level: 1, co: 10 },
            { level: 2, co: 20 },
            { level: 3, co: 30 },
            { level: 4, co: 40 }
        ];
        const inv = { co: 60 }; // can afford lv 1(10) + lv 2(20) + lv 3(30) = 60
        const res = ResourceEngine.calculateMaxAchievableLevel(levels, inv, 0, 'co');
        console.log(JSON.stringify(res));
        """
        data = load_engine_via_node(js)
        assert data['maxLevel'] == 3
        assert data['levelsAchieved'] == 3
        assert data['totalConsumed']['co'] == 60
        assert data['leftover']['co'] == 0
