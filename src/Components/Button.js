const ButtonGroup = ({ openModal, handleDelete, handleScoreSave, selectedRow }) => {
    return (
        <div className='btn'>
          <button onClick={openModal} id="click_btn">추가</button>
          <div className='space'></div>
          <button onClick={() => handleDelete(selectedRow)} disabled={selectedRow === null} id="click_btn">삭제</button>
          <div className='space'></div>
          <button onClick={handleScoreSave} id="click_btn">저장</button>
        </div> 
      );
    };
  
export default ButtonGroup;