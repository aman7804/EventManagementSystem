import { Box, TableCell } from "@mui/material";
import { IIndexable } from "interfaces/generic.interface";
import { Order } from "utils/enums";

interface EnhancedTableProps<T> {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    newOrderBy: keyof T
  ) => void;
  order: Order;
  orderBy: string;
  columnHeader: string;
  columnName: keyof T;
  align?: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  width?: string | number | undefined;
  columnDisplayName: IIndexable<T>
}

export default function EnhancedTableHead<T>(props: EnhancedTableProps<T>){
  const {
    order,
    orderBy,
    onRequestSort,
    align,
    width,
    columnDisplayName
  } = props;
  const createSortHandler =
    (newOrderBy: keyof T) => (event: React.MouseEvent<unknown>) =>
      onRequestSort(event, newOrderBy);
  
  return (
    <TableCell
      key={props.columnHeader}
      align={align || "left"}
      onClick={createSortHandler(props.columnName)}
      sortDirection={orderBy === props.columnName ? order : false}
      width={width}
    >
      {columnDisplayName[props.columnName]}
      <Box component="span" className="sorting-icon" />
    </TableCell>    
  );
};