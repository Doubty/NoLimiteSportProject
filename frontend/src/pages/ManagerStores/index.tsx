import { Grid, Container, Typography, CssBaseline, Fab, ListItem, ListItemText } from "@material-ui/core";
import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import MenuLateral from "../../components/MenuLateral";
import NavBarDashboard from "../../components/NavBarDashboard";
import SectionTitle from "../../components/SectionTitle";
import "./style.css";
import { useStyles } from "./styles";     
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Add from "@material-ui/icons/Add";
import AddIcon from '@material-ui/icons/Add';
import Swal from "sweetalert2";
import { Address, Partner, SocialMidia } from "../../types/partner";
import gateway from "../../services/gateway";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "nome", headerName: "Loja", width: 200 },
  { field: "email", headerName: "E-mail", width: 200 },
  { field: "telefone", headerName: "Telefone", width: 200 },
];

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

const ManagerStores: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); setSocialMidias([])};

  const [socialMidia, setSocialMidia] = useState<SocialMidia>({
    nome: "",
    link: ""
  });
  const [socialMidias, setSocialMidias] = useState<SocialMidia[]>([]);

  const [address, setAddress] = useState<Address>({
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: ""
  });

  const [partner, setPartner] = useState<Partner>({
    nome: "",
    email: "",
    telefone: "",
    endereco: address,
    redeSocialList: socialMidias
  });

  const [rows, setRows] = useState<Partner[]>([]);

  useEffect(() => {
    gateway.get("/lojaParceiras/todos").then( res => {
      const getRes : Partner [] = res.data;
      setRows(getRes);
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPartner({...partner, [event.target.name] : event.target.value});
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAddress({...address, [event.target.name] : event.target.value});
      setPartner({...partner, endereco: address});
  }

  const handleChangeSocialMidia = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSocialMidia({...socialMidia, [event.target.name] : event.target.value});
  }

  const handleChangeSocialMidias = (event: any) => {
    let midias = socialMidias;
    midias.push(socialMidia);
    setSocialMidias(midias);
    setPartner({...partner, redeSocialList: socialMidias});  
    setSocialMidia({
      nome: "",
      link: ""
    })
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
        await gateway.post('/lojaParceiras/todos', partner).then( res => {
          if (res.status >= 200 && res.status < 300) {
              Swal.fire("Operação realizada com sucesso", "", "success");
              gateway.get("/lojaParceiras/todos").then( res => {
                const getRes : Partner [] = res.data;
                setRows(getRes);
              });
          }
          else
            Swal.fire("Erro ao cadastrar grupo", "", "info");
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
                  <SectionTitle text="Gerenciar Lojas" />

                  <TextField
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    id="outlined-basic"
                    label="Pesquisar Lojas"
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
                    Novo Parceiro <Add style={{ marginLeft: "0.2rem" }} />
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
                        Adicionar novo parceiro
                      </Typography>
                      <Typography id="modal-modal-description">
                        Preencha as infomrações abaixo
                      </Typography>

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Nome"
                        name="nome"
                        variant="outlined"
                        onChange={handleChange}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="E-mail"
                        name="email"
                        variant="outlined"
                        onChange={handleChange}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Telefone"
                        name="telefone"
                        variant="outlined"
                        onChange={handleChange}
                      />

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Endereço
                      </Typography>

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Rua"
                        name="rua"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Número"
                        name="numero"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Bairro"
                        name="bairro"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Complemento"
                        name="complemento"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Cidade"
                        name="cidade"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Estado"
                        name="estado"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="CEP"
                        name="cep"
                        variant="outlined"
                        onChange={handleChangeAddress}
                      />

                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Redes Sociais
                      </Typography>

                      <div style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
                        <TextField
                          fullWidth
                          style={{ marginTop: "1rem", marginBottom: "1rem" }}
                          id="outlined-basic"
                          label="Nome da Rede"
                          name="nome"
                          variant="outlined"
                          onChange={handleChangeSocialMidia}
                          value={socialMidia.nome}
                        />

                        <TextField
                          fullWidth
                          style={{ marginTop: "1rem", marginBottom: "1rem", marginLeft: "10px" }}
                          id="outlined-basic"
                          label="Link"
                          name="link"
                          variant="outlined"
                          onChange={handleChangeSocialMidia}
                          value={socialMidia.link}
                        />

                        <Fab color="primary" aria-label="add" style={{marginLeft: "15px", padding: "25px", marginTop: "-5px"}} onClick={handleChangeSocialMidias}>
                          <AddIcon />
                        </Fab>
                      </div>

                      <ListItem style={{display: "flex", flexDirection: "column", marginBottom: "20px"}}>
                        {
                          socialMidias.map((midia, index) =>
                            <ListItemText
                              key={index}
                              primary={midia.nome + " - " + midia.link}
                            />
                          )
                        }
                      </ListItem>

                      <Button
                        onClick={register}
                        style={{ float: "right" }}
                        className="buttonStyle"
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

export default ManagerStores;
