import React from "react";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";

const Footer = () => {
  return (
    <footer className="Footer">
      <div>
        <ul>
          <li>Lorem</li>
          <li>ipsum</li>
          <li>dolor</li>
          <li>sit amet</li>
        </ul>
        <ul>
          <li>consectetur</li>
          <li>adipisicing</li>
          <li>Consequuntur</li>
          <li>voluptatum</li>
        </ul>
        <div>
          <img src={instagram} alt="instagram" />
          <img src={twitter} alt="twitter" />
          <img src={facebook} alt="facebook" />
        </div>
      </div>
      <p>Made By AndLego. {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
