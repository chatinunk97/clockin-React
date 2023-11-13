import * as React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid, GridToolbar, GridToolbarFilterButton } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

const columns = [
  { field: 'name', headerName: 'Company Name', flex: 1 },
  { field: 'companyName', headerName: 'Company name', flex: 1 },
  { field: 'isActive', headerName: 'Is Active', flex: 1 },
  { field: 'packageId', headerName: 'Package ID', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

function createData(id, name, companyName, isActive, packageId, status) {
  return { id, name, companyName, isActive, packageId, status };
}

const rows = [
  createData(1, "A", 159, 6.0, 24, 4.0),
  createData(2, "B", 237, 9.0, 37, 4.3),
  createData(3, "C", 262, 16.0, 24, 6.0),
  createData(4, "D", 305, 3.7, 67, 4.3),
  createData(5, "E", 356, 16.0, 49, 3.9),
  createData(6, "F", 159, 6.0, 24, 4.0),
  createData(7, "G", 237, 9.0, 37, 4.3),
  createData(8, "H", 262, 16.0, 24, 6.0),
  createData(9, "I", 305, 3.7, 67, 4.3),
  createData(10, "J", 356, 16.0, 49, 3.9),
  createData(11, "K", 159, 6.0, 24, 4.0),
  createData(12, "L", 237, 9.0, 37, 4.3),
  createData(13, "M", 262, 16.0, 24, 6.0),
  createData(14, "N", 305, 3.7, 67, 4.3),
  createData(15, "O", 356, 16.0, 49, 3.9),
  createData(16, "P", 159, 6.0, 24, 4.0),
  createData(17, "Q", 237, 9.0, 37, 4.3),
  createData(18, "R", 262, 16.0, 24, 6.0),
  createData(19, "S", 305, 3.7, 67, 4.3),
  createData(20, "T", 356, 16.0, 49, 3.9),
  createData(21, "U", 159, 6.0, 24, 4.0),
  createData(22, "V", 237, 9.0, 37, 4.3),
  createData(23, "W", 262, 16.0, 24, 6.0),
  createData(24, "X", 305, 3.7, 67, 4.3),
  createData(25, "Y", 356, 16.0, 49, 3.9),
  createData(26, "Z", 159, 6.0, 24, 4.0),
  createData(27, "AA", 237, 9.0, 37, 4.3),
  createData(28, "AB", 262, 16.0, 24, 6.0),
  createData(29, "AC", 305, 3.7, 67, 4.3),
  createData(30, "AD", 356, 16.0, 49, 3.9),
];


export default function MUITable2() {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  const handleRowClick = (params) => {
    console.log('Clicked Row:', params.data);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: () => (
            <React.Fragment>
              <GridToolbar />
              <GridToolbarFilterButton />
            </React.Fragment>
          ),
        }}
        onRowClick={handleRowClick}
      />

      <Button variant="contained" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
}
