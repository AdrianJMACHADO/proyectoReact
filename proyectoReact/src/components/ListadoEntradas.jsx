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

function ListadoEntradas() {
  const [rows, setRows] = useState([]); // Todas las entradas
  const [clientesMap, setClientesMap] = useState({}); // Mapa de clientes
  const [paginaActual, setPaginaActual] = useState(1); // Página actual
  const [entradasPorPagina] = useState(5); // Número de entradas por página
  const navigate = useNavigate();

  // Obtener las entradas y clientes al cargar el componente
  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener entradas
        const entradasResponse = await fetch(apiUrl + "/entrada", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        // Obtener clientes
        const clientesResponse = await fetch(apiUrl + "/cliente", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (entradasResponse.ok && clientesResponse.ok) {
          const entradasData = await entradasResponse.json();
          const clientesData = await clientesResponse.json();

          // Crear un mapa de clientes para búsqueda rápida
          const clientesMapping = {};
          if (Array.isArray(clientesData.datos)) {
            clientesData.datos.forEach((cliente) => {
              clientesMapping[cliente.idcliente] = cliente;
            });
          } else {
            console.error("Los datos de clientes no son un array:", clientesData);
          }

          setClientesMap(clientesMapping);
          setRows(entradasData.datos); // Guardar todas las entradas
        } else {
          console.error("Error en las respuestas:", {
            entradas: entradasResponse.status,
            clientes: clientesResponse.status,
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    }

    fetchData();
  }, []);

  // Manejar la eliminación de una entrada
  const handleDelete = async (identrada) => {
    let response = await fetch(apiUrl + "/entrada/" + identrada, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const entradasTrasBorrado = rows.filter(
        (entrada) => entrada.identrada !== identrada
      );
      setRows(entradasTrasBorrado);
    }
  };

  // Formatear la fecha
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES");
  };

  // Formatear la hora
  const formatHora = (hora) => {
    return hora.substring(0, 5);
  };

  // Formatear el precio
  const formatPrecio = (precio) => {
    const precioNumerico =
      typeof precio === "string"
        ? parseFloat(precio.replace(",", ".").replace("€", "").trim())
        : precio;

    return !isNaN(precioNumerico)
      ? precioNumerico.toFixed(2) + " €"
      : "N/A";
  };

  // Obtener el nombre del cliente
  const getNombreCliente = (idcliente) => {
    return clientesMap[idcliente]?.nombre || "Cliente no encontrado";
  };

  // Calcular las entradas que se mostrarán en la página actual
  const indiceUltimaEntrada = paginaActual * entradasPorPagina;
  const indicePrimeraEntrada = indiceUltimaEntrada - entradasPorPagina;
  const entradasPaginaActual = rows.slice(indicePrimeraEntrada, indiceUltimaEntrada);

  // Cambiar de página
  const handleChangePagina = (event, value) => {
    setPaginaActual(value);
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2 }}>
        Listado de Entradas
      </Typography>

      <Box sx={{ mx: 4 }}>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table aria-label="tabla de entradas">
            <TableHead>
              <TableRow>
                <TableCell align="right">ID</TableCell>
                <TableCell>CLIENTE</TableCell>
                <TableCell>PELÍCULA</TableCell>
                <TableCell align="center">FECHA</TableCell>
                <TableCell align="center">HORA</TableCell>
                <TableCell align="right">PRECIO</TableCell>
                <TableCell align="center">ELIMINAR</TableCell>
                <TableCell align="center">EDITAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entradasPaginaActual.map((row) => (
                <TableRow
                  key={row.identrada}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.identrada}</TableCell>
                  <TableCell>{getNombreCliente(row.idcliente)}</TableCell>
                  <TableCell>{row.pelicula}</TableCell>
                  <TableCell align="center">{formatFecha(row.fecha)}</TableCell>
                  <TableCell align="center">{formatHora(row.hora)}</TableCell>
                  <TableCell align="right">{formatPrecio(row.precio)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleDelete(row.identrada)}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => navigate("/modificarentrada/" + row.identrada)}
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
            count={Math.ceil(rows.length / entradasPorPagina)} // Número total de páginas
            page={paginaActual}
            onChange={handleChangePagina}
            color="primary"
          />
        </Stack>
      </Box>
    </>
  );
}

export default ListadoEntradas;