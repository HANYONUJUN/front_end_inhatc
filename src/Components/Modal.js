import"../Modal.css";

const Modal = ({ rowData, handleInputChange, handleSave, closeModal}) => {
    return (
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
          </div>
          <div className="modal-buttons">
            <button onClick={handleSave}>저장</button>
            <div className='space'></div>
            <button onClick={closeModal}>취소</button>
          </div>
        </div>
      </div>
    );
  };

  export default Modal;