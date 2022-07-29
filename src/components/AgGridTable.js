import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { faker } from '@faker-js/faker';

export const AgGridTable = () => {
  const newRowData = {
    id: faker.random.numeric(8),
    name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    status: Math.random() > 0.5 ? 'Single' : 'Married',
  };
  const [selectedRows, setSelectedRows] = useState({});
  const [rowsData, setRowsData] = useState([
    { id: 98989898, name: 'mohammed', last_name: 'Aljasem', status: 'Single' },
  ]);

  const addNewRow = () => {
    setRowsData([...rowsData, newRowData]);
  };

  const [columnDefs] = useState([
    {
      field: 'id',
      minWidth: 50,
      checkboxSelection: true,
    },
    { field: 'name' },
    { field: 'last_name' },
    { field: 'status' },
  ]);

  const onRowSelected = (event) => {
    const id = event.node.data.id;
    if (selectedRows[id]) {
      delete selectedRows[id];
      setSelectedRows(selectedRows);
      return selectedRows;
    }

    setSelectedRows({ ...selectedRows, [id]: id });
  };

  const deleteSelectedRows = () => {
    const newRows = rowsData.filter((item) => {
      return !selectedRows[item.id];
    });
    setRowsData(newRows);
  };

  return (
    <div className='ag-theme-alpine' style={{ height: '40vh', width: 'auto' }}>
      <button onClick={addNewRow}>Add new Row</button>
      <button onClick={deleteSelectedRows}>Delete Selected Rows</button>
      <br />
      <br />
      <br />
      <AgGridReact
        rowSelection={'multiple'}
        onRowSelected={onRowSelected}
        suppressRowClickSelection={true}
        rowData={rowsData}
        columnDefs={columnDefs}></AgGridReact>
    </div>
  );
};
