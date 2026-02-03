import { useState } from "react";

import { IconButton, Toolbar, Typography, AppBar, Drawer, ListItemText, List, ListItemButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const MyAppBar = ({setMode, setStartNewGame}) => {
  
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onClickListItemMode = (numero) => {
    setMode(numero)
    setStartNewGame(true)
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            // onClick={handleDrawerOpen}
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{position: 'absolute', left: '50%'}}>
            MiniGames
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton 
          onClick={handleDrawerClose}
          sx={{
            "&:focus": {
              outline: "none",
            },
            marginTop: '1em'
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <List>
          <ListItemButton onClick={() => onClickListItemMode(0)}>
            <ListItemText style={{margin: '2em'}}>Niveau 1</ListItemText>
          </ListItemButton>
          <ListItemButton onClick={() => onClickListItemMode(1)}>
            <ListItemText style={{margin: '2em'}}>Niveau 2</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
    </>
  )
}

export default MyAppBar;