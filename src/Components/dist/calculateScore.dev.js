"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcluateScore = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var calcluateScore = function calcluateScore(rowData) {
  var total = Number(rowData.출석점수) + Number(rowData.과제점수) + Number(rowData.중간고사) + Number(rowData.기말고사);
  var grade;

  if (total > 95) {
    grade = "A+";
  } else if (95 >= total && total > 90) {
    grade = "A0";
  } else if (90 >= total && total > 85) {
    grade = "B+";
  } else if (85 >= total && total > 80) {
    grade = "B0";
  } else if (80 >= total && total > 75) {
    grade = "C+";
  } else if (75 >= total && total > 70) {
    grade = "C0";
  } else if (70 >= total && total > 65) {
    grade = "D+";
  } else if (65 >= total && total > 60) {
    grade = "D0";
  } else {
    grade = "F";
  }

  return _objectSpread({}, rowData, {
    총점: total,
    성적: grade
  });
};

exports.calcluateScore = calcluateScore;