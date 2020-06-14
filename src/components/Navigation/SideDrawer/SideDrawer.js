import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../HOC/Aux/Aux";

import "./SideDrawer.scss";

import burgerLogo from "../../../assets/images/burger-logo.png";

const SideDrawer = props => {
  const attachedClasses = props.open ? "SideDrawer Open" : "SideDrawer Close";

  return (
    <Aux>
      <Backdrop clicked={props.closed} show={props.open} />
      <div className={attachedClasses} onClick={props.closed}>
        <div className="Logo-container">
          <img className="burger-image" src={burgerLogo} alt="burger logo" />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
