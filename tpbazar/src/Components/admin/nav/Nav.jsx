import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../App.css';
import './navbar.css';

function Nav() {
  return (
    <div>
      <div className="position1">
        <Navbar style={{ backgroundColor: '#8884d8' }}>
          <Container>
            <Navbar.Brand>
              <img
                src="logo.png"
                width="90"
                height="30"
                className="d-inline-block align-top"
                alt="ecomlogo"
              />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item style={{ color: '#8884d8' }} href="#">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item style={{ color: '#8884d8' }} href="#">
                  Edit
                </NavDropdown.Item>
                <NavDropdown.Item style={{ color: '#1d2634' }} href="#">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Nav;



// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '../../../App.css';
// import './navbar.css';

// function Nav() {
//   return (
//     <div >

//       <div  className="position1">

//       <Navbar style={{ backgroundColor: '#44494F' }}  >
//         <Container >
//           <Navbar.Brand>
//             <img
//               src="home.png"
//               width="45"
//               height="30"
//               className="d-inline-block align-top"
//               alt="ecomlogo"
//             />
//           </Navbar.Brand>
//           <Navbar.Collapse className="justify-content-end">
//             <NavDropdown title="Admin" id="basic-nav-dropdown" style={{ color: 'white' }}>
//               <NavDropdown.Item href="#"> Profile</NavDropdown.Item>
//               <NavDropdown.Item href="#"> Edit</NavDropdown.Item>
//               <NavDropdown.Item href="#">Logout</NavDropdown.Item>
//             </NavDropdown>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>


//       </div>
     
//     </div>
//   );
// }

// export default Nav;


