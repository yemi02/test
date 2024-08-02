import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const user = true;
  return <div>{user ? <AuthScreen /> : <HomeScreen />}</div>;
};

export default HomePage;
