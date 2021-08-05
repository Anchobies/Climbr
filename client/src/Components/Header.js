import { NavLink, useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"

const Header = ({ onLogin }) => {
   const history = useHistory();

   const handleSignOut = () => {
      fetch("/signout", {
         method: "DELETE"
      })
         .then(response => {
            if (response.ok) {
               onLogin(null);
            }
         }
      );
   };

   return (
          <div className="header">
             <h1 onClick={() => history.push("/")} style={{cursor:'pointer'}}>HiveFive</h1>
             <br />
             <ul className="header-ul">
                <li>
                   <NavLink to="/" style={{ textDecoration: 'none' }}>
                      <Button type="submit" color="primary" variant="contained">
                         Feed{" "}
                      </Button>
                   </NavLink>
                </li>
                <li>
                   <NavLink to="/create" style={{ textDecoration: 'none' }}>
                      <Button type="submit" color="primary" variant="contained">
                         Create a Hive{" "}
                      </Button>
                   </NavLink>
                </li>
                <li>
                   <NavLink to="/hives" style={{ textDecoration: 'none' }}>
                      <Button type="submit" color="primary" variant="contained">
                         My Hives{" "}
                      </Button>
                   </NavLink>
                </li>
                <li>
                   <NavLink to="/friends" style={{ textDecoration: 'none' }}>
                      <Button type="submit" color="primary" variant="contained">
                         My Friends{" "}
                      </Button>
                   </NavLink>
                </li>
                <li>
                     <Button onClick={handleSignOut} type="submit" color="primary" variant="contained">
                        Sign Out{" "}
                     </Button>
                </li>
             </ul>
          </div>
   )
}

export default Header;
