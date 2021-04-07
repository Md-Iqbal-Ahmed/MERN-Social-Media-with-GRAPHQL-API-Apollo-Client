import "./App.css";
import React, { useContext } from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./components/authContext/Auth";
import AuthRoute from "./components/AuthRoute";
import SignlePost from "./components/SignlePost";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Container>
            <NavBar />
            <Route path="/" exact component={Home} />
            <AuthRoute path="/login" exact component={Login} />
            <AuthRoute path="/register" exact component={Register} />
            <Route path="/posts/:postId" exact component={SignlePost} />
          </Container>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
