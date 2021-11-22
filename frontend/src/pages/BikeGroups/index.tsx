import { Grid, Container, Typography, CssBaseline } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { PedalGroup } from "../../types/pedalGroup";
import gateway from "../../services/gateway";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
};

const BikeGroups: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "nome", headerName: "Name", width: 200 },
    {
      field: "action",
      headerName: "Ações",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const edit = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          setIsEditing(true);
          let groupToBeEdited = rows.find(group => group.id === params.id);
          if (groupToBeEdited !== undefined) {
            setGroup(groupToBeEdited);
            setOpen(true);
          }
        };
  
        const remove = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          
          setIsEditing(true);
          let groupToBeEdited = rows.find(group => group.id === params.id);

          if (groupToBeEdited !== undefined) {
            setGroup(groupToBeEdited);
            Swal.fire({
              title: "Você quer mesmo realizar a deleção?",
              showDenyButton: true,
              confirmButtonText: "Confirmar",
              denyButtonText: `Cancelar`,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                await gateway.delete('/grupoPedals/'+group.id).then( res => {
                  if (res.status >= 200 && res.status < 300) {
                      Swal.fire("Operação realizada com sucesso", "", "success");
                      gateway.get("/grupoPedals/todos").then( res => {
                        const getRes : PedalGroup [] = res.data;
                        setRows(getRes);
                      });
                  }
                  else
                    Swal.fire("Erro ao deletar o grupo", "", "error");
                }).catch ( err => {
                    console.log(err);
                });
              } else if (result.isDenied) {
                Swal.fire("Operação cancelada com sucesso", "", "error");
              }
            });
          }
        };
  
        return (
          <>
          <Button onClick={edit}>
            <EditIcon />
          </Button>
          <Button onClick={remove}>
            <DeleteIcon />
          </Button>
          </>
        );
      }
    },
  ];

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [group, setGroup] = useState<PedalGroup>({
    id: -1,
    nome: "",
  });

  const[rows, setRows] = useState<PedalGroup[]>([]);

  useEffect(() => {
    gateway.get("/grupoPedals/todos").then( res => {
      const getRes : PedalGroup[] = res.data;
      setRows(getRes);
    });
  }, []);

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
        await gateway.post('/grupoPedals', group).then( res => {
          if (res.status >= 200 && res.status < 300) {
              Swal.fire("Operação realizada com sucesso", "", "success");
              gateway.get("/grupoPedals/todos").then( res => {
                const getRes : PedalGroup[] = res.data;
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
        await gateway.post('/grupoPedals', group).then( res => {
          if (res.status >= 200 && res.status < 300) {
            setIsEditing(false);
            Swal.fire("Operação realizada com sucesso", "", "success");
            gateway.get("/grupoPedals/todos").then( res => {
              const getRes : PedalGroup [] = res.data;
              setRows(getRes);
            });
            setGroup({
              id: -1,
              nome: "",
            })
          }
          else
            Swal.fire("Erro ao editar o grupo", "", "info");
        }).catch ( err => {
            console.log(err);
        });
      } else if (result.isDenied) {
        Swal.fire("Operação cancelada com sucesso", "", "info");
      }
    });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setGroup({...group, [event.target.name] : event.target.value});
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
                  <SectionTitle text="Gerenciar Grupos de Pedal" />

                  <TextField
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    id="outlined-basic"
                    label="Pesquisar Grupos de Pedal"
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
                    Novo Grupo <Add style={{ marginLeft: "0.2rem" }} />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {
                        (!isEditing) ? 
                          <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Adicionar novo produto
                        </Typography>
                        :
                        <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        >
                          Editar produto
                        </Typography>
                      }
                      <Typography id="modal-modal-description">
                        Preencha as infomrações abaixo
                      </Typography>

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        label="Nome do grupo"
                        variant="outlined"
                        name="nome"
                        value={group.nome}
                        onChange={handleChange}
                      />

                      <Button
                        onClick={register}
                        className="buttonStyle"
                        style={ (isEditing) ? { float: "right", display: "none" } : { float: "right", display: "block" }}
                      >
                        Cadastrar
                      </Button>
                      <Button
                        onClick={update}
                        style={ (isEditing) ? { float: "right", display: "block" } : { float: "right", display: "none" }}
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

export default BikeGroups;
