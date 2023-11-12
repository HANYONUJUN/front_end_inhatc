"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useRowData = function useRowData() {
  var _useState = (0, _react.useState)({
    이수: '',
    필수: '',
    과목명: '',
    학점: '',
    출석점수: '',
    과제점수: '',
    중간고사: '',
    기말고사: '',
    총점: '',
    평균: '',
    성적: ''
  }),
      _useState2 = _slicedToArray(_useState, 2),
      rowData = _useState2[0],
      setRowData = _useState2[1];

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

  return [rowData, setRowData, handleInputChange];
};

var _default = useRowData;
exports["default"] = _default;