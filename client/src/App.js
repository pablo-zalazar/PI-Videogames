import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import GameCreate from "./components/GameCreate";
import Details from "./components/Details";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/videogames/add" component={GameCreate} />
          <Route path="/videogames/:id" component={Details} />
          <Route path="/videogames" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
