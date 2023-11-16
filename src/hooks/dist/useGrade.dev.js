"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useGrade;

var _react = require("react");

var _calculateScore = require("../Components/calculateScore");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useGrade(year) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var _useState5 = (0, _react.useState)({
    이수: "",
    필수: "",
    과목명: "",
    학점: 0,
    출석점수: 0,
    과제점수: 0,
    중간고사: 0,
    기말고사: 0,
    총점: 0,
    평균: 0,
    성적: ""
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      rowData = _useState6[0],
      setRowData = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedRow = _useState8[0],
      setSelectedRow = _useState8[1];

  var openModal = function openModal() {
    setIsModalOpen(true);
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
    setRowData({
      이수: "",
      필수: "",
      과목명: "",
      학점: 0,
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      평균: 0,
      성적: ""
    });
  };

  var handleInputChange = function handleInputChange(e) {
    var _e$target = e.target,
        name = _e$target.name,
        value = _e$target.value;

    if (['학점', '출석점수', '과제점수', '중간고사', '기말고사'].includes(name) && value < 0) {
      return;
    }

    if (name === '학점') {
      if (value === '1') {
        setRowData(function (prevData) {
          var _objectSpread2;

          return _objectSpread({}, prevData, (_objectSpread2 = {}, _defineProperty(_objectSpread2, name, value), _defineProperty(_objectSpread2, "\uCD9C\uC11D\uC810\uC218", '0'), _defineProperty(_objectSpread2, "\uACFC\uC81C\uC810\uC218", '0'), _defineProperty(_objectSpread2, "\uC911\uAC04\uACE0\uC0AC", '0'), _defineProperty(_objectSpread2, "\uAE30\uB9D0\uACE0\uC0AC", '0'), _objectSpread2));
        });
      } else {
        setRowData(function (prevData) {
          return _objectSpread({}, prevData, _defineProperty({}, name, value));
        });
      }
    } else {
      setRowData(function (prevData) {
        return _objectSpread({}, prevData, _defineProperty({}, name, name === '과목명' && value === '' ? prevData[name] : value));
      });
    }
  };

  var handleSave = function handleSave() {
    var isDuplicateSubject = tableData.some(function (item) {
      return item.과목명 === rowData.과목명;
    });

    if (isDuplicateSubject) {
      alert('이미 동일한 과목명이 있습니다. 다른 과목명을 입력하세요.');
      return;
    }

    var newTableData = [];

    if (rowData.학점 === '1') {
      newTableData = [].concat(_toConsumableArray(tableData), [_objectSpread({}, rowData, {
        출석점수: rowData.출석점수 > 0 && rowData.출석점수 <= 20 ? rowData.출석점수.toString() : '0',
        과제점수: rowData.과제점수 > 0 && rowData.과제점수 <= 20 ? rowData.과제점수.toString() : '0',
        중간고사: rowData.중간고사 > 0 && rowData.중간고사 <= 30 ? rowData.중간고사.toString() : '0',
        기말고사: rowData.기말고사 > 0 && rowData.기말고사 <= 30 ? rowData.기말고사.toString() : '0',
        성적: 'P'
      })]);
    } else {
      if (rowData.출석점수 > 0 && rowData.출석점수 <= 20 && rowData.과제점수 > 0 && rowData.과제점수 <= 20 && rowData.중간고사 > 0 && rowData.중간고사 <= 30 && rowData.기말고사 > 0 && rowData.기말고사 <= 30) {
        newTableData = [].concat(_toConsumableArray(tableData), [rowData]);
      } else {
        alert('입력값에 오류가 있습니다. 다시 입력하세요.');
        return;
      }
    }

    newTableData.sort(function (a, b) {
      if (a.이수 === '전공' && b.이수 === '교양') return -1;
      if (a.이수 === '교양' && b.이수 === '전공') return 1;

      if (a.이수 === b.이수) {
        if (a.필수 === '필수' && b.필수 === '선택') return -1;
        if (a.필수 === '선택' && b.필수 === '필수') return 1;
      }

      return 0;
    });
    setTableData(newTableData);
    closeModal();
  };

  var handleRowClick = function handleRowClick(index) {
    setSelectedRow(index);
    setRowData(tableData[index]);
  };

  var handleDelete = function handleDelete() {
    setTableData(function (prevData) {
      return prevData.filter(function (row, index) {
        return index !== selectedRow;
      });
    });
    setSelectedRow(null);
  };

  var handleScoreSave = function handleScoreSave() {
    var updateTableData = tableData.map(function (row) {
      if (row.학점 === '1') {
        return row;
      } else {
        var updateRow = (0, _calculateScore.calcluateScore)(row);
        return updateRow;
      }
    });
    setTableData(updateTableData);
  };

  var calculateTotal = function calculateTotal() {
    var totalRow = {
      학점: 0,
      출석점수: 0,
      과제점수: 0,
      중간고사: 0,
      기말고사: 0,
      총점: 0,
      평균: 0,
      성적: ''
    };
    var filteredData = tableData.filter(function (row) {
      return parseInt(row.학점) !== 1;
    });
    filteredData.forEach(function (row) {
      totalRow.학점 += parseInt(row.학점);
      totalRow.출석점수 += parseInt(row.출석점수);
      totalRow.과제점수 += parseInt(row.과제점수);
      totalRow.중간고사 += parseInt(row.중간고사);
      totalRow.기말고사 += parseInt(row.기말고사);
    });
    totalRow.총점 = filteredData.reduce(function (acc, row) {
      var score = parseInt(row.총점);
      return acc + (isNaN(score) ? 0 : score);
    }, 0);
    totalRow.평균 = filteredData.length > 0 ? Math.round(totalRow.총점 / filteredData.length) : 0;

    if (totalRow.평균 > 95) {
      totalRow.성적 = "A+";
    } else if (totalRow.평균 <= 95 && totalRow.평균 > 90) {
      totalRow.성적 = "A0";
    } else if (totalRow.평균 <= 90 && totalRow.평균 > 85) {
      totalRow.성적 = "B+";
    } else if (totalRow.평균 <= 85 && totalRow.평균 > 80) {
      totalRow.성적 = "B0";
    } else if (totalRow.평균 <= 80 && totalRow.평균 > 75) {
      totalRow.성적 = "C+";
    } else if (totalRow.평균 <= 75 && totalRow.평균 > 70) {
      totalRow.성적 = "C0";
    } else if (totalRow.평균 <= 70 && totalRow.평균 > 65) {
      totalRow.성적 = "D+";
    } else if (totalRow.평균 <= 65 && totalRow.평균 > 60) {
      totalRow.성적 = "D0";
    } else {
      totalRow.성적 = "F";
    }

    return totalRow;
  };

  return {
    tableData: tableData,
    setTableData: setTableData,
    isModalOpen: isModalOpen,
    setIsModalOpen: setIsModalOpen,
    rowData: rowData,
    setRowData: setRowData,
    selectedRow: selectedRow,
    setSelectedRow: setSelectedRow,
    openModal: openModal,
    closeModal: closeModal,
    handleInputChange: handleInputChange,
    handleSave: handleSave,
    handleRowClick: handleRowClick,
    handleDelete: handleDelete,
    handleScoreSave: handleScoreSave,
    calculateTotal: calculateTotal
  };
}