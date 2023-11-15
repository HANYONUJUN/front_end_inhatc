import React, { useState } from "react";
import Table from "./Components/Table";
import ButtonGroup from "./Components/Button";
import Modal from "./Components/Modal";

import { calcluateScore } from "./Components/calculateScore";

const App = () => {
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [tableData3, setTableData3] = useState([]);

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  // 각 학년에 대한 rowData를 별도로 저장
  const [rowData1, setRowData1] = useState({
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
  const [rowData2, setRowData2] = useState({
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
  const [rowData3, setRowData3] = useState({
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

  const [selectedRow1, setSelectedRow1] = useState(null);
  const [selectedRow2, setSelectedRow2] = useState(null);
  const [selectedRow3, setSelectedRow3] = useState(null);

  const openModal1 = () => {
    setIsModalOpen1(true);
  };
  const closeModal1 = () => {
    setIsModalOpen1(false);
    setRowData1({
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
 
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    if(['학점','출석점수','과제점수','중간고사','기말고사'].includes(name) && value < 0) {
        return;
    }
    if (name === '학점') {
        if (value === '1') {
            setRowData1(prevData => ({
                ...prevData,
                [name]: value,
                출석점수: '0',
                과제점수: '0',
                중간고사: '0',
                기말고사: '0',
            }));
        } else {
            setRowData1(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    } else {
        setRowData1(prevData => ({
            ...prevData,
            [name]: (name === '과목명' && value === '') ? prevData[name] : value
        }));
    }
};

const handleSave1 = () => {
    const isDuplicateSubject = tableData1.some(item => item.과목명 === rowData1.과목명);
    if (isDuplicateSubject) {
        alert('이미 동일한 과목명이 있습니다. 다른 과목명을 입력하세요.');
        return;
    }
    let newTableData1 = []; 
    if (rowData1.학점 === '1') {
        newTableData1 = [
            ...tableData1,
            {
                ...rowData1,
                출석점수: rowData1.출석점수 > 0 && rowData1.출석점수 <= 20 ? rowData1.출석점수.toString() : '0',
                과제점수: rowData1.과제점수 > 0 && rowData1.과제점수 <= 20 ? rowData1.과제점수.toString() : '0',
                중간고사: rowData1.중간고사 > 0 && rowData1.중간고사 <= 30 ? rowData1.중간고사.toString() : '0',
                기말고사: rowData1.기말고사 > 0 && rowData1.기말고사 <= 30 ? rowData1.기말고사.toString() : '0',
                성적:'P'
            }
        ];
    } else {
        if (
            rowData1.출석점수 > 0 && rowData1.출석점수 <= 20 &&
            rowData1.과제점수 > 0 && rowData1.과제점수 <= 20 &&
            rowData1.중간고사 > 0 && rowData1.중간고사 <= 30 &&
            rowData1.기말고사 > 0 && rowData1.기말고사 <= 30
        ) {
            newTableData1 = [...tableData1, rowData1];
        } else {
            alert('입력값에 오류가 있습니다. 다시 입력하세요.');
            return;
        }
    }
    newTableData1.sort((a, b) => {
        if (a.이수 === '전공' && b.이수 === '교양') return -1;
        if (a.이수 === '교양' && b.이수 === '전공') return 1;
        if (a.이수 === b.이수) {
            if (a.필수 === '필수' && b.필수 === '선택') return -1;
            if (a.필수 === '선택' && b.필수 === '필수') return 1;
        }
        return 0;
    });
    setTableData1(newTableData1);
    closeModal1();
};

const handleRowClick1 = (index) => {
    setSelectedRow1(index);
    setRowData1(tableData1[index]);
};

const handleDelete1 = () => {
    setTableData1(prevData => prevData.filter((row, index) => index !== selectedRow1));
    setSelectedRow1(null);
};

const handleScoreSave1 = () => {
    const updateTableData1 = tableData1.map(row =>{
        if(row.학점 === '1'){
            return row;
        }else{
            const updateRow = calcluateScore(row);
            return updateRow;
        }
    });
    setTableData1(updateTableData1);
};

const calculateTotal1 = () => {
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
    tableData1.forEach(row => {
        totalRow.학점 += parseInt(row.학점);
        totalRow.출석점수 += parseInt(row.출석점수);
        totalRow.과제점수 += parseInt(row.과제점수);
        totalRow.중간고사 += parseInt(row.중간고사);
        totalRow.기말고사 += parseInt(row.기말고사);
    });
    totalRow.총점 = tableData1.reduce((acc, row) => {
        const score = parseInt(row.총점);
        return acc + (isNaN(score) ? 0 : score);
    }, 0);
    totalRow.평균 = tableData1.length > 0 ? Math.round(totalRow.총점 / tableData1.length) : 0;
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

  
  const openModal2 = () => {
    setIsModalOpen2(true);
  };
  const closeModal2 = () => {
    setIsModalOpen2(false);
    setRowData2({
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
  
const handleInputChange2 = (e) => {
  const { name, value } = e.target;
  if(['학점','출석점수','과제점수','중간고사','기말고사'].includes(name) && value < 0) {
      return;
  }
  if (name === '학점') {
      if (value === '1') {
          setRowData2(prevData => ({
              ...prevData,
              [name]: value,
              출석점수: '0',
              과제점수: '0',
              중간고사: '0',
              기말고사: '0',
          }));
      } else {
          setRowData2(prevData => ({
              ...prevData,
              [name]: value
          }));
      }
  } else {
      setRowData2(prevData => ({
          ...prevData,
          [name]: (name === '과목명' && value === '') ? prevData[name] : value
      }));
  }
};

const handleSave2 = () => {
  const isDuplicateSubject = tableData2.some(item => item.과목명 === rowData2.과목명);
  if (isDuplicateSubject) {
      alert('이미 동일한 과목명이 있습니다. 다른 과목명을 입력하세요.');
      return;
  }
  let newTableData2 = []; 
  if (rowData2.학점 === '1') {
      newTableData2 = [
          ...tableData2,
          {
              ...rowData2,
              출석점수: rowData2.출석점수 > 0 && rowData2.출석점수 <= 20 ? rowData2.출석점수.toString() : '0',
              과제점수: rowData2.과제점수 > 0 && rowData2.과제점수 <= 20 ? rowData2.과제점수.toString() : '0',
              중간고사: rowData2.중간고사 > 0 && rowData2.중간고사 <= 30 ? rowData2.중간고사.toString() : '0',
              기말고사: rowData2.기말고사 > 0 && rowData2.기말고사 <= 30 ? rowData2.기말고사.toString() : '0',
              성적:'P'
          }
      ];
  } else {
      if (
          rowData2.출석점수 > 0 && rowData2.출석점수 <= 20 &&
          rowData2.과제점수 > 0 && rowData2.과제점수 <= 20 &&
          rowData2.중간고사 > 0 && rowData2.중간고사 <= 30 &&
          rowData2.기말고사 > 0 && rowData2.기말고사 <= 30
      ) {
          newTableData2 = [...tableData2, rowData2];
      } else {
          alert('입력값에 오류가 있습니다. 다시 입력하세요.');
          return;
      }
  }
  newTableData2.sort((a, b) => {
      if (a.이수 === '전공' && b.이수 === '교양') return -1;
      if (a.이수 === '교양' && b.이수 === '전공') return 1;
      if (a.이수 === b.이수) {
          if (a.필수 === '필수' && b.필수 === '선택') return -1;
          if (a.필수 === '선택' && b.필수 === '필수') return 1;
      }
      return 0;
  });
  setTableData2(newTableData2);
  closeModal2();
};

const handleRowClick2 = (index) => {
  setSelectedRow2(index);
  setRowData2(tableData2[index]);
};

const handleDelete2 = () => {
  setTableData2(prevData => prevData.filter((row, index) => index !== selectedRow2));
  setSelectedRow2(null);
};

const handleScoreSave2 = () => {
  const updateTableData2 = tableData2.map(row =>{
      if(row.학점 === '1'){
          return row;
      }else{
          const updateRow = calcluateScore(row);
          return updateRow;
      }
  });
  setTableData2(updateTableData2);
};

const calculateTotal2 = () => {
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
  tableData2.forEach(row => {
      totalRow.학점 += parseInt(row.학점);
      totalRow.출석점수 += parseInt(row.출석점수);
      totalRow.과제점수 += parseInt(row.과제점수);
      totalRow.중간고사 += parseInt(row.중간고사);
      totalRow.기말고사 += parseInt(row.기말고사);
  });
  totalRow.총점 = tableData2.reduce((acc, row) => {
      const score = parseInt(row.총점);
      return acc + (isNaN(score) ? 0 : score);
  }, 0);
  totalRow.평균 = tableData2.length > 0 ? Math.round(totalRow.총점 / tableData2.length) : 0;
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

  const openModal3 = () => {
    setIsModalOpen3(true);
  };
  const closeModal3 = () => {
    setIsModalOpen3(false);
    setRowData3({
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

const handleInputChange3 = (e) => {
  const { name, value } = e.target;
  if(['학점','출석점수','과제점수','중간고사','기말고사'].includes(name) && value < 0) {
      return;
  }
  if (name === '학점') {
      if (value === '1') {
          setRowData3(prevData => ({
              ...prevData,
              [name]: value,
              출석점수: '0',
              과제점수: '0',
              중간고사: '0',
              기말고사: '0',
          }));
      } else {
          setRowData3(prevData => ({
              ...prevData,
              [name]: value
          }));
      }
  } else {
      setRowData3(prevData => ({
          ...prevData,
          [name]: (name === '과목명' && value === '') ? prevData[name] : value
      }));
  }
};

const handleSave3 = () => {
  const isDuplicateSubject = tableData3.some(item => item.과목명 === rowData3.과목명);
  if (isDuplicateSubject) {
      alert('이미 동일한 과목명이 있습니다. 다른 과목명을 입력하세요.');
      return;
  }
  let newTableData3 = []; 
  if (rowData3.학점 === '1') {
      newTableData3 = [
          ...tableData3,
          {
              ...rowData3,
              출석점수: rowData3.출석점수 > 0 && rowData3.출석점수 <= 20 ? rowData3.출석점수.toString() : '0',
              과제점수: rowData3.과제점수 > 0 && rowData3.과제점수 <= 20 ? rowData3.과제점수.toString() : '0',
              중간고사: rowData3.중간고사 > 0 && rowData3.중간고사 <= 30 ? rowData3.중간고사.toString() : '0',
              기말고사: rowData3.기말고사 > 0 && rowData3.기말고사 <= 30 ? rowData3.기말고사.toString() : '0',
              성적:'P'
          }
      ];
  } else {
      if (
          rowData3.출석점수 > 0 && rowData3.출석점수 <= 20 &&
          rowData3.과제점수 > 0 && rowData3.과제점수 <= 20 &&
          rowData3.중간고사 > 0 && rowData3.중간고사 <= 30 &&
          rowData3.기말고사 > 0 && rowData3.기말고사 <= 30
      ) {
          newTableData3 = [...tableData3, rowData3];
      } else {
          alert('입력값에 오류가 있습니다. 다시 입력하세요.');
          return;
      }
  }
  newTableData3.sort((a, b) => {
      if (a.이수 === '전공' && b.이수 === '교양') return -1;
      if (a.이수 === '교양' && b.이수 === '전공') return 1;
      if (a.이수 === b.이수) {
          if (a.필수 === '필수' && b.필수 === '선택') return -1;
          if (a.필수 === '선택' && b.필수 === '필수') return 1;
      }
      return 0;
  });
  setTableData3(newTableData3);
  closeModal3();
};

const handleRowClick3 = (index) => {
  setSelectedRow3(index);
  setRowData3(tableData3[index]);
};

const handleDelete3 = () => {
  setTableData3(prevData => prevData.filter((row, index) => index !== selectedRow3));
  setSelectedRow3(null);
};

const handleScoreSave3 = () => {
  const updateTableData3 = tableData3.map(row =>{
      if(row.학점 === '1'){
          return row;
      }else{
          const updateRow = calcluateScore(row);
          return updateRow;
      }
  });
  setTableData3(updateTableData3);
};

const calculateTotal3 = () => {
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
  tableData3.forEach(row => {
      totalRow.학점 += parseInt(row.학점);
      totalRow.출석점수 += parseInt(row.출석점수);
      totalRow.과제점수 += parseInt(row.과제점수);
      totalRow.중간고사 += parseInt(row.중간고사);
      totalRow.기말고사 += parseInt(row.기말고사);
  });
  totalRow.총점 = tableData3.reduce((acc, row) => {
      const score = parseInt(row.총점);
      return acc + (isNaN(score) ? 0 : score);
  }, 0);
  totalRow.평균 = tableData3.length > 0 ? Math.round(totalRow.총점 / tableData3.length) : 0;
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

  // 렌더링
  return (
    <div className="App">

  <div className="main">
      <div className="Title">
        <h2>Front-end 과제</h2>
      </div>

      <div className="grade_title">
        <h2>1학년</h2>
      </div>

      <div className="grade_table">
      <ButtonGroup
        openModal={openModal1}
        handleDelete={handleDelete1}
        handleScoreSave={handleScoreSave1}
        selectedRow={selectedRow1}
      />
      <Table
        tableData={tableData1}
        handleRowClick={handleRowClick1}
        selectedRow={selectedRow1}
        calculateTotal={calculateTotal1}
      />
      {isModalOpen1 && (
        <Modal
          rowData={rowData1}
          handleInputChange={handleInputChange1}
          handleSave={handleSave1}
          closeModal={closeModal1}
        />
      )}
      
      <div className="grade_title">
        <h2>2학년</h2>
      </div>
      <ButtonGroup
          openModal={openModal2}
          handleDelete={handleDelete2}
          handleScoreSave={handleScoreSave2}
          selectedRow={selectedRow2}
        />
      <Table
          tableData={tableData2}
          handleRowClick={handleRowClick2}
          selectedRow={selectedRow2}
          calculateTotal={calculateTotal2}
        />
    {isModalOpen2 && (
      <Modal
        rowData={rowData2}
        handleInputChange={handleInputChange2}
        handleSave={handleSave2}
        closeModal={closeModal2}
      />
    )}

<div className="grade_title">
    <h2>3학년</h2>
</div>
  <ButtonGroup
    openModal={openModal3}
    handleDelete={handleDelete3}
    handleScoreSave={handleScoreSave3}
    selectedRow={selectedRow3}
  />
  <Table
      tableData={tableData3}
      handleRowClick={handleRowClick3}
      selectedRow={selectedRow3}
      calculateTotal={calculateTotal3}
  />
  {isModalOpen3 && (
    <Modal
        rowData={rowData3}
        handleInputChange={handleInputChange3}
        handleSave={handleSave3}
        closeModal={closeModal3}
    />
    )}
      </div>
     </div>
    </div>
  );
};

export default App;
