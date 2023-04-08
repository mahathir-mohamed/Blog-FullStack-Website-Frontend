import Rect,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillPlusSquareFill,BsFillBookmarkHeartFill,BsPencilSquare} from "react-icons/bs";
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineLogout,AiTwotoneHeart,AiFillEdit,AiFillSetting} from "react-icons/ai";
import axios from 'axios';


function Header() {
  const[Author,setAuthor]=useState();
  const[img,setimg]=useState();
  function ClearToken(){
     Cookies.remove('Token');
     window.location.reload();
  }
  const user = Cookies.get('user_id');
  useEffect(()=>{
    if(user){
       setAuthor(user.replace(/"|'/g, ''))
       ProfilePicture();  
    } 
  },[Author,img]) 
  async function ProfilePicture(){
    await axios.get(`http://192.168.1.12:8000/auth/FindUser/${Author}`).then(
            (res)=>{
              // console.log(res.data);
              setimg(res.data.result.Image[0].url)
            }
            ).catch((err)=>console.log(err))
  }
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container className="d-flex">
        <div>
        <Navbar.Brand href="#home" className="text-primary"><img src={process.env.PUBLIC_URL+"logo.png"} style={{borderRadius:50}} width={140}/></Navbar.Brand>
        </div>
        <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
                 <input style={{width:"100%"}} type="button" value="Trending Blogs" className="btn btn-primary"/>
            </Nav.Link>
            <Nav.Link href="/Create-Post">
                <div  className="d-flex justify-content-around align-items-center btn btn-outline-info" style={{width:120}}>
                    <div>
                        <BsFillPlusSquareFill size={20}  className="text-dark"/>
                    </div>
                    <div className="text-dark align-items-center">
                        Add post
                    </div>
                </div>    
            </Nav.Link>
            <Nav.Link href="#home">
  <Dropdown>
      <Dropdown.Toggle style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"110%",marginRight:10}} variant="" id="dropdown-basic">
          <img src={img} width="30" height="30" style={{borderRadius:50}}/>
          Profile 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
          <div style={{display:"flex",justifyContent:"space-evenly",width:"67%"}}>
            <BsPencilSquare size={25} />
            My Blogs
          </div>
          </Dropdown.Item>
           <Dropdown.Item href="#/action-2">
          <div style={{display:"flex",justifyContent:"space-evenly",width:"78%"}}>
            <AiFillSetting size={25} />
            Edit Profile
          </div>
        </Dropdown.Item>
         <Dropdown.Item href="/favourite-post">
          <div style={{display:"flex",justifyContent:"space-evenly"}}>
            <BsFillBookmarkHeartFill size={25} color="red"/>
            Favourite Blogs
          </div>
        </Dropdown.Item>
          <Dropdown.Divider />
         <Dropdown.Item onClick={()=>{ClearToken()}} style={{color:"red"}} eventKey="4">
          <div style={{display:"flex",justifyContent:"space-evenly",width:"65%"}}>
            <AiOutlineLogout size={25}/>
            logout
          </div>
        </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown> 
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
    </div>
  );
}

export default Header;