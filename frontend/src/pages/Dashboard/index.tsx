import { Grid, Container, CssBaseline, Modal, Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MenuLateral from "../../components/MenuLateral";
import NavBarDashboard from "../../components/NavBarDashboard";
import SectionTitle from "../../components/SectionTitle";
import InfoCard from "../../components/InfoCard";
import "./style.css";
import { useStyles } from "./styles";
import { User } from "../../types/user";
import { SportEvent, Subscription } from "../../types/event";
import gateway from "../../services/gateway";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: 600,
  overflow: "scroll",
};

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User>();
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [event, setEvent] = useState<SportEvent>({
      id: -1,
      bannerUrl: "",
      titulo: "",
      descricao: "",
      dataSaida: "",
      dataRetorno: "",
      localConcentracao: "",
      destino: "",
      qtdVagas: 0,
      ritmo: "",
      tipoEvento: "",
      infoComplementar: "",
      valor: 0,
  });
  const [subscription, setSubcription] = useState<Subscription>({
    id: -1,
    ciclista: "",
    dataPagamento: "",
    estaCancelada: false,
    estaConfirmada: false,
    eventoId: -1,
    tipoPagamento: "",
    termoUrl: "",
  });
  const [subscriptions, setSubcriptions] = useState<Subscription[]>([]);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    gateway.get("/usuarios/search/byToken").then( res => {
      setUser(res.data);
    });

    gateway.get("/eventos/inscricoes/byEmail?email="+user?.email).then( res => {
      setSubcriptions(res.data)
    });

    gateway.get("/eventos").then( res => {
      setEvents(res.data)
    });
  }, [subscriptions, user?.email]);

  function handleSeeDatails(e: any, idEvento: number | undefined, idInscricao: number | undefined) {
    e.preventDefault();

    if (idEvento !== undefined && idInscricao !== undefined) {
      let eventAux = events.find(eve => eve.id === idEvento);
      let subscriptionAux = subscriptions.find(subs => subs.id === idInscricao);
      
      if (eventAux !== undefined && subscriptionAux !== undefined) {
        setEvent(eventAux);
        setSubcription(subscriptionAux);
        handleOpen();
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MenuLateral />
      <Grid container direction="column">
        <Grid item>
          <NavBarDashboard />
        </Grid>
        <Grid item>
          <Container maxWidth="lg" className={classes.content}>
            <section className="events_section">
              <div className="container">
                <div className="row">
                  <SectionTitle text="Minhas inscrições" />

                  <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-inscricao"
                    aria-describedby="modal-modal-inscricao"
                  >
                    <Box sx={style}>
                      <section className="event_section">
                          <img src={"/img/event_imgs/event1.png"} alt="Banner do evento" className="event_banner"/>
                          <div className="container">
                              <div className="row">
                                  <div className="col-md-12">
                                      <SectionTitle text="Minha inscrição"/>
                                      <div className="event_payments">
                                          Pagamento: {subscription?.tipoPagamento} <br/>
                                          Data de Pagamento: {subscription?.dataPagamento} <br/>
                                          Status da Inscrição: {subscription?.estaConfirmada ? "Confirmada" : "Pendente"} <br/>
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <SectionTitle text={event?.titulo || ""}/>
                                      <div className="event_description">
                                          {event?.descricao}
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <SectionTitle text="Datas"/>
                                      <div className="event_dates">
                                          <p>Saída: {event?.dataSaida}</p>
                                          <p>Retorno: {event?.dataRetorno}</p>
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <SectionTitle text="Locais"/>
                                      <div className="event_locals">
                                          <p>Destino: {event?.destino}</p>
                                          <p>Local de Concentração: {event?.localConcentracao}</p>
                                      </div>
                                  </div>
                                  <div className="col-md-4">
                                      <SectionTitle text="Ritmo e Tipo"/>
                                      <div className="event_dates">
                                          <p>Ritmo: {event?.ritmo}</p>
                                          <p>Tipo: {event?.tipoEvento}</p>
                                      </div>
                                  </div>
                                  <div className="col-md-12 event_infos_container">
                                      <SectionTitle text="Informações Complementares"/>
                                      <div className="event_infos">
                                          {event?.infoComplementar}
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <SectionTitle text="Patrocinadores"/>
                                      <img src={"/img/partner_imgs/partner1.png"} alt="Lojas Parceiras" className="event_partners"/>
                                  </div>
                              </div>
                          </div>
                      </section>

                      <Button
                        onClick={handleClose}
                        style={{ float: "right", marginRight: "1rem" }}
                        className="buttonStyle"
                      >
                        Fechar
                      </Button>
                    </Box>
                  </Modal>

                  {subscriptions.map((subscription) => {
                    let event = events.find(event => event.id === subscription.eventoId)
                    
                    if (event !== undefined)
                      return (
                        <InfoCard
                          //key={event.id}
                          click={ (e: any) => {
                            if (event !== undefined)
                              handleSeeDatails(e, event.id, subscription.id);
                          }}
                          url={"/event/" + event.id}
                          title={event.titulo}
                          description={event.descricao}
                          img_url={"/event_imgs/event1.png"}
                        />
                      )
                    else
                        return "";

                  })}

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
