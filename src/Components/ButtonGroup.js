const ButtonGroup = ({ openModal, handleDelete, handleScoreSave, selectedRow }) => {
  return (
      <div className='btn'>
        <button onClick={openModal}>추가</button>
        <div className='space'></div>
        <button onClick={() => handleDelete(selectedRow)} disabled={selectedRow === null}>삭제</button>
        <div className='space'></div>
        <button onClick={handleScoreSave}>저장</button>
      </div> 
    );
  };

  export default ButtonGroup;