import { BrowserRouter, Route } from "react-router-dom";

import User from "./User";
import Admin from "./Admin";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={User} />
      <Route path="/admin" component={Admin} />
    </BrowserRouter>
  );
}

export default App;
