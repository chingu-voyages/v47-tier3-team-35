'use client'

import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/material";

import { LogDataType } from "../page";

// Need to modify the type since the date needs to be a number in order to compare
type LogDataTypeMod = {
  id: number;
  timestamp: number;
  price: number;
  amount: number;
  totalCost: number;
}

function createData(
  id: number,
  timestamp: number,
  price: number,
  amount: number,
  totalCost: number
): LogDataTypeMod{
  return {
    id,
    timestamp,
    price,
    amount,
    totalCost,
  };
}

interface FoodActivity {
  foodLogs: LogDataType[];
}


// COMPONENT STARTS HERE -- because I need the props

const FoodActivity = ({ foodLogs }: FoodActivity) => {

  const theme = useTheme();

  const rows = foodLogs.map((row, i) =>
      createData(i, row.timestamp.getTime(), row.price, row.amount, (row.price * row.amount))
  );


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

  interface HeadCell {
    disablePadding: boolean;
    id: keyof LogDataTypeMod;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "timestamp",
      numeric: true,
      disablePadding: false,
      label: "Date",
    },

    {
      id: "totalCost",
      numeric: true,
      disablePadding: true,
      label: "Inventory Value",
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
  ];

  interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof LogDataTypeMod) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof LogDataTypeMod) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  
  return (
    <TableHead className="w-full">
      <TableRow className="w-full">
        {headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id}
            align={
              i === 0 ? "left" : i === headCells.length - 1 ? "right" : "center"
            }
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={`text-default-ref-neutral-neutral60 py-2 ${
              i === 0 ? "ps-4" : i === headCells.length - 1 ? "pe-4" : ''
            }`}
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem", lg: "1.125rem" },
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              className="text-default-ref-neutral-neutral60 whitespace-nowrap"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
  
  

function EnhancedTableToolbar() {
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        variant="subtitle1"
        id="tableTitle"
        component="h1"
        className="text-default-ref-neutral-neutral40 flex-grow w-full pt-5 pb-3 md:w-fit"
        sx={{
          width: { xs: "100%", md: "" },
          [theme.breakpoints.up("md")]: {
            variant: "h2",
          },
        }}
      >
        Your Activity
      </Typography>
    </Toolbar>
  );
}

const [order, setOrder] = React.useState<Order>("desc");
const [orderBy, setOrderBy] = React.useState<keyof LogDataTypeMod>("timestamp");
const [selected, setSelected] = React.useState<readonly number[]>([]);
const [page, setPage] = React.useState(0);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

const handleRequestSort = (
  event: React.MouseEvent<unknown>,
  property: keyof LogDataTypeMod
) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected: readonly number[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
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

const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

const visibleRows = React.useMemo(
  () =>
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    ),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [order, orderBy, page, rowsPerPage]
);

return (
    <Paper  className={'w-full h-full'}>
      <EnhancedTableToolbar  />
      <TableContainer sx={{flexGrow: 1}}>
      <Table
        className="w-full"
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  onClick={(event) => handleClick(event, row.id)}
                  tabIndex={-1}
                  key={row.id}
                >
                  <TableCell
                    component="th"
                    className={`text-default-ref-neutral-neutral40 
                      ${
                        index % 2 === 0
                          ? "transparent"
                          : "bg-default-ref-primary-primary98"
                      }
                    `}
                    sx={{
                      fontSize: {xs: '0.875rem', md: '1rem', lg: '1.125rem'},
                      border: "none",
                    }}
                    id={labelId}
                    scope="row"
                  >
                    {new Date(row.timestamp).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={`${
                      row.amount < 0 ? "text-red-800 " : "text-green-800 "
                    }
                      ${
                        index % 2 === 0
                          ? "transparent"
                          : "bg-default-ref-primary-primary98"
                      } 
                    `}
                    sx={{
                      fontSize: {xs: '0.875rem', md: '1rem', lg: '1.125rem'},
                      border: "none",
                      fontWeight: "500",
                    }}
                    align="center"
                  >
                    {row.totalCost < 0 ? "-" : ""}$
                    {
                      row.totalCost
                        .toFixed(2)
                        .split(/[-.]/)
                        .filter((s) => s)[0]
                    }
                    <span className="text-[0.625rem] align-top inline-block pt-[1px]">
                      {row.totalCost.toFixed(2).split(".")[1]}
                    </span>
                  </TableCell>
                  <TableCell
                    className={`${
                      row.amount < 0 ? "text-red-800 " : "text-green-800 "
                    }
                      ${
                        index % 2 === 0
                          ? "transparent"
                          : "bg-default-ref-primary-primary98"
                      }
                    `}
                    sx={{
                      fontSize: {xs: '0.875rem', md: '1rem', lg: '1.125rem'},
                      border: "none",
                      fontWeight: "500",
                    }}
                    align="right"
                  >
                    {row.amount}
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
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
);
};

export default FoodActivity;
