import React from "react";
import AuthStatus from "./AuthStatus";

const Home = () => (
  <div className="home-containers">
    <div className="auth-status">
      <AuthStatus />
    </div>

    <div className="container3">
      <h4 className="font3">
        <p className="title-look">LOOKKAINGERN888</p>
        <img src={require("../images/buffet.png")} alt="Lookkai" />
      </h4>

      <div className="container4">
        <h4 className="font-main2">
          <p>
            <b className="bold-text"></b> At Lookkaingern888, we prioritize
            quality and freshness. Our ingredients are carefully sourced to
            ensure a premium dining experience. Our skilled chefs are passionate
            about their craft and are dedicated to delivering flavors that will
            leave you wanting more. Whether you're a fan of savory and bold
            tastes or prefer lighter and more delicate flavors, our diverse menu
            has something for everyone.
          </p>
          <br />
          <p>
            <b className="bold-text"></b> Visit Lookkaingern888 Shabu & Yakiniku
            Buffet today and discover why we are the ultimate dining destination
            for shabu-shabu and yakiniku lovers. Your taste buds will thank you!
          </p>
        </h4>
      </div>
    </div>

    <div className="footer">
      <h4 className="font-main4">
        <p className="about">About us</p>
        <p>
          Lookkaingern888 Shabu & Yakiniku Buffet is a fantastic all-you-can-eat
          restaurant
        </p>
        <p>that specializes in shabu-shabu and yakiniku.</p>
        <p>Open everyday 11.00 - 22.00</p>
      </h4>
      <h4 className="font-main3">
        <p className="about">Contact</p>
        <p>Tel: 061-820-6987</p>
        <p>Facebook: lookkaingeang888</p>
        <p>Line Id: @lkng888</p>
        <p>Email: lookkaing@gmail.com</p>
        <p>Address: Building, 18th floor 253 Asoke 21</p>
      </h4>
    </div>
  </div>
);

export default Home;
