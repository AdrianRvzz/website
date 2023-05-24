import React, {useState, useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown'

import TheGymCoLogo from '../../images/logos/TheGymCoLogo.png'; // Importa la imagen del logotipo
import TheGymCoIcon from '../../images/icons/icongymco.png'; // Importa la imagen del logotipo
import HardBeat from '../../images/logos/HardBeat.png'; // Importa la imagen del logotipo

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import LoginUsuarioModal from './ModalLogin';
import RegistroUsuarioModal from './ModalRegistro';



import { UserContext } from '../../UserContext';
import { FaUserAlt } from "react-icons/fa";

import { getAuth, onAuthStateChanged } from 'firebase/auth';


function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  const { user, setUser } = useContext(UserContext);
  console.log(user)

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const openRegistroModal = () => {
    setShowRegistroModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const closeRegistroModal = () => {
    setShowRegistroModal(false);
  };

  const logout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut(); // Cierra la sesión en Firebase
      setUser(null); // Establece el usuario como nulo en el contexto
      
    } catch (error) {
      console.log('Error al cerrar sesión:', error);
      
    }
  };
  
  return (
    <>
    <Navbar
      className="shadow-sm"
      fixed="top"
      collapseOnSelect
      expand="lg"
      bg="black"
      variant="dark"
    >
      <Container className="text-uppercase ">
        <Navbar.Brand href="../home" className="d-flex flex-column">
          <Image
            src={TheGymCoLogo}
            alt="The Gym Co"
            height="50"
            className="d-inline-block align-top"
          />
          {/* <Image
        src={HardBeat}
         alt="HardBeat"
         height="50"
         className="d-inline-block align-top"
             /> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto me-auto">
            <Nav.Link href="/">Inicio</Nav.Link>
            <NavDropdown title="Galeria" id="collasible-nav-dropdown">
              <NavDropdown.Item
                href="/galeria/riogrande "
                className="btn-clicked"
              >
                Río Grande
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/galeria/lastorres"
                className="btn-clicked"
              >
                Las Torres
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/galeria/hardbeat "
                className="btn-clicked"
              >
                Hard Beat
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="../beat">Beat</Nav.Link>

            <NavDropdown title="Clases y horarios" id="collasible-nav-dropdown">
              <NavDropdown.Item href="../clases" className="btn-clicked">
                Clases
              </NavDropdown.Item>

              <Dropdown.Menu show>
                <Dropdown.Header>Horarios</Dropdown.Header>
                <Dropdown.Item
                  href="/sucursal/riogrande"
                  className="btn-clicked"
                  eventKey="1"
                >
                  Río Grande
                </Dropdown.Item>
                <Dropdown.Item
                  href="/sucursal/lastorres"
                  className="btn-clicked"
                  eventKey="2"
                >
                  Las Torres
                </Dropdown.Item>
                <Dropdown.Item
                  href="/sucursal/hardbeat"
                  className="btn-clicked"
                  eventKey="3"
                >
                  Hard Beat
                </Dropdown.Item>
              </Dropdown.Menu>
            </NavDropdown>

            <Nav.Link href="../servicios">Servicios</Nav.Link>
          </Nav>

          <Nav>
         
        <Dropdown align="end">
    <Dropdown.Toggle variant="dark btn-clicked-link" id="user-dropdown">
      <FaUserAlt className='text-white fs-5'/>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {user ? (
        <>
          <Dropdown.Item disabled> {user.email}</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="../usuario" className="btn-clicked">Información</Dropdown.Item>
          <Dropdown.Item onClick={logout} className="btn-clicked">Cerrar sesión</Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item className="btn-clicked" onClick={openLoginModal}>Iniciar sesión</Dropdown.Item>
          <Dropdown.Item className="btn-clicked" onClick={openRegistroModal}>Registrarse</Dropdown.Item>
        </>
      )}
    </Dropdown.Menu>
  </Dropdown>
            
            
          </Nav>
        </Navbar.Collapse>
        
      </Container>
      

    </Navbar>
    <LoginUsuarioModal showModal={showLoginModal} closeModal={closeLoginModal} />
      <RegistroUsuarioModal showModal={showRegistroModal} closeModal={closeRegistroModal} />
    </>
    
  );
}

export default NavBar;