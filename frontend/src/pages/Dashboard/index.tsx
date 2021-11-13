import { Grid, Container, CssBaseline } from "@material-ui/core";
import React from "react";
import MenuLateral from "../../components/MenuLateral";
import NavBarDashboard from "../../components/NavBarDashboard";
import SectionTitle from "../../components/SectionTitle";
import { mockEvents } from "../../mockData";
import InfoCard from "../../components/InfoCard";
import "./style.css";

import { useStyles } from "./styles";

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuLateral />
      <Grid container direction="column">
        <Grid item>
          <NavBarDashboard />
        </Grid>
        <Grid item>
          <Container maxWidth="md" className={classes.content}>
            <section className="events_section">
              <div className="container">
                <div className="row">
                  <SectionTitle text="Meu Perfil" />

                  {mockEvents.slice(0, 6).map((event) => (
                    <InfoCard
                      url={"/event/" + event.id}
                      title={event.titulo}
                      description={event.descricao}
                      img_url={"/event_imgs/" + event.bannerUrl}
                    />
                  ))}
                </div>
              </div>
            </section>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
