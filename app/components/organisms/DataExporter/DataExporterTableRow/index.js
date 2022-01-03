import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import { useEffect } from "react";


const DataExporterTableRow = ({
    row, index, cellLabels, handleClick, selected
}) => {

    const isSelected = (name) => {
        if (selected !== undefined){
            selected.indexOf(name) !== -1;
        }
    }

    const isItemSelected = isSelected(row);
    const labelId = `enhanced-table-checkbox-${index}`;

    return( 
        <TableRow
            hover
            onClick={(event) => handleClick(event, row)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.objectId}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
            <Checkbox
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
            />
            </TableCell>
            {
            cellLabels.map((label) => (
                <TableCell>
                    {typeof(row[label]) !== "object" && (
                         <div>{row[label]}</div>
                    )}
                </TableCell>
            ))}
        </TableRow>
    )};

export default DataExporterTableRow;