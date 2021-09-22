import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  return (
    <div>
      <AppBar color="primary" position="static">
        <Toolbar variant="dense">
          <Typography variant="h4" color="secondary" component="div">
            Tugas Kelompok 40 Modul 5
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
    </div>
  );
}

export default App;
