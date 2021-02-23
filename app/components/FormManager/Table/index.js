import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from 'app/components/UI/Modal';
import { removeQueryService } from 'app/services/parse';
import React, { useEffect, useState } from 'react';
import _ from 'underscore';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function FormManagerTable({ data, retrieveCustomData, organization }) {
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const classes = useStyles();

  const handleEdit = (object) => {
    console.log('The Values that you wish to edit ', object);
  };
  const handleModal = (row) => {
    setOpen(!open);
    setSelectedForm(row);
  };
  const handleRemove = () => {
    removeQueryService('FormSpecificationsV2', selectedForm.objectId);
    retrieveCustomData(organization);
    setOpen(!open);
  };

  return (
    <TableContainer component={Paper}>
      <Modal
        open={open}
        handleClose={() => setOpen(!open)}
        text="Do you want to remove this Form"
        action={handleRemove}
        actionText="Remove"
      />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* {data && headings.map((heading,index)=>(
              <TableCell key={index}>{heading}</TableCell>
            ))} */}
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Creation Date</TableCell>
            <TableCell align="right">Updated Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
              <TableCell align="right">
                {/* <Button aria-label="edit" onClick={() => handleEdit(row)}>
                  Edit
                </Button> */}
                <Button aria-label="edit" onClick={() => handleModal(row)}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
