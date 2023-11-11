import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light, // Change this to your desired hover color (light blue)
    cursor: "pointer",
  },
}));

function createData(name, companyName, isActive, packageId, status) {
  return { name, companyName, isActive, packageId, status };
}
const rows = [
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
  createData("CompanyA", 159, 6.0, 24, 4.0),
  createData("CompanyB", 237, 9.0, 37, 4.3),
  createData("CompanyC", 262, 16.0, 24, 6.0),
  createData("CompanyD", 305, 3.7, 67, 4.3),
  createData("CompanyE", 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const handleRowClick = (row) => {
    console.log("Clicked Row:", row);
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
            {rows.map((row) => (
              <StyledTableRow
                key={row.name}
                onClick={() => handleRowClick(row)}
              >
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.companyName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.isActive}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.packageId}
                </StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button variant="contained" onClick={exportToExcel}>
        Export to Excel
      </Button>
    </div>
  );
}
