import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import "./DashboardTabs.css";
import Card from "../../Components/Card/Card";
import { Link } from "react-router-dom";
import Table from "../../Components/Table/Table";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardTabs() {
  const [value, setValue] = React.useState(0);
  const [createValue, setCreateValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleCreatePolicy = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setCreateValue(newValue);
  };

  const policyStates = ["Active", "Inactive", "Published"];

  return (
    <>
      {policyStates.map((policyState: string) => {
        return <Card cardText={policyState} />;
      })}
      <Box sx={{ width: "100%" }} marginTop="40px" className={"tab-container"}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          display="flex"
          justifyContent="space-between"
          margin={"15px"}
        >
          <Tabs value={value} onChange={handleChange} className="tabs">
            <Tab className="tab" label=" All" {...a11yProps(0)} />
            <Tab className="tab" label="Active" {...a11yProps(1)} />
            <Tab className="tab" label="Inactive" {...a11yProps(2)} />
            <Tab className="tab" label="Published" {...a11yProps(3)} />
          </Tabs>
          <Box
            display={"flex"}
            alignItems={"center"}
            style={{ cursor: "pointer" }}
          >
            <AddIcon />
            <Link style={{ textDecoration: "none" }} to="/createPolicy">
              <Tab className="createPolicy" label="Create new Policy" />
            </Link>
          </Box>
        </Box>

        <TabPanel value={value} index={0}>
          {/* <img src="/assets/empty.svg" alt="" style={{ margin: "0 auto" }} /> */}
          <Table />
        </TabPanel>

        <TabPanel value={value} index={1}>
          Active
        </TabPanel>
        <TabPanel value={value} index={2}>
          Inactive
        </TabPanel>
        <TabPanel value={value} index={3}>
          Published
        </TabPanel>
      </Box>
    </>
  );
}
