import React from "react";
import Table from "./Components/Table";
import ButtonGroup from "./Components/Button";
import Modal from "./Components/Modal";

import useGrade from "./hooks/useGrade";

const App = () => {

  const { tableData: tableData1, setTableData: setTableData1, isModalOpen: isModalOpen1, setIsModalOpen: setIsModalOpen1, rowData: rowData1, setRowData: setRowData1, selectedRow: selectedRow1, setSelectedRow: setSelectedRow1, openModal: openModal1, closeModal: closeModal1, handleInputChange: handleInputChange1, handleSave: handleSave1, handleRowClick: handleRowClick1, handleDelete: handleDelete1, handleScoreSave: handleScoreSave1, calculateTotal: calculateTotal1 } = useGrade(1);
  const { tableData: tableData2, setTableData: setTableData2, isModalOpen: isModalOpen2, setIsModalOpen: setIsModalOpen2, rowData: rowData2, setRowData: setRowData2, selectedRow: selectedRow2, setSelectedRow: setSelectedRow2, openModal: openModal2, closeModal: closeModal2, handleInputChange: handleInputChange2, handleSave: handleSave2, handleRowClick: handleRowClick2, handleDelete: handleDelete2, handleScoreSave: handleScoreSave2, calculateTotal: calculateTotal2 } = useGrade(2);
  const { tableData: tableData3, setTableData: setTableData3, isModalOpen: isModalOpen3, setIsModalOpen: setIsModalOpen3, rowData: rowData3, setRowData: setRowData3, selectedRow: selectedRow3, setSelectedRow: setSelectedRow3, openModal: openModal3, closeModal: closeModal3, handleInputChange: handleInputChange3, handleSave: handleSave3, handleRowClick: handleRowClick3, handleDelete: handleDelete3, handleScoreSave: handleScoreSave3, calculateTotal: calculateTotal3 } = useGrade(3);



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
