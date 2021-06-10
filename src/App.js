import { BrowserRouter, Route } from "react-router-dom";
import Admin from "./Admin";
import Register from './authentication/Register';
import Login from './authentication/Login';
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Route path="/" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/admin" component={Admin} />
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
