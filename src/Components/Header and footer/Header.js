import Rect,{useEffect,useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BsFillPlusSquareFill,BsFillBookmarkHeartFill,BsPencilSquare} from "react-icons/bs";
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import { AiOutlineLogout,AiTwotoneHeart,AiFillEdit,AiFillSetting,AiFillPlusSquare} from "react-icons/ai";
import axios from 'axios';
import {baseUrl} from "../../config/BaseApi";



function Header() {
  const[Author,setAuthor]=useState();
  const[img,setimg]=useState();
  const [Id,setId]=useState();
  function ClearToken(){
     window.location.replace("/")
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
    await axios.get(`${baseUrl}/auth/FindUser/${Author}`).then(
            (res)=>{
              console.log(res.data);
              setId(res.data.result._id)
              setimg(res.data.result.Image[0].url)
            }
            ).catch((err)=>console.log(err))
  }
  return (
    <div>
    <Navbar bg="light" expand="lg">
      <Container className="d-flex">
        <div>
        <Navbar.Brand href="/" className="text-primary"><img src="https://res.cloudinary.com/doiff4svr/image/upload/v1681197573/Images/logo_up3wdp.png" style={{borderRadius:50}} width={140}/></Navbar.Brand>
        </div>
        <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">
                 <input style={{width:"100%"}} type="button" value="Trending Blogs" className="btn btn-primary"/>
            </Nav.Link>
            <Nav.Link href="#home">
  <Dropdown>
      <Dropdown.Toggle style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",marginRight:10}} variant="" id="dropdown-basic">
          <img src={img} width="30" height="30" style={{borderRadius:50}}/>
          Profile 
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="/My-Post">
          <div style={{display:"flex",justifyContent:"space-evenly",width:"66%"}}>
            <BsPencilSquare size={24} />
            My Blogs
          </div>
          </Dropdown.Item>
        <Dropdown.Item href="/create-post">
          <div style={{display:"flex",justifyContent:"space-evenly",width:"78%"}}>
            <AiFillPlusSquare size={25}/>
            Add Blogs
          </div>
          </Dropdown.Item>
           <Dropdown.Item href={`/Update-Profile/${Id}`}>
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