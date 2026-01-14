import { Menu } from "@mui/material";
import type { ReactNode } from "react";

type MenuProps = {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children?: ReactNode;
};

export function HeaderMenu({ anchorEl, onClose, children }: MenuProps) {
  return (
    <Menu
      anchorEl={anchorEl}
      sx={{ top: -4 }}
      disableScrollLock
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        elevation: 2,
        sx: {
          borderRadius: "0 0 10px 10px",
          mt: 1,
          padding: "2px",
          color: "primary.main",
        },
      }}
    >
      {children}
    </Menu>
  );
}
