import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Header from "../Header/Header";
import { Container, Typography } from "@mui/material";
import "./SideNav.css";
import Card from "../Card/Card";
import Tabs from "../Tabs/Tabs";
import Form from "../Form/Form";
import Geofencing from "../Geofencing /Geofencing";
import PolicyModal from "../Policy-modal/PolicyModal";

const drawerWidth = 262;

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="custom-drawer">
      <Typography
        textAlign="left"
        fontSize="18px"
        fontWeight={"600"}
        padding="20px"
      >
        Network Policy Administration Console
      </Typography>
      <Divider className="drawer-devider" />
      <List style={{ paddingLeft: "50px", marginTop: "10px" }}>
        <ListItem disablePadding>
          <ListItemButton className="list-btn active">
            <ListItemText primary={"Home"} className="list-text" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Header />
        <Box
          className={"policy-wrapper"}
          style={{
            padding: " 25px 25px 20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* <Card />
          <Card />
          <Card />

          <Tabs />
          <Form /> */}
          {/* <Geofencing /> */}
          <PolicyModal
            modalIcon="/assets/Created.svg"
            policyTitle={"Policy has been created!"}
            policySubTitle={
              "Policy activation was a success. Your policy will take effect once it has been ‘Published’. "
            }
            policyButtonText={"Okay"}
          />
        </Box>
      </Box>
    </Box>
  );
}
