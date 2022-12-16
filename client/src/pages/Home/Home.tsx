import Navbar from '../../components/Navbar/Navbar';



function Home(props: any) {

  console.log('home', props.userData.displayName)

  return (
    <div>
      <Navbar page='home'/>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
