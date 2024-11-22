"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { HomeIcon, Search, User } from "lucide-react";
import { Paper } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const SimpleBottomNavigation = () => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);
  const pathname = usePathname();

  // Map pathname to BottomNavigation value
  const getTabValue = () => {
    switch (pathname) {
      case "/home":
        return 0;
      case "/search":
        return 1;
      case "/profile":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={getTabValue()}
          onChange={(event, newValue) => {
            // Navigate to the appropriate page when a tab is clicked
            switch (newValue) {
              case 0:
                router.push("/login/email");
                break;
              case 1:
                router.push("/search");
                break;
              case 2:
                router.push("/profile");
                break;
              default:
                break;
            }
          }}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#FFFFFF",
            padding: "2px",
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            sx={{
              color: value === 1 ? "#E62E05" : "#000",
              backgroundColor: value === 1 ? "#FFE6D5" : "transparent",
              borderRadius: "10%",
              "&.Mui-selected": {
                color: "#E62E05",
                backgroundColor: "#FFE6D5",
              },
            }}
          />
          <BottomNavigationAction
            label="Pencarian"
            icon={<Search />}
            sx={{
              color: value === 1 ? "#E62E05" : "#000",
              backgroundColor: value === 1 ? "#FFE6D5" : "transparent",
              borderRadius: "10%",
              "&.Mui-selected": {
                color: "#E62E05",
                backgroundColor: "#FFE6D5",
              },
            }}
          />
          <BottomNavigationAction
            label="Profil"
            icon={<User />}
            sx={{
              color: value === 1 ? "#E62E05" : "#000",
              backgroundColor: value === 1 ? "#FFE6D5" : "transparent",
              borderRadius: "10%",
              "&.Mui-selected": {
                color: "#E62E05",
                backgroundColor: "#FFE6D5",
              },
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default SimpleBottomNavigation;
