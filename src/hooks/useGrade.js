import { useState } from 'react';
import { calcluateScore } from '../Components/calculateScore';

export default function useGrade(year) {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState({
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
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(['학점','출석점수','과제점수','중간고사','기말고사'].includes(name) && value < 0) {
        return;
    }
    if (name === '학점') {
        if (value === '1') {
            setRowData(prevData => ({
                ...prevData,
                [name]: value,
                출석점수: '0',
                과제점수: '0',
                중간고사: '0',
                기말고사: '0',
            }));
        } else {
            setRowData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    } else {
        setRowData(prevData => ({
            ...prevData,
            [name]: (name === '과목명' && value === '') ? prevData[name] : value
        }));
    }
  };

  const handleSave = () => {
    const isDuplicateSubject = tableData.some(item => item.과목명 === rowData.과목명);
    if (isDuplicateSubject) {
        alert('이미 동일한 과목명이 있습니다. 다른 과목명을 입력하세요.');
        return;
    }
    let newTableData = []; 
    if (rowData.학점 === '1') {
        newTableData = [
            ...tableData,
            {
                ...rowData,
                출석점수: rowData.출석점수 > 0 && rowData.출석점수 <= 20 ? rowData.출석점수.toString() : '0',
                과제점수: rowData.과제점수 > 0 && rowData.과제점수 <= 20 ? rowData.과제점수.toString() : '0',
                중간고사: rowData.중간고사 > 0 && rowData.중간고사 <= 30 ? rowData.중간고사.toString() : '0',
                기말고사: rowData.기말고사 > 0 && rowData.기말고사 <= 30 ? rowData.기말고사.toString() : '0',
                성적:'P'
            }
        ];
    } else {
        if (
            rowData.출석점수 > 0 && rowData.출석점수 <= 20 &&
            rowData.과제점수 > 0 && rowData.과제점수 <= 20 &&
            rowData.중간고사 > 0 && rowData.중간고사 <= 30 &&
            rowData.기말고사 > 0 && rowData.기말고사 <= 30
        ) {
            newTableData = [...tableData, rowData];
        } else {
            alert('입력값에 오류가 있습니다. 다시 입력하세요.');
            return;
        }
    }
    newTableData.sort((a, b) => {
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

const handleRowClick = (index) => {
    setSelectedRow(index);
    setRowData(tableData[index]);
};

const handleDelete = () => {
    setTableData(prevData => prevData.filter((row, index) => index !== selectedRow));
    setSelectedRow(null);
};

const handleScoreSave = () => {
    const updateTableData = tableData.map(row =>{
        if(row.학점 === '1'){
            return row;
        }else{
            const updateRow = calcluateScore(row);
            return updateRow;
        }
    });
    setTableData(updateTableData);
  };



  const calculateTotal = () => {
    const totalRow = {
        학점: 0,
        출석점수: 0,
        과제점수: 0,
        중간고사: 0,
        기말고사: 0,
        총점: 0,
        평균: 0,
        성적: ''
    };
    const filteredData = tableData.filter(row => parseInt(row.학점) !== 1);
    filteredData.forEach(row => {
        totalRow.학점 += parseInt(row.학점);
        totalRow.출석점수 += parseInt(row.출석점수);
        totalRow.과제점수 += parseInt(row.과제점수);
        totalRow.중간고사 += parseInt(row.중간고사);
        totalRow.기말고사 += parseInt(row.기말고사);
    });
    totalRow.총점 = filteredData.reduce((acc, row) => {
        const score = parseInt(row.총점);
        return acc + (isNaN(score) ? 0 : score);
    }, 0);

    totalRow.평균 = filteredData.length > 0 ? Math.round(totalRow.총점 / filteredData.length) : 0;
    if(totalRow.평균 > 95){
        totalRow.성적 = "A+";
    }
    else if (totalRow.평균 <= 95 && totalRow.평균 > 90) {
        totalRow.성적="A0";
    }
    else if (totalRow.평균 <= 90 && totalRow.평균 > 85) {
        totalRow.성적="B+";
    }
    else if (totalRow.평균 <= 85 && totalRow.평균 > 80) {
        totalRow.성적="B0";
    }
    else if (totalRow.평균 <= 80 && totalRow.평균 > 75) {
        totalRow.성적="C+";
    }
    else if (totalRow.평균 <= 75 && totalRow.평균 > 70) {
        totalRow.성적="C0";
    }
    else if (totalRow.평균 <= 70 && totalRow.평균 > 65) {
        totalRow.성적="D+";
    }
    else if (totalRow.평균 <= 65 && totalRow.평균 > 60) {
        totalRow.성적="D0";
    }
    else{
        totalRow.성적="F";
    }
    return totalRow;
  };

  return { tableData, setTableData, isModalOpen, setIsModalOpen, rowData, setRowData, selectedRow, setSelectedRow, openModal, closeModal, handleInputChange, handleSave, handleRowClick, handleDelete, handleScoreSave, calculateTotal };
}