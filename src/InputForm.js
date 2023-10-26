import React, {Component, useState} from 'react';
import "./Form.css";
import"./Modal.css";
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { calcluateScore } from './Components/Calscore';


const App = () => {

  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] =useState({
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
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRowData({
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
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    if(['학점','출석점수','과제점수','중간고사','기말고사'].includes(name) && value < 0) {
      return;
    }

    setRowData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  
  const handleSave = () => {
    setTableData([...tableData, rowData]);
    closeModal();
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
  }

  const handleDelete = () => {
    setTableData(prevData => prevData.filter((row, index) => index !== selectedRow));
    setSelectedRow(null);
  }

  const handleScoreSave = () => {
    const updateTableData = tableData.map(row =>{ 
      const updateRow = calcluateScore(row);
      return updateRow;
    });
    setTableData(updateTableData);
  };

  return (
    <div className="App">
     <div className='Title'>
        <h2>front-end 과제</h2>
     </div>
      <>
        <div className='btn'>
            <button onClick={openModal}>추가</button>
            <div className='space'></div>
            <button onClick={handleDelete} disabled={selectedRow === null}>삭제</button>
            <div className='space'></div>
            <button onClick={handleScoreSave}>저장</button>
        </div> 

        <table className="Table">
          <thead>
           <tr>
            <th>이수</th>
            <th>필수</th>
            <th>과목명</th>
            <th>학점</th>
            <th>출석점수</th>
            <th>과제점수</th>
            <th>중간고사</th>
            <th>기말고사</th>
            <th>총점</th>
            <th>평균</th>
            <th>성적</th>
           </tr>
           </thead>

        <tbody>
      
          {tableData.map((row, index)=>(
          <tr 
            key={index}
            onClick={()=> handleRowClick(index)}
            className={selectedRow === index ? 'selected' : ''}
          >
              <td>{row.이수}</td>
              <td>{row.필수}</td>
              <td>{row.과목명}</td>
              <td>{row.학점}</td>
              <td>{row.출석점수}</td>
              <td>{row.과제점수}</td>
              <td>{row.중간고사}</td>
              <td>{row.기말고사}</td>
              <td>{row.총점}</td>
              <td>{row.평균}</td>
              <td>{row.성적}</td>
           </tr>
          ))}
         </tbody>
        </table>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="input_title">성적 입력</h2>

              <div className="input_list">
              
              
              <div id="option_value">
                <select 
                  name="이수"
                  value={rowData.이수}
                  onChange={handleInputChange}
                >
                   <option value="">선택</option>
                   <option value="교양">교양</option>
                   <option value="전공">전공</option>
                </select>
              </div>

              <div id="option_value">
                 <select 
                    name="필수"
                    value={rowData.필수}
                    onChange={handleInputChange}
                 >
                   <option value=""></option>
                  <option value="선택">선택</option>
                  <option value="필수">필수</option>
                 </select>
              </div>

              <div>
                <input
                  type="text"
                  name="과목명"
                  value={rowData.과목명}
                  onChange={handleInputChange}
                  placeholder="과목명"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="학점"
                  value={rowData.학점}
                  onChange={handleInputChange}
                  placeholder="학점"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="출석점수"
                  value={rowData.출석점수}
                  onChange={handleInputChange}
                  placeholder="출석점수"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="과제점수"
                  value={rowData.과제점수}
                  onChange={handleInputChange}
                  placeholder="과제점수"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="중간고사"
                  value={rowData.중간고사}
                  onChange={handleInputChange}
                  placeholder="중간고사"
                />
              </div>

              <div>
                <input
                  type="number"
                  name="기말고사"
                  value={rowData.기말고사}
                  onChange={handleInputChange}
                  placeholder="기말고사"
                />
              </div>

              <div className="modal-buttons">
                <button onClick={handleSave}>저장</button>
                <div className='space'></div>
                <button onClick={closeModal}>취소</button>
               </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default App;

