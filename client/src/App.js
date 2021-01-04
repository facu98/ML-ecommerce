import "./App.css";
import React from "react";
import NavBar from "./components/Navbar";
import Container from "@material-ui/core/Container";
import Catalogo from "./components/Catalogo";
import { Route } from "react-router-dom";
import Home from './components/Home'
function App() {
  return (
    <div className="App">
        <NavBar />
      <Container>
        <Route exact path="/" component={Home} />

        <Route exact path="/:params" component={Catalogo} />
      </Container>
    </div>
  );
}

export default App;
