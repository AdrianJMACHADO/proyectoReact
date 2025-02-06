import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useState } from "react";
import logo from "../assets/images/Imdb_logo.webp";
import { Link } from "react-router";

function Menu() {
  const [openBasic, setOpenBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">
          <img src={logo} height="30" alt="" loading="lazy" />
          Cinemax
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} className="w-100">
          {/* Contenedor principal para el menú y los botones */}
          <MDBNavbarNav className="w-100 d-flex justify-content-between align-items-center">
            {/* Menú de la izquierda */}
            <div className="d-flex">
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Clientes
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altacliente" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de cliente</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoclientes" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de clientes</MDBDropdownItem>
                    </Link>
                    <Link to="/listadonombrecliente" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado por nombre</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Entradas
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <Link to="/altaentradas" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Alta de entradas</MDBDropdownItem>
                    </Link>
                    <Link to="/listadoentradas" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado de entradas</MDBDropdownItem>
                    </Link>
                    <Link to="/listadofechaentrada" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Listado por fecha</MDBDropdownItem>
                    </Link>
                    <Link to="/pedidomultiple" style={{ color: "#4f4f4f" }}>
                      <MDBDropdownItem link>Pedido múltiple</MDBDropdownItem>
                    </Link>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </div>

            {/* Botones alineados a la derecha */}
            {/* <div className="d-flex justify-content-end">
              <Link to="/signup">
                <MDBBtn size="sm" className="me-2">
                  SignUp
                </MDBBtn>
              </Link>
              <Link to="/login">
                <MDBBtn size="sm">Login</MDBBtn>
              </Link>
            </div> */}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
export default Menu;
