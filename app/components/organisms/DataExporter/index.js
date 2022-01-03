import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import DataExporterTableRow from "./DataExporterTableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import FormMenu from "./FormMenu";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import retrieveAllFormResults from './_data';
import { useStyles, EnhancedTableToolbar, EnhancedTableHead } from './_utils'
import SubmitButton from "./SubmitButton";

const DataExporter = () => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("surveyingOrganization");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [cellLabels, setCellLabels] = useState([]);
  const [formType, setFormType] = useState('SurveyData')
  const [formValue, setFormValue] = useState('Survey Data')
  const [organization, setOrganization] = useState('Test')
  const [params, setParams] = useState({ surveyingOrganization: organization })

  const refreshDataExporter = () => retrieveAllFormResults(formType, params).then(records =>  {
    console.log(records)
    if (records.length < 1){
      setCellLabels([])
      setRows([])
    }
    else {
      setCellLabels(Object.keys(records[0]))
      setRows(records)
    }
  }); 

  const handleSubmit = () => {
    refreshDataExporter();
  }

  useEffect(() => {
    // setFormType(formType)
    // setFormValue(formValue)
    refreshDataExporter();
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.fname);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <FormMenu 
        setFormType={setFormType}
        formType={formType}
        setFormValue={setFormValue}
        formValue={formValue}
        setParams={setParams}
        organization={organization}
      />
      <SubmitButton
        handleSubmit={handleSubmit}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
          formValue={formValue}
         />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              cellLabels={cellLabels}
            />
            <TableBody>
              {
              // stableSort(rows, getComparator(order, orderBy))
              //   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                rows.length > 0  && rows.map((row, index) => (
                  <DataExporterTableRow
                    row={row}
                    index={index}
                    cellLabels={cellLabels}
                    handleClick={handleClick}
                    selected={selected}
                  />
                  
                ))}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
              {rows.length === 0 && (
                <h5>You have no data for {formValue} form in the {organization} organization. If you believe this is an error,
                please contact your point of contact.</h5>
              )}
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
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};

export default DataExporter;
