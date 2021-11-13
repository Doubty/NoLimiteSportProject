import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core";
import NavBarTopDashboard from "../NavBarTopDashboard";

import { useStyles } from "./styles";

interface User {
  id: number;
  name: string;
}

const NavBarDashboard: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    //const user: User = JSON.parse(localStorage.getItem('user') as string)
    setName("Galvão teste");
  }, []);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: false,
        })}
      >
        <Toolbar className={classes.toolbar}>
           <NavBarTopDashboard/>
           <div className={classes.userContainer}>
            <Typography className={classes.userName}>{name}</Typography>
            <Avatar className={classes.avatar}>{name?.charAt(0)}</Avatar>
           </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarDashboard;
