const Table = ({ tableData, handleRowClick, selectedRow, calculateTotal }) => {
    return (
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
          {tableData.map((row, index) => (
            <tr 
              key={index}
              onClick={() => handleRowClick(index)}
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
        <thead>
         <th colSpan={3}>합계</th>
             <td>{calculateTotal().학점}</td>
             <td>{calculateTotal().출석점수}</td>
             <td>{calculateTotal().과제점수}</td>
             <td>{calculateTotal().중간고사}</td>
             <td>{calculateTotal().기말고사}</td>
             <td>{calculateTotal().총점}</td>
             <td>{calculateTotal().평균}</td>
             <td>{calculateTotal().성적}</td>
        </thead>
      </table>
    );
  };

export default Table;