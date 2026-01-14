import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Divider, MenuItem } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HeaderMenu } from "./HeaderMenu";

export function MainMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (path: string) => {
    handleClose();
    navigate(path);
  };

  useEffect(() => {
    let timer: number;

    if (anchorEl) {
      timer = window.setTimeout(() => {
        handleClose();
      }, 5000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [anchorEl]);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon sx={{ fontSize: "2rem" }} />
      </IconButton>

      <HeaderMenu anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={() => goTo("/dashboard")}>Oceny</MenuItem>

        <Divider />

        <MenuItem onClick={() => goTo("/ann")}>Ogłoszenia</MenuItem>

        <Divider />

        <MenuItem onClick={() => goTo("/schedule")}>Plany Zajęć</MenuItem>
      </HeaderMenu>
    </>
  );
}
