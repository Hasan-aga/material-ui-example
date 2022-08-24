import logo from "./logo.svg";
import "./App.css";
import ButtonAppBar from "./components/appbar/appbar.component";
import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ButtonAppBar />
        <Button variant="outlined" size="large">
          Hallo world
        </Button>{" "}
      </header>
    </div>
  );
}

export default App;
