import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./Header.css";

const settings = ["Logout"];

export interface HeaderProp {
  HeaderText: string;
  textCount?: number;
}

function ResponsiveAppBar(props: HeaderProp) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{ background: "#FFFFFF8C" }}
      className="appbar"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontWeight: 600,
                color: "#000000",
                textDecoration: "none",
              }}
            >
              {props.HeaderText}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }} display="flex" alignItems={"center"}>
            <Tooltip title="">
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </Tooltip>
            <Box marginLeft={"15px"}>
              <Typography textAlign="left" color={"#000000"} fontSize="16px">
                Satya
              </Typography>
              <Typography textAlign="left" color={"#000000"} fontSize="12px">
                Admin
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
