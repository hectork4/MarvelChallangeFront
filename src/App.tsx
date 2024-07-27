import { Route } from "wouter";
import TanStackProvider from "./plugins/TanStackProvider";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <TanStackProvider>
      <UserContextProvider>
        <div className="App">
          <Navbar />
          <Route path="/" component={Home} />
          <Route path="/character/:id" component={Detail} />
        </div>
      </UserContextProvider>
    </TanStackProvider>
  );
}

export default App;
