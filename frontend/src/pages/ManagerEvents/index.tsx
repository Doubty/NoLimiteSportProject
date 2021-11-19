import { Grid, Container, Typography, CssBaseline } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import MenuLateral from "../../components/MenuLateral";
import NavBarDashboard from "../../components/NavBarDashboard";
import SectionTitle from "../../components/SectionTitle";
import { mockEvents } from "../../mockData";
import "./style.css";
import { useStyles } from "./styles";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Add from "@material-ui/icons/Add";
import Swal from "sweetalert2";
import { SportEvent } from "../../types/event";
import gateway from "../../services/gateway";
import { formatLocalDate } from "../../utils/format";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "titulo", headerName: "Título", width: 200 },
  { field: "dataSaida", headerName: "Data de Saída", width: 200 },
  { field: "dataRetorno", headerName: "Data de Retorno", width: 200 },
  { field: "destino", headerName: "Destino", width: 130 },
  {
    field: "qtdVagas",
    headerName: "Quantidade de Vagas",
    type: "number",
    width: 230,
  },
];

const rows = mockEvents;

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

const ManagerEvents: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [eventSport, setEventSport] = useState<SportEvent>({
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

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventSport({...eventSport, [event.target.name] : event.target.value});
  }

  const handleDataInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventSport({...eventSport, [event.target.name] : formatLocalDate(event.target.value, "dd/MM/yyyy")});
  }

  function register() {
    handleClose();
    Swal.fire({
      title: "Você quer mesmo realizar o cadastro?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await gateway.post('/eventos', eventSport).then( res => {
          if (res.status >= 200 && res.status < 300)
              Swal.fire("Operação realizada com sucesso", "", "success");
          else
            Swal.fire("Erro ao cadastrar evento", "", "info");
        }).catch ( err => {
            console.log(err);
        });
      } else if (result.isDenied) {
        Swal.fire("Operação cancelada com sucesso", "", "info");
      }
    });
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
          <Container maxWidth="md" className={classes.content}>
            <section className="events_section">
              <div className="container">
                <div className="row">
                  <SectionTitle text="Gerenciar Eventos" />

                  <TextField
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    id="outlined-basic"
                    label="Pesquisar eventos"
                    variant="outlined"
                  />

                  <Button
                    className="buttonStyle"
                    style={{
                      borderBottom: "none",
                      marginBottom: "1rem",
                    }}
                    onClick={handleOpen}
                  >
                    Novo Evento <Add style={{ marginLeft: "0.2rem" }} />
                  </Button>
                  
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Adicionar novo Evento
                      </Typography>
                      <Typography id="modal-modal-description">
                        Preencha as infomrações abaixo
                      </Typography>

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label= "Título"
                        name = "titulo"
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Descrição"
                        name = "descricao"
                        variant="outlined"
                        onChange={handleChange}
                      />

                      <TextField
                        id="date"
                        name="dataSaida"
                        label="Data de Saída"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleDataInputChange}
                      />

                      <TextField
                        id="date"
                        name="dataRetorno"
                        label="Data de Retorno"
                        type="date"
                        style={{ marginLeft: "30px" }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleDataInputChange}
                      />

                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Local de Concentração"
                        name="localConcentracao"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Destino"
                        name="destino"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        type="number"
                        name="qtdVagas"
                        label="Quantidade de Vagas"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Ritmo"
                        name="ritmo"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Tipo de Evento"
                        name="tipoEvento"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        multiline
                        label="Informações Complementares"
                        name="infoComplementar"
                        variant="outlined"
                        onChange={handleChange}
                      />
                       <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        type="number"
                        label="Valor da Inscrição"
                        variant="outlined"
                        name="valorInscricao"
                        onChange={handleChange}
                      />

                      <Button
                        style={{ float: "right" }}
                        className="buttonStyle"
                        onClick={register}
                      >
                        Cadastrar
                      </Button>
                      <Button
                        onClick={handleClose}
                        style={{ float: "right", marginRight: "1rem" }}
                        className="buttonStyle"
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </Modal>

                  <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                    />
                  </div>
                </div>
              </div>
            </section>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManagerEvents;
