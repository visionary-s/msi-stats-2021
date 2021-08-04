import React from 'react';
// import styles from './Tables.module.css';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';


function descendingComparator(a, b, orderBy) {
    if (isNaN(a[orderBy]) || isNaN(b[orderBy])) {
        return (b[orderBy] < a[orderBy])? -1 : 1;

    } else {
        return b[orderBy] - a[orderBy];
    }
}

function getComparator(order, orderBy) {
    return order === 'desc'? (a, b) => descendingComparator(a, b, orderBy)
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

const createHeader = (tableName) => {
    let headers = [];
    switch(tableName) {
        case "playerT1":
            headers = ["Order", "Player", "Team", "Role", "Appeared Times", "KDA", "Attendrate", "Kills", "Most Kills", "Deaths", "Most Deaths", "Assists"];
            break;
        case "playerT2":
            headers = ["Order", "Player", "Most assists", "Golds", "Last hit", "Damage to Hero", "Damage percent", "Damage taken", "Taken percent", "Wards placed", "Wards killed"];
            break;
        case "teamT1":
            headers = ["Order", "Team", "KDA", "Kills", "Deaths", "Damage to Hero", "First Blood", "Average duration", "Gold", "Golds", "Last hit"];
            break;
        case "teamT2":
            headers = ["Order", "Team", "Dragon kills", "Dragon kills", "Baron kills", "Baron kills", "Wards placed", "Wards killed", "Wards killed rate", "Tower takens", "Tower deaths"];
            break;
        default:
            break;
    }
    // switch(tableName) {
    //     case "playerT1":
    //         headers = ["Order", "Player", "Team", "Role", "Appeared Times", "KDA", "Attendrate", "Kills (per game)", "Most Kills", "Deaths (per game)", "Most Deaths", "Assists (per game)"];
    //         break;
    //     case "playerT2":
    //         headers = ["Order", "Player", "Most assists", "Golds (per min)", "Last hit (per min)", "Damage to Hero (per min)", "Damage to Hero Percent", "Damage taken (per min)", "Damage taken percent", "Wards placed (per min)", "Wards killed (per min)"];
    //         break;
    //     case "teamT1":
    //         headers = ["Order", "Team", "KDA", "Kills (per game)", "Deaths (per game)", "Damage to Hero (per min)", "First Blood percentage", "Average duration", "Gold (per match)", "Golds (per min)", "Last hit (per min)"];
    //         break;
    //     case "teamT2":
    //         headers = ["Order", "Team", "Dragon kills (per game)", "Dragon kills percentage", "Baron kills (per game)", "Baron kills percentage", "Wards placed (per min)", "Wards killed (per min)", "Wards killed rate", "Tower takens (per game)", "Tower deaths (per game)"];
    //         break;
    //     default:
    //         break;
    // }

    return headers;
};

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort, headers } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
            {headers.map((header, i) => (i > 1? (
                <StyledTableCell
                    key={`col-${i}-${header}`}
                    align='left'
                    sortDirection={headers[orderBy] === header ? order : false}
                >
                    <TableSortLabel
                        active={headers[orderBy] === header}
                        direction={headers[orderBy] === header ? order : 'asc'}
                        onClick={createSortHandler(header)}
                    >
                        {header}
                        {headers[orderBy] === header ? (
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                        ) : null}
                    </TableSortLabel>
                </StyledTableCell>
            ):(
                <StickyTableCell
                    key={`col-${i}-${header}`}
                    align='center'
                    sortDirection={headers[orderBy] === header ? order : false}
                >
                    <TableSortLabel
                        active={headers[orderBy] === header}
                        direction={headers[orderBy] === header ? order : 'asc'}
                        onClick={createSortHandler(header)}
                    >
                        {header}
                        {headers[orderBy] === header ? (
                        <span className={classes.visuallyHidden}>
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                        ) : null}
                    </TableSortLabel>
                </StickyTableCell>
            )))}
            </TableRow>
        </TableHead>
    );
}
  
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.number.isRequired,       // ordered by column index
    headers: PropTypes.array.isRequired
};

// makeStyles uses jss syntax: https://cssinjs.org/jss-api/?v=v10.7.1#create-style-sheet
const useStyles = makeStyles((theme) => ({
    root: {
        width: "80%",
        padding: "10px",
        marginTop: theme.spacing(3)
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        width: '100%',
    },
    tableContainer: {
        maxHeight: "400px"
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: "10px"
    },
    head: {
        backgroundColor: "#00796b",
        color: theme.palette.common.white,
        maxWidth: "80px",
    },
    body: {
        maxWidth: "80px",
    },
  }))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover
//         },
//     },
// }))(TableRow);

// theme default palette: https://material-ui.com/customization/palette/
const StickyTableCell = withStyles((theme) => ({
    root: {
        padding: "10px",
    },
    head: {
        backgroundColor: "#00796b",
        color: theme.palette.common.white,
        // width: "60px",
        maxWidth: "80px",
        // minWidth: "50px",
        // maxHeight: "40px",
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2
    },
    body: {
        // backgroundColor: "#b2dfdb",
        backgroundColor: theme.palette.common.white,
        // width: "60px",
        maxWidth: "80px",
        // minWidth: "50px",
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1
    }
}))(TableCell);

const Tables = ( {data} ) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(0);    // default sorted by the first column
    const headers = createHeader(data[0]);
    const rows = data[1];

    const handleRequestSort = (event, property) => {
        const isAsc = headers[orderBy] === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(headers.indexOf(property));
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer className={classes.tableContainer}>
                    {/* <Table stickyHeader className={classes.head} aria-label="customized sticky table">
                        <TableHead>
                            <TableRow>
                                {headers.slice(0, 2).map((header, i) => 
                                    <StickyTableCell>
                                        <StyledTableCell key={i} align="center">{header}</StyledTableCell>
                                    </StickyTableCell>
                                )}
                                {headers.slice(2, headers.length + 1).map((header) => 
                                    <StyledTableCell key={header} align="center">{header}</StyledTableCell>
                                )}
                            </TableRow>
                        </TableHead> */}
                    <Table stickyHeader className={classes.table} >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            headers={headers}
                        />

                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).map((row) => (
                                <TableRow hover key={row[0]}>
                                    {row.slice(0, 2).map((dt, i) => 
                                        <StickyTableCell>
                                            <TableCell key={i} align="left">{dt}</TableCell>
                                        </StickyTableCell>
                                    )}
                                    {row.slice(2, row.length + 1).map((dt, i) => 
                                        <StyledTableCell key={i+2} align="left">{dt}</StyledTableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
};

export default Tables;