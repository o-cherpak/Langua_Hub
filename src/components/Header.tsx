import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar} from '@mui/material';

export function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon sx={{fontSize: "2rem"}}/>
          </IconButton>

          <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
            Lingua Hub
          </Typography>

          <IconButton
            sx={{
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <Avatar>H</Avatar>
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
