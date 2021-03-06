import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import SearchBar from "./SearchBar";
import SimpleTabs from './SimpleTabs'
import React from 'react';
import ClimbrStatic from '../ClimbrBlue.png';

const style = {
   background: '#FE3B8B',
   borderRadius: 3,
   border: 0,
   color: 'white',
   height: 38,
   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

const Header = ({ onLogin, setToggle }) => {
   const history = useHistory();
   const [value, setValue] = React.useState(window.location.pathname);

   const handleSignOut = () => {
      fetch("/signout", {
         method: "DELETE"
      })
         .then(response => {
            if (response.ok) {
               onLogin(null);
               setToggle(true);
            }
         }
      );
   };

   return (
          <div className="header">
             <img onClick={() => history.push("/create")} style={{cursor:'pointer'}} src={ClimbrStatic} className="headerLogo" alt="logo"/>
             <SearchBar setValue={setValue}/>
             <SimpleTabs value={value === "/" || value === "/create" || value === "/climbs" || value === "/profile" ? value : "/"} setValue={setValue}/>
             <Button style={style} onClick={handleSignOut} type="submit" color="primary" variant="contained">
                        Sign Out{" "}
            </Button>
          </div>
   )
}

export default Header;
