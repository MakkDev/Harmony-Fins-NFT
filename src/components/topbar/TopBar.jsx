import "./topbar.css";
import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export default function TopBar() {
    return <div className="top">
        <div className="topLeft">
        <img className="topImg"src="https://harmonyfins.com/config/images/logonew.png" />

        </div>
        <div className="topCenter"> 
            <ul className="topCenterList">
                <a className="topListItem">HOME</a>
                <a href="https://tofunft.com/collection/harmony-fins/items" target="_blank"  className="topListItem">MARKETPLACE</a>
                <a href="https://medium.com/@harmonyfins?p=9ce22cdf7694" target="_blank"  className="topListItem">ABOUT</a>
                <a href="https://twitter.com/FinsHarmony" target="_blank"  className="topListItem">CONTACT</a>
                
            </ul>
        </div>
        <div className="topRight"> 
            <img className="topRightImg" src="https://s2.coinmarketcap.com/static/img/coins/200x200/3945.png"/>Harmony
         </div>
    </div>

}

