import {
  AccountCircle,
  BuildOutlined,
  Handshake,
  Home,
  Logout,
  PersonOffOutlined,
} from "@mui/icons-material";
export const userMenu = [
  {
    title: "Dashboard",
    path: "",
    icon: <Home />,
  },
  {
    title: "Projects",
    path: "projects",
    icon: <BuildOutlined />,
  },
  {
    title: "Contributions",
    path: "contributions",
    icon: <Handshake />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <AccountCircle />,
  },
];
