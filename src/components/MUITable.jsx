import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import * as XLSX from 'xlsx';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    cursor: 'pointer',
  },
}));

function createData(name, companyName, isActive, packageId, status) {
  return { name, companyName, isActive, packageId, status };
}

const rows = [
  createData("A", 159, 6.0, 24, 4.0),
  createData("B", 237, 9.0, 37, 4.3),
  createData("C", 262, 16.0, 24, 6.0),
  createData("D", 305, 3.7, 67, 4.3),
  createData("E", 356, 16.0, 49, 3.9),
  createData("F", 159, 6.0, 24, 4.0),
  createData("G", 237, 9.0, 37, 4.3),
  createData("H", 262, 16.0, 24, 6.0),
  createData("I", 305, 3.7, 67, 4.3),
  createData("J", 356, 16.0, 49, 3.9),
  createData("K", 159, 6.0, 24, 4.0),
  createData("L", 237, 9.0, 37, 4.3),
  createData("M", 262, 16.0, 24, 6.0),
  createData("N", 305, 3.7, 67, 4.3),
  createData("O", 356, 16.0, 49, 3.9),
  createData("P", 159, 6.0, 24, 4.0),
  createData("Q", 237, 9.0, 37, 4.3),
  createData("R", 262, 16.0, 24, 6.0),
  createData("S", 305, 3.7, 67, 4.3),
  createData("T", 356, 16.0, 49, 3.9),
  createData("U", 159, 6.0, 24, 4.0),
  createData("V", 237, 9.0, 37, 4.3),
  createData("W", 262, 16.0, 24, 6.0),
  createData("X", 305, 3.7, 67, 4.3),
  createData("Y", 356, 16.0, 49, 3.9),
  createData("Z", 159, 6.0, 24, 4.0),
  createData("AA", 237, 9.0, 37, 4.3),
  createData("AB", 262, 16.0, 24, 6.0),
  createData("AC", 305, 3.7, 67, 4.3),
  createData("AD", 356, 16.0, 49, 3.9),
];

export default function MUITable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  const handleRowClick = (row) => {
    console.log('Clicked Row:', row);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="center">Company name</StyledTableCell>
              <StyledTableCell align="center">Is Active</StyledTableCell>
              <StyledTableCell align="center">packageId</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.name} onClick={() => handleRowClick(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.companyName}</StyledTableCell>
                <StyledTableCell align="center">{row.isActive}</StyledTableCell>
                <StyledTableCell align="center">{row.packageId}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Button variant="contained" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
}
