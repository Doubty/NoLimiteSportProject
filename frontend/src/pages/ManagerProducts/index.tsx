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
import { Product } from "../../types/product";
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

const ManagerProducts: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "nome", headerName: "Nome do Produto", width: 200 },
    { field: "preco", headerName: "Preço", width: 200 },
    {
      field: "action",
      headerName: "Ações",
      width: 300,
      sortable: false,
      renderCell: (params) => {
        const edit = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          setIsEditing(true);
          let productToBeEdited = rows.find(product => product.id === params.id);
          if (productToBeEdited !== undefined) {
            setProduct(productToBeEdited);
            setOpen(true);
          }
        };
  
        const remove = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking
          
          setIsEditing(true);
          let productToBeEdited = rows.find(product => product.id === params.id);
          
          if (productToBeEdited !== undefined) {
            setProduct(productToBeEdited);
            Swal.fire({
              title: "Você quer mesmo realizar a deleção?",
              showDenyButton: true,
              confirmButtonText: "Confirmar",
              denyButtonText: `Cancelar`,
            }).then(async (result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                await gateway.delete('/produtoes/'+product.id).then( res => {
                  if (res.status >= 200 && res.status < 300) {
                      Swal.fire("Operação realizada com sucesso", "", "success");
                      gateway.get("/produtoes/todos").then( res => {
                        const getRes : Product [] = res.data;
                        setRows(getRes);
                      });
                  }
                  else
                    Swal.fire("Erro ao deletar produto", "", "error");
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

  const [product, setProduct] = useState<Product>({
    id: -1,
    nome: "",
    descricao: "",
    preco: 0,
  });

  const[rows, setRows] = useState<Product[]>([]);

  useEffect(() => {
    gateway.get("/produtoes/todos").then( res => {
      const getRes : Product [] = res.data;
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
        await gateway.post('/produtoes', product).then( res => {
          if (res.status >= 200 && res.status < 300) {
              Swal.fire("Operação realizada com sucesso", "", "success");
              gateway.get("/produtoes/todos").then( res => {
                const getRes : Product [] = res.data;
                setRows(getRes);
              });
          }
          else
            Swal.fire("Erro ao cadastrar produto", "", "error");
        }).catch ( err => {
            console.log(err);
        });
      } else if (result.isDenied) {
        Swal.fire("Operação cancelada com sucesso", "", "error");
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
        await gateway.post('/produtoes', product).then( res => {
          if (res.status >= 200 && res.status < 300) {
            setIsEditing(false);
            Swal.fire("Operação realizada com sucesso", "", "success");
            gateway.get("/produtoes/todos").then( res => {
              const getRes : Product [] = res.data;
              setRows(getRes);
            });
            setProduct({
              id: -1,
              nome: "",
              descricao: "",
              preco: 0,
            })
          }
          else
            Swal.fire("Erro ao editar produto", "", "info");
        }).catch ( err => {
            console.log(err);
        });
      } else if (result.isDenied) {
        Swal.fire("Operação cancelada com sucesso", "", "info");
      }
    });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({...product, [event.target.name] : event.target.value});
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
                  <SectionTitle text="Gerenciar Produtos" />

                  <TextField
                    style={{ marginTop: "1rem", marginBottom: "1rem" }}
                    id="outlined-basic"
                    label="Pesquisar Produtos"
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
                    Novo Produto <Add style={{ marginLeft: "0.2rem" }} />
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      {
                        (isEditing) ? 
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
                        label="Nome do Produto"
                        name="nome"
                        variant="outlined"
                        onChange={handleChange}
                        value={product.nome}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        multiline
                        label="Descrição"
                        name="descricao"
                        variant="outlined"
                        onChange={handleChange}
                        value={product.descricao}
                      />

                      <TextField
                        fullWidth
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                        id="outlined-basic"
                        type="number"
                        label="Preço"
                        variant="outlined"
                        name="preco"
                        onChange={handleChange}
                        value={product.preco}
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

export default ManagerProducts;
