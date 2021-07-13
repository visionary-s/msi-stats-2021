import React from 'react';
// import styles from './Tables.module.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper, withStyles, makeStyles, Switch } from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCellsPlayer1 = [
    { id: "order", numeric: false, disablePadding: false, label: 'Place' },
    { id: "playername", numeric: true, disablePadding: true, label: 'Player Name' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

const createHeader = (tableName) => {
    let headers = [];
    switch(tableName) {
        case "playerT1":
            headers = ["Order", "Player", "Team", "Role", "Appeared Times", "KDA", "Attendrate", "Kills (per game)", "Most Kills", "Deaths (per game)", "Most Deaths", "Assists (per game)"];
            break;
        case "playerT2":
            headers = ["Order", "Player", "Most assists", "Golds (per min)", "Last hit (per min)", "Damage to Hero (per min)", "Damage to Hero Percent", "Damage taken (per min)", "Damage taken percent", "Wards placed (per min)", "Wards killed (per min)"];
            break;
        case "teamT1":
            headers = ["Order", "Team", "KDA", "Kills (per game)", "Deaths (per game)", "Damage to Hero (per min)", "First Blood percentage", "Average duration", "Gold (per match)", "Golds (per min)", "Last hit (per min)"];
            break;
        case "teamT2":
            headers = ["Order", "Team", "Dragon kills (per game)", "Dragon kills percentage", "Baron kills (per game)", "Baron kills percentage", "Wards placed (per min)", "Wards killed (per min)", "Wards killed rate", "Tower takens (per game)", "Tower deaths (per game)"];
            break;
        default:
            break;
    }
    return headers;
};

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});

const Tables = ( {data} ) => {
    const classes = useStyles();
    const headers = createHeader(data[0]);
    const rows = data[1];

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => 
                                <StyledTableCell align="center">{header}</StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row[0]}>
                        {/* <StyledTableCell component="th" scope="row">
                            {row[0]}
                        </StyledTableCell> */}
                        {row.map((dt) => 
                            <StyledTableCell align="center">{dt}</StyledTableCell>
                        )}
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
        
    )
};

export default Tables;