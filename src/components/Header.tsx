import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Avatar} from '@mui/material';
import {Link} from 'react-router';

export function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon sx={{fontSize: "2rem"}}/>
            </IconButton>

            <Typography
              component={Link}
              to={'/'}
              variant="h5"
              sx={{textDecoration: 'none', color: 'inherit'}}
            >
              Lingua Hub
            </Typography>
          </Box>

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
