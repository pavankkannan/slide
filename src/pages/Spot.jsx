
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



const Spot = () => {
    return (
        <>  
            <NavBar/>
            <h1>Spot Page</h1>;
            <input type="button" value= "Reviews" />
            <Text>Hello World</Text>
            
        </>
    )
  };
  
  export default Spot;

