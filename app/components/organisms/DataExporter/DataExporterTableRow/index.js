import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const DataExporterTableRow = ({
    row, cellLabels
}) => {

    return( 
        <TableRow
            hover
            key={row.objectId}
        >
            {cellLabels.map((label) => (
                <TableCell>
                    {typeof(row[label]) !== "object" && (
                         <div>{row[label]}</div>
                    )}
                </TableCell>
            ))}
        </TableRow>
    )};

export default DataExporterTableRow;