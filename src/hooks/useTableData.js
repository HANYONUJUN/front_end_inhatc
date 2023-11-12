import { useState } from 'react';

const useTableData = (rowData, closeModal, setSelectedRow, calcluateScore) => {
  const [tableData, setTableData] = useState([]);

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
  }

  const handleDelete = (selectedRow) => {

    console.log('handleDelete called');  // handleDelete 함수가 호출되었는지 확인하기 위한 로그
    console.log('selectedRow: ', selectedRow);
    
    setTableData(prevData => prevData.filter((row, index) => index !== selectedRow));
    setSelectedRow(null);
  }

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
  return [tableData, handleSave, handleRowClick, handleDelete, handleScoreSave];
};

export default useTableData;

