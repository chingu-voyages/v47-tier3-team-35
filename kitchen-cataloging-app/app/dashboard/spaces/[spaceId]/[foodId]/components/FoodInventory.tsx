"use client";

import * as React from "react";
import { alpha } from "@mui/material/styles";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useTheme } from "@mui/material/styles";

import { FoodDataType } from "../page";
import { Stack } from "@mui/material";

// Need to modify the type since the date needs to be a number in order to compare
type FoodDataTypeMod = {
  id: number;
  expirationDate: number;
  price: number;
  amount: number;
  totalCost: number;
};

function createData(
  id: number,
  expirationDate: number,
  price: number,
  amount: number,
  totalCost: number
): FoodDataTypeMod {
  return {
    id,
    expirationDate,
    price,
    amount,
    totalCost,
  };
}

interface FoodInventory {
  foodDataSingle: FoodDataType;
  handleIncrement: (num: number) => void;
}

// COMPONENT STARTS HERE -- because the props are needed

const FoodInventory = ({ foodDataSingle, handleIncrement }: FoodInventory) => {
  // REFACTOR: at the moment, only one food is being passed in. (So it's put in an array for now) Do we want to find ALL foods of a certain title?
  const foodData = [foodDataSingle];

  const theme = useTheme();

  const tablePadding = 6;
  const totalProductAmount = foodData
    .map((data) => data.amount)
    .reduce((a, c) => a + c);
  const totalProductValue: number = foodData
    .map((data) => data.price * data.amount)
    .reduce((a, c) => a + c);

  const rows = foodData.map((row, i) =>
    createData(
      i,
      row.expirationDate ? row.expirationDate.getTime() : 0,
      row.price,
      row.amount,
      row.price * row.amount
    )
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
    id: keyof FoodDataTypeMod;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "expirationDate",
      numeric: true,
      disablePadding: false,
      label: "Expires",
    },
    {
      id: "price",
      numeric: true,
      disablePadding: false,
      label: "Price",
    },
    // {
    //   id: "totalCost",
    //   numeric: true,
    //   disablePadding: true,
    //   label: "Inventory Value",
    // },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: "Quantity",
    },
  ];

  interface EnhancedTableProps {
    // numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof FoodDataTypeMod
    ) => void;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof FoodDataTypeMod) =>
      (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, i) => (
            <TableCell
              key={headCell.id}
              align={i === 0 ? "left" : "center"}
              padding={"none"}
              sortDirection={orderBy === headCell.id ? order : false}
              className="text-default-ref-neutral-neutral60 px-4 pb-2"
              sx={{
                fontSize: { xs: "0.875rem", md: "1.125rem" },
              }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                className="text-default-ref-neutral-neutral60"
                sx={{ transform: `${i > 0 ? "translateX(12px)" : ""}` }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function EnhancedTableToolbar() {
    return (
      <Toolbar className="px-4 pb-6 flex flex-row items-start flex-wrap md:flex-row md:items-center md:flex-nowrap md:px-0 md:pb-12">
        <Typography
          variant="subtitle1"
          id="tableTitle"
          component="h1"
          className="text-default-ref-neutral-neutral40 flex-grow w-full pb-3 md:w-fit"
          sx={{
            width: { xs: "100%", md: "" },
            [theme.breakpoints.up("md")]: {
              variant: "h2",
            },
          }}
        >
          Inventory
        </Typography>
        <Stack direction="row" className="items-center gap-3 w-1/2 md:w-fit">
          <Typography
            variant="h3"
            id="tableTitle"
            component="h2"
            className="text-default-sys-light-tertiary relative whitespace-nowrap"
            sx={{
              [theme.breakpoints.up("md")]: {
                variant: "h2",
              },
            }}
          >
            ${totalProductValue.toString().split(".")[0]}
            <span className="text-[1.5rem] md:text-[1.75rem] align-top inline-block">
              {totalProductValue.toFixed(2).toString().split(".")[1]}
            </span>
          </Typography>
          <Typography
            variant="body3"
            id="tableTitle"
            component="p"
            className="text-default-sys-light-tertiary md:w-20"
            sx={{
              [theme.breakpoints.up("md")]: {
                variant: "body1",
              },
            }}
          >
            of {foodData[0].title} in {foodData[0].roomTitle}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          className="justify-end items-center gap-3 w-1/2 ps-4 md:w-fit"
        >
          <Typography
            variant="h3"
            id="tableTitle"
            component="h3"
            className="text-default-sys-light-primary"
            sx={{
              [theme.breakpoints.up("md")]: {
                variant: "h2",
              },
            }}
          >
            {totalProductAmount}
          </Typography>
          <Typography
            variant="body3"
            id="tableTitle"
            component="p"
            className="text-default-sys-light-primary md:w-20"
            sx={{
              [theme.breakpoints.up("md")]: {
                variant: "body1",
              },
            }}
          >
            {foodData[0].title}
            {totalProductAmount !== 1 &&
            foodData[0].title[foodData[0].title.length - 1] !== "s"
              ? "s"
              : ""}{" "}
            in {foodData[0].roomTitle}
          </Typography>
        </Stack>
      </Toolbar>
    );
  }

  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] =
    React.useState<keyof FoodDataTypeMod>("expirationDate");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof FoodDataTypeMod
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

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
    <>
      <EnhancedTableToolbar />
      <TableContainer
        className="pb-4"
        sx={{
          flexGrow: { xs: 0, md: 1 },
        }}
      >
        <Table
          className={`px-${tablePadding} mx-${tablePadding}`}
          sx={{
            boxSizing: "border-box",
            maxWidth: "100%",
            overflow: "hidden",
            mt: { xs: "1rem", md: "0" },
          }}
          aria-labelledby="tableTitle"
          // size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody
            sx={{
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            {visibleRows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  onClick={(event) => handleClick(event, row.id)}
                  tabIndex={-1}
                  key={row.id}
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
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
                      fontSize: { xs: "0.875rem", md: "1.125rem" },
                    }}
                    id={labelId}
                    scope="row"
                  >
                    {new Date(row.expirationDate).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell
                    className={`${"text-green-800 "}
                      ${
                        index % 2 === 0
                          ? "transparent"
                          : "bg-default-ref-primary-primary98"
                      }
                    `}
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1.125rem" },
                      fontWeight: "500",
                    }}
                    align="center"
                  >
                    {row.price}
                  </TableCell>
                  <TableCell
                    className={`${"text-green-800 "}
                      ${
                        index % 2 === 0
                          ? "transparent"
                          : "bg-default-ref-primary-primary98"
                      }
                    `}
                    sx={{
                      fontSize: { xs: "0.875rem", md: "1.125rem" },
                      fontWeight: "500",
                    }}
                    align="center"
                  >
                    {row.amount}
                  </TableCell>
                  <TableCell padding="none" align="center">
                    <Box
                      className="flex pe-2"
                      sx={{
                        gap: { xs: "0.875rem", md: "1rem" },
                        justifyContent: { xs: "start", md: "center" },
                        alignItems: "stretch",
                      }}
                    >
                      <IconButton
                        className="text-default-ref-neutral-neutral30 bg-default-ref-neutral-neutral90"
                        sx={{
                          width: { xs: "1.25rem", md: "1.5rem" },
                          height: { xs: "1.25rem", md: "1.5rem" },
                        }}
                        onClick={() => handleIncrement(1)}
                      >
                        <AddIcon className="text-default-ref-neutral-neutral30 text-sm" />
                      </IconButton>
                      <IconButton
                        className="text-default-ref-neutral-neutral30 bg-default-ref-neutral-neutral90"
                        sx={{
                          width: { xs: "1.25rem", md: "1.5rem" },
                          height: { xs: "1.25rem", md: "1.5rem" },
                        }}
                        onClick={() => handleIncrement(-1)}
                      >
                        <RemoveIcon className="text-default-ref-neutral-neutral30 text-sm" />
                      </IconButton>
                    </Box>
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
    </>
  );
};

export default FoodInventory;
