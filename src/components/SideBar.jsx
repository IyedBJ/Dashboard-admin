import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MuiDrawer from "@mui/material/Drawer";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import List from "@mui/material/List";
import { Avatar, Divider, styled, Typography, useTheme } from "@mui/material";
import AccessibilityOutlinedIcon from "@mui/icons-material/AccessibilityOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
  // @ts-ignore
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Array1 = [
  { text: "Tableau de bord", icon: <HomeOutlinedIcon />, path: "/" },
  {
    text: "gérer les réclamations",
    icon: <GridViewOutlinedIcon />,
    path: "/reclamations",
  },
  {
    text: "Equipe",
    icon: <AccessibilityOutlinedIcon />,
    path: "/equipe",
  },
];

const Array3 = [
  {
    text: "Graphique à barres",
    icon: <BarChartOutlinedIcon />,
    path: "/Graphique à barres",
  },
  {
    text: "Graphique en secteurs",
    icon: <PieChartOutlinedIcon />,
    path: "/Graphique en secteurs",
  },
  {
    text: "Graphique linéaire",
    icon: <InsertChartOutlinedOutlinedIcon />,
    path: "/Graphique linéaire",
  },
  {
    text: "Graphique géographique",
    icon: <TerrainOutlinedIcon />,
    path: "/Graphique géographique",
  },
];

function SideBar({ open, handleDrawerClose }) {
  const theme = useTheme();
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Avatar
        sx={{
          mx: "auto",
          width: open ? 55 : 44,
          height: open ? 55 : 44,
          marginTop: 1,
          marginBottom: 1,
          border: "2px solid grey",
        }}
        alt="iyed_photo"
        src="/img_profile.jpg"
      />
      <Typography
        align="center"
        sx={{ fontSize: open ? 17 : 0, transition: "0.3s" }}
      >
        Iyed
      </Typography>
      <Typography
        align="center"
        sx={{
          fontSize: open ? 15 : 0,
          transition: "0.3s",
          color: theme.palette.info.main,
        }}
      >
        Admin
      </Typography>

      <Divider />

      <List>
        {Array1.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
                bgcolor:
                  location.pathname === item.path
                    ? theme.palette.mode === "dark"
                      ? grey[700]
                      : grey[300]
                    : null,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Divider />

      <List>
        {Array3.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default SideBar;
