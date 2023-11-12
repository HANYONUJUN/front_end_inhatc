import { useState } from 'react';

const useRowData = () => {
  const [rowData, setRowData] = useState({
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
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    
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

  return [rowData, setRowData, handleInputChange];
};

export default useRowData;
