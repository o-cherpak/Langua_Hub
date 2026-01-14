import { IconButton, Avatar, MenuItem, Divider } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import { useStudentsStore } from "../../stores/useStudentsStore.ts";
import { HeaderMenu } from "./HeaderMenu.tsx";

export function UserMenu() {
  const user = useStudentsStore((state) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleLogout = async () => {
    try {
      handleClose();
      await signOut(auth);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileClick = () => {
    handleClose();

    navigate("/student");
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar
          sx={{ bgcolor: "white", color: "primary.main", fontWeight: 500 }}
        >
          {user?.name?.[0]}
          {user?.surname?.[0]}
        </Avatar>
      </IconButton>

      <HeaderMenu anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleProfileClick}>Konto</MenuItem>

        <Divider />

        <MenuItem sx={{ color: "error.main" }} onClick={handleLogout}>
          Wyloguj się
        </MenuItem>
      </HeaderMenu>
    </>
  );
}
