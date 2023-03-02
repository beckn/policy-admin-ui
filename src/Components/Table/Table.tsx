import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import "./Table.css";

const columns: GridColDef[] = [
  { field: "id", headerName: "Name", width: 200 },
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
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 180,
    type: "date",
  },
];

const rows = [
  {
    id: "Quarantine zones",
    status: "Active",
    description:
      "lorem ipsum dolor sit amet consectetuer adipiscing elit sed do eiusmod tempor",
    startDate: "1/2/2020",
    endDate: "5/2/2020",
  },
  {
    id: "Policy name 1",
    status: "Inactive",
    description:
      "lorem ipsum dolor sit amet consectetuer adipiscing elit sed do eiusmod tempor",
    startDate: "8/2/2020",
    endDate: "8/2/2020",
  },
  {
    id: "Policy long name",
    status: "Published",
    description:
      "lorem ipsum dolor sit amet consectetuer adipiscing elit sed do eiusmod tempor",
    startDate: "2/2/2020",
    endDate: "2/2/2020",
  },
  {
    id: "Policy very long name",
    status: "Active",
    description:
      "lorem ipsum dolor sit amet consectetuer adipiscing elit sed do eiusmod tempor",
    startDate: "4/2/2020",
    endDate: "4/2/2020",
  },
  {
    id: "Policy very long name2",
    status: "Inactive",
    description:
      "lorem ipsum dolor sit amet consectetuer adipiscing elit sed do eiusmod tempor",
    startDate: "1/2/2020",
    endDate: "2/2/2020",
  },
];

function CustomUnsortedIcon() {
  return <UnfoldMoreIcon />;
}

export default function Table() {
  return (
    <>
      <span
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#000000",
          lineHeight: "27px",
        }}
      >
        All Policies (23)
      </span>
      <Box sx={{ height: 318, width: "80%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideFooter={true}
          autoHeight={true}
          rowHeight={55}
          components={{
            ColumnUnsortedIcon: CustomUnsortedIcon,
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
