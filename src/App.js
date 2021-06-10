import { BrowserRouter, Route } from "react-router-dom";

import User from "./User";
import Admin from "./Admin";
import LoginModal from "./LoginModal/LoginModal";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={LoginModal} />
      <Route path="/admin" component={Admin} />
    </BrowserRouter>
  );
}

export default App;
