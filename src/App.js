import "./App.css";
import { MyApplication } from "./components/MyApplication";
import { Provider } from "react-redux";
import store from "./assets/app/store";
const App = () => {
  return (
    <>
      <Provider store={store}>
        <MyApplication></MyApplication>
      </Provider>
    </>
  );
};

export default App;
