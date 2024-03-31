import { Mainroute } from "./Mainroute"
import store from "./Store/store"
import { Provider } from "react-redux"

function App() {

  return (
    <>
      <Provider store={store}>
        <Mainroute />
      </Provider>
    </>
  );
}

export default App
