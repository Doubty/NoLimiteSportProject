import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { AppBar, Toolbar, Typography, Avatar } from "@material-ui/core";
import NavBarTopDashboard from "../NavBarTopDashboard";

import { useStyles } from "./styles";
import gateway from "../../services/gateway";

interface User {
  id: number;
  nome: string;
}

const NavBarDashboard: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    let user : User;
    gateway.get("/usuarios/search/byToken").then( res => {
      user = res.data;
      console.log(user.nome);
      setName(user.nome);
    });
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
