import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export interface TableModelProps {
  rows?: any;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Name" },
  {
    field: "description",
    headerName: "Description",
    width: 350,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    editable: true,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    type: "date",
    width: 180,
    editable: true,
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 180,
    type: "date",
    valueFormatter: (params) => dayjs(params.value).format("DD/MM/YYYY"),
  },
];

function ColumnSortedDescendingIcon() {
  return <ArrowDropDownIcon />;
}
function ColumnSortedAscendingIcon() {
  return <ArrowDropUpIcon />;
}
function ColumnUnsortedIcon() {
  return <UnfoldMoreIcon />;
}

export default function Table(props: TableModelProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#000000",
          marginBottom: "20px",
        }}
      >
        All Policies ({props.rows.length || 0})
      </Box>
      <Box sx={{ height: 318 }}>
        <DataGrid
          style={{ cursor: "pointer" }}
          rows={props.rows}
          onRowClick={(row) => navigate(`/policyDetails/:${row.id}`)}
          columns={columns}
          hideFooter={true}
          autoHeight={true}
          rowHeight={64}
          components={{
            ColumnUnsortedIcon: ColumnUnsortedIcon,
            ColumnSortedAscendingIcon: ColumnSortedAscendingIcon,
            ColumnSortedDescendingIcon: ColumnSortedDescendingIcon,
          }}
          sx={{
            ".MuiDataGrid-iconButtonContainer": {
              visibility: "visible",
            },
            ".MuiDataGrid-sortIcon": {
              opacity: "inherit !important",
            },
          }}
        />
      </Box>
    </>
  );
}
