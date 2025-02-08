
const bg = () => {
    return (
        <div
          style={{
            backgroundImage: "url('/src/.jpg')", // If in 'public' folder
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
    return <h1>Spot Page</h1>;
  };
  
  export default Spot;

