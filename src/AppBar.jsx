import { useState } from "react";

import { IconButton, Toolbar, Typography, AppBar, Drawer, ListItemText, List, ListItemButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Divider } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import useStyles from "./style";

const MyAppBar = ({setMode, setStartNewGame}) => {

  const classes = useStyles();
  
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeMode = (event) => {
    const value = Number(event.target.value)
    setMode(value)
    setStartNewGame(true)
  }

  const handleChangeTheme = () => {

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
            className={classes.menuButton}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MiniGames
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={classes.divButtonClose}>
          <IconButton 
            onClick={handleDrawerClose}
            className={classes.closeButton}
            >
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider variant='middle' className={classes.divider} />

        {/* choose theme */}
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Thème</FormLabel>
          <RadioGroup
            defaultValue="lol"
            name="theme"
            onChange={handleChangeTheme}
          >
            <FormControlLabel value="lol" control={<Radio />} label="LoL" />
            <FormControlLabel disabled value="potter" control={<Radio />} label="Harry Potter" />
          </RadioGroup>
        </FormControl>

        <Divider variant='middle' className={classes.divider} />

        {/* choose game */}
        <FormControl className={classes.formControl}>
          <FormLabel className={classes.formTitle}>Jeux</FormLabel>
          <RadioGroup
            defaultValue="0"
            name="game"
            onChange={handleChangeMode}
          >
            <FormControlLabel value="0" control={<Radio />} label="Memory : Niveau 1" />
            <FormControlLabel value="1" control={<Radio />} label="Memory : Niveau 2" />
            <FormControlLabel disabled value="2" control={<Radio />} label="Memory : Niveau 3" />
            <FormControlLabel disabled value="4" control={<Radio />} label="Pendu" />
          </RadioGroup>
        </FormControl>
      </Drawer>
    </>
  )
}

export default MyAppBar;