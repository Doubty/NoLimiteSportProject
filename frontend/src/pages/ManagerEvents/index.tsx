import {
  Grid,
  Container,
  Typography,
  CssBaseline,
  Fab,
} from "@material-ui/core";
import React, { ChangeEvent, useState, useEffect } from "react";
import MenuLateral from "../../components/MenuLateral";
import NavBarDashboard from "../../components/NavBarDashboard";
import SectionTitle from "../../components/SectionTitle";
import { mockEvents } from "../../mockData";
import "./style.css";
import { useStyles } from "./styles";
import { DataGrid, GridApi, GridCellValue, GridColDef } from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Add from "@material-ui/icons/Add";
import Swal from "sweetalert2";
import { SportEvent, Subscription } from "../../types/event";
import gateway from "../../services/gateway";
import { formatLocalDate } from "../../utils/format";
import { getListEvents } from "../../services/gateway";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from '@material-ui/icons/Check';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const columnsSubscriptions: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "ciclista", headerName: "Ciclista", width: 200 },
    { field: "dataPagamento", headerName: "Data do Pagamento", width: 200 },
    { field: "tipoPagamento", headerName: "Tipo de Pagamento", width: 200 },
    { field: "estaConfirmada", headerName: "Confirmada", width: 160 },
    {
      field: "action",
      headerName: "Ações",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const confirmSubscription = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          gateway.post("/eventos/inscricoes/validateById?id=" + params.id).then( (res) => {
            gateway
            .get(`/eventos/inscricoesById?id=${params.id}`)
            .then((res) => {
              setListSubscribers(res.data);
            });
          });
        };

        return (
          <>
          {
            listSubscribers.find(subs => subs.id === params.id)?.estaConfirmada ?
            "Confirmada"
            :
            <Button onClick={confirmSubscription}>
              Confirmar
              <CheckIcon style={{marginLeft: 10}} />
            </Button>
          }
          </>
        );
      },
    },
  ];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
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
    {
      field: "action",
      headerName: "Ações",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const edit = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          setIsEditing(true);

          gateway.get("/eventos/search/byId?id=" + params.id).then((res) => {
            if (res.data !== undefined) {
              let eventToBeEdited: SportEvent = res.data;
              /*eventToBeEdited = {
                ...eventToBeEdited,
                dataSaida: formatLocalDate(eventToBeEdited.dataSaida, "yyyy-MM-dd"),
                dataRetorno: formatLocalDate(eventToBeEdited.dataRetorno, "yyyy-MM-dd"),
              }*/
              setEventSport(eventToBeEdited);
              setOpen(true);
            }
          });
        };

        const remove = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          setIsEditing(true);
          Swal.fire({
            title: "Você quer mesmo realizar a deleção?",
            showDenyButton: true,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              await gateway
                .delete("/eventos/" + params.id)
                .then((res) => {
                  if (res.status >= 200 && res.status < 300) {
                    Swal.fire("Operação realizada com sucesso", "", "success");
                    gateway.get("/eventos/todos").then((res) => {
                      setListEvents(res.data);
                      setRowEvents(res.data);
                    });
                  } else Swal.fire("Erro ao deletar evento", "", "error");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else if (result.isDenied) {
              Swal.fire("Operação cancelada com sucesso", "", "error");
            }
          });
        };

        const seeSubscriptions = async (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          await gateway
            .get(`/eventos/inscricoesById?id=${params.id}`)
            .then((res) => {
              setListSubscribers(res.data);
            });
          setOpen2(true);
        };

        return (
          <>
            <Button onClick={edit}>
              <EditIcon />
            </Button>
            <Button onClick={remove}>
              <DeleteIcon />
            </Button>
            <Button variant="contained" onClick={seeSubscriptions}>
              Ver Inscrições
            </Button>
          </>
        );
      },
    },
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEventSport({
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
  };

  const [listEvents, setListEvents] = useState([]);
  const [listSubscribers, setListSubscribers] = useState<Subscription[]>([]);
  const [rowEvents, setRowEvents] = useState(rows);
  const [inputSearch, setInputSearch] = useState("");

  const [eventSport, setEventSport] = useState<SportEvent>({
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventSport({ ...eventSport, [event.target.name]: event.target.value });
  };

  const handleDataInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEventSport({
      ...eventSport,
      [event.target.name]: formatLocalDate(event.target.value, "dd/MM/yyyy"),
    });
  };

  useEffect(() => {
    getListEvents().then((res) => {
      setListEvents(res.data);
      setRowEvents(res.data);
    });
  }, []);

  function searchEvent() {
    if (inputSearch === "" || inputSearch === " ") {
      getListEvents().then((res) => setListEvents(res.data));
      setRowEvents(listEvents);
      console.log("retornando normal");
    } else {
      let filtSearch = listEvents.filter((item: any) =>
        item.titulo.match(inputSearch)
      );
      setRowEvents(filtSearch);
      console.log(`retornado para ${inputSearch}`);
    }
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
        await gateway
          .post("/eventos", eventSport)
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              Swal.fire("Operação realizada com sucesso", "", "success");
              getListEvents().then((res) => {
                setListEvents(res.data);
                setRowEvents(res.data);
              });
            } else Swal.fire("Erro ao cadastrar evento", "", "info");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (result.isDenied) {
        Swal.fire("Operação cancelada com sucesso", "", "info");
      }
    });
  }

  function update() {
    handleClose();
    Swal.fire({
      title: "Você quer mesmo realizar a edição?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await gateway
          .post("/eventos", eventSport)
          .then((res) => {
            if (res.status >= 200 && res.status < 300) {
              setIsEditing(false);
              Swal.fire("Operação realizada com sucesso", "", "success");
              gateway.get("/eventos/todos").then((res) => {
                setListEvents(res.data);
                setRowEvents(res.data);
              });
              setEventSport({
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
            } else Swal.fire("Erro ao editar produto", "", "info");
          })
          .catch((err) => {
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
                    onChange={(e) => {
                      searchEvent();
                      setInputSearch(e.target.value);
                    }}
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
                    open={open2}
                    onClose={() => setOpen2(false)}
                    aria-labelledby="modal-inscricao"
                    aria-describedby="modal-modal-inscricao"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Lista de inscrições realizadas
                      </Typography>

                      <Typography id="modal-modal-inscricao">
                        Abaixo seguem as inscrições feitas para esse evento
                      </Typography>
                      <br />
                      <div style={{ height: 400, width: "100%" }}>
                        <DataGrid
                          rows={listSubscribers}
                          columns={columnsSubscriptions}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                        />
                      </div>
                      <Button
                        onClick={() => setOpen2(false)}
                        style={{ float: "right", marginRight: "1rem" }}
                        className="buttonStyle"
                      >
                        fechar
                      </Button>
                    </Box>
                  </Modal>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {!isEditing ? (
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Adicionar novo produto
                        </Typography>
                      ) : (
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Editar produto
                        </Typography>
                      )}
                      <Typography id="modal-modal-description">
                        Preencha as infomrações abaixo
                      </Typography>

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Título"
                        name="titulo"
                        variant="outlined"
                        onChange={handleChange}
                        value={eventSport.titulo}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Descrição"
                        name="descricao"
                        variant="outlined"
                        onChange={handleChange}
                        value={eventSport.descricao}
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
                        value={eventSport.localConcentracao}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Destino"
                        name="destino"
                        variant="outlined"
                        onChange={handleChange}
                        value={eventSport.destino}
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
                        value={eventSport.qtdVagas}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Ritmo"
                        name="ritmo"
                        variant="outlined"
                        onChange={handleChange}
                        value={eventSport.ritmo}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Tipo de Evento"
                        name="tipoEvento"
                        variant="outlined"
                        onChange={handleChange}
                        value={eventSport.tipoEvento}
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
                        value={eventSport.infoComplementar}
                      />
                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        type="number"
                        label="Valor da Inscrição"
                        variant="outlined"
                        name="valor"
                        onChange={handleChange}
                        value={eventSport.valor}
                      />

                      <Button
                        onClick={register}
                        className="buttonStyle"
                        style={
                          isEditing
                            ? { float: "right", display: "none" }
                            : { float: "right", display: "block" }
                        }
                      >
                        Cadastrar
                      </Button>
                      <Button
                        onClick={update}
                        style={
                          isEditing
                            ? { float: "right", display: "block" }
                            : { float: "right", display: "none" }
                        }
                        className="buttonStyle"
                      >
                        Atualizar
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
                      rows={rowEvents}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
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
