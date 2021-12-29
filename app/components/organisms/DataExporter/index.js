import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import DataExporterTableRow from "./TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import PositionedMenu from "./Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import retrieveAllFormResults from './_data';
import { useStyles, EnhancedTableToolbar, EnhancedTableHead } from './_utils'
import SubmitButton from "./SubmitButton";

const DataExporter = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("surveyingOrganization");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [cellLabels, setCellLabels] = React.useState([]);
  const [formType, setFormType] = React.useState('SurveyData')
  const [formValue, setFormValue] = React.useState('Survey Data')
  const [params, setParams] = React.useState({surveyingOrganization: '12'})

  const refreshDataExporter = () => retrieveAllFormResults(formType, params).then(records =>  {
    console.log(records)
    if (records.length < 1){
      console.log(formType)
      console.log(params)
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
      {/* <div>
        {rows.map()}
      </div> */}

      <PositionedMenu 
        setFormType={setFormType}
        formType={formType}
        setFormValue={setFormValue}
        formValue={formValue}
        setParams={setParams}
      />
      <SubmitButton
        handleSubmit={handleSubmit}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar 
          numSelected={selected.length}
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
                rows.map((row, index) => (
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
