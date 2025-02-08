import React from "react";
import { useLocation } from "react-router-dom";


const BgImg = () => {
    return (
        <div>
          <h1>
            Welcome to My Page
          </h1>
        </div>
      );
}

const NavBar = () => {
    return (
        <div>
            <a class="reviews" href="#home">Reviews</a>
            <a href="#promotions">Promotions</a>
 
        </div>
    );
}



function Spot() {
    const location = useLocation();
    const business = location.state;
    return (
        <>  
            <NavBar/>
            <h1>Spot Page</h1>;
            <input type="button" value= "Reviews" />
            <h1>{business.name}</h1>
            <h1>fhdjhs</h1>
            
        </>
    )
  };
  
  export default Spot;

