import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, Box, Pagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useNavigate } from "react-router";
import { apiUrl } from "../config";

function ListadoClientes() {
  const [rows, setRows] = useState([]); // Todos los clientes
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [clientesPorPagina] = useState(5); // Número de clientes por página
  const navigate = useNavigate();

  // Obtener los clientes al cargar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + "/cliente", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setRows(data.datos); // Guardar todos los clientes
        } else {
          console.error("Error en la respuesta:", response.status);
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, []);

  // Manejar la eliminación de un cliente
  const handleDelete = async (idcliente) => {
    let response = await fetch(apiUrl + "/cliente/" + idcliente, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const clientesTrasBorrado = rows.filter(
        (cliente) => cliente.idcliente !== idcliente
      );
      setRows(clientesTrasBorrado);
    }
  };

  // Calcular los clientes que se mostrarán en la página actual
  const indiceUltimoCliente = paginaActual * clientesPorPagina;
  const indicePrimerCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesPaginaActual = rows.slice(indicePrimerCliente, indiceUltimoCliente);

  // Cambiar de página
  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de clientes
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="tabla de clientes">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell>NOMBRE</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>TELÉFONO</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientesPaginaActual.map((row) => (
                <TableRow
                  key={row.idcliente}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.idcliente}</TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.telefono}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.idcliente)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarcliente/" + row.idcliente)}
                    >
                      <EditNoteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Pagination
            count={Math.ceil(rows.length / clientesPorPagina)} // Número total de páginas
            page={paginaActual}
            onChange={handleChangePagina}
            color="primary"
          />
        </Stack>
      </Box>
    </>
  );
}

export default ListadoClientes;
