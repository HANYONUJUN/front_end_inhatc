"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useTableData = function useTableData(rowData, closeModal, setSelectedRow, calcluateScore) {
  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];

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
  };

  var handleDelete = function handleDelete(selectedRow) {
    console.log('handleDelete called'); // handleDelete 함수가 호출되었는지 확인하기 위한 로그

    console.log('selectedRow: ', selectedRow);
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
        var updateRow = calcluateScore(row);
        return updateRow;
      }
    });
    setTableData(updateTableData);
  };

  return [tableData, handleSave, handleRowClick, handleDelete, handleScoreSave];
};

var _default = useTableData;
exports["default"] = _default;