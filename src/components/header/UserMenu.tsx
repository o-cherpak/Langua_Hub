import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router';
import * as React from "react";
import {useStudentsStore} from "../../stores/useStudentsStore.ts";
import {useState} from "react";

export function UserMenu() {
  const user = useStudentsStore(state => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar>
          {user?.name?.[0]}{user?.surname?.[0]}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfileClick}>Konto</MenuItem>

        <MenuItem onClick={handleLogout}>Wyloguj się</MenuItem>
      </Menu>
    </>
  );
}