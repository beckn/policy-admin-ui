import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import "./Table.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export interface TableModelProps {
  rows?: any;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Title", width: 150 },
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
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="4"
      viewBox="0 0 9 4"
      fill="none"
    >
      <path
        d="M0.0737219 0.514852L0.11948 0.558624L3.57678 3.82074C3.69372 3.93121 3.86913 4 4.06487 4C4.26061 4 4.43602 3.92913 4.55296 3.82074L8.00772 0.564878L8.06619 0.510683C8.1094 0.458572 8.13482 0.396039 8.13482 0.329338C8.13482 0.147994 7.94671 2.38419e-07 7.71283 2.38419e-07L0.421994 2.38419e-07C0.188118 2.38419e-07 0 0.147994 0 0.329338C0 0.398124 0.0279635 0.462741 0.0737219 0.514852Z"
        fill="black"
      />
    </svg>
  );
}
function ColumnSortedAscendingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="4"
      viewBox="0 0 9 4"
      fill="none"
    >
      <path
        d="M0.0737219 3.48515L0.11948 3.44138L3.57678 0.17926C3.69372 0.0687856 3.86913 0 4.06487 0C4.26061 0 4.43602 0.0708701 4.55296 0.17926L8.00772 3.43512L8.06619 3.48932C8.1094 3.54143 8.13482 3.60396 8.13482 3.67066C8.13482 3.85201 7.94671 4 7.71283 4L0.421994 4C0.188118 4 0 3.85201 0 3.67066C0 3.60188 0.0279635 3.53726 0.0737219 3.48515Z"
        fill="black"
      />
    </svg>
  );
}
function ColumnUnsortedIcon() {
  return (
    <svg
      width="9"
      height="12"
      viewBox="0 0 9 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.0737219 8.51485L0.11948 8.55862L3.57678 11.8207C3.69372 11.9312 3.86913 12 4.06487 12C4.26061 12 4.43602 11.9291 4.55296 11.8207L8.00772 8.56488L8.06619 8.51068C8.1094 8.45857 8.13482 8.39604 8.13482 8.32934C8.13482 8.14799 7.94671 8 7.71283 8L0.421994 8C0.188118 8 0 8.14799 0 8.32934C0 8.39812 0.0279635 8.46274 0.0737219 8.51485Z"
        fill="black"
      />
      <path
        d="M0.0737219 3.48515L0.11948 3.44138L3.57678 0.17926C3.69372 0.0687856 3.86913 0 4.06487 0C4.26061 0 4.43602 0.0708701 4.55296 0.17926L8.00772 3.43512L8.06619 3.48932C8.1094 3.54143 8.13482 3.60396 8.13482 3.67066C8.13482 3.85201 7.94671 4 7.71283 4L0.421994 4C0.188118 4 0 3.85201 0 3.67066C0 3.60188 0.0279635 3.53726 0.0737219 3.48515Z"
        fill="black"
      />
    </svg>
  );
}

export default function Table(props: TableModelProps) {
  const navigate = useNavigate();
  return (
    <>
      {/* <Box
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#000000",
          marginBottom: "20px",
        }}
      >
        All Policies ({props.rows.length || 0})
      </Box> */}
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
