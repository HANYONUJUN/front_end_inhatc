import { useState } from 'react';

const useSelectedRow = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return [selectedRow, setSelectedRow, handleRowClick];
};

export default useSelectedRow;
