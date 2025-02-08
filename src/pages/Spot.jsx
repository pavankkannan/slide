
const BgImg = () => {
    return (
        <div
          style={{
            backgroundImage: "url('/Users/shanesomson/Slide-Proj-Hackathon/slide/src/assets/living_water_tea_house.jpg')", // If in 'public' folder
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100vw",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center", paddingTop: "20vh" }}>
            Welcome to My Page
          </h1>
        </div>
      );
}


const Spot = () => {
    return (
        <>
            <h1>Spot Page</h1>;
            <BgImg/>
        </>
    )
  };
  
  export default Spot;

