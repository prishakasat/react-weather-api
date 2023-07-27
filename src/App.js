import { useEffect } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import Secret from "./pages/protected/Secret";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import { firebaseConfig } from "./configs/firebaseConfig";
import { saveUser } from "./redux/slice/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);
  console.log("user from state", user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  return (
    <Router>
      <Toaster />
      <nav className="bg-blue-500 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">
            Weather App
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            {!user && <li>
              <Link to="/login">Login</Link>
            </li>}
            {!user && <li>
              <Link to="/register">Register</Link>
            </li>}
            {user && <li>
              <Link to="/reset">Reset password</Link>
            </li>}
            {user != null && <li>
              <Link to="/protected">Weather page</Link>
            </li>}
            {user && <li>
              <Link
                to="#"
                className="text-white hover:text-gray-300"
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      console.log("user signed out");
                      toast.success("Logout successfull");
                    })
                    .catch((error) => {
                      console.log("error", error);
                      toast.error("Something went wrong");
                    });
                }}
              >
                Log out
              </Link>
            </li>}
          </ul>
        </div>
      </nav>

      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/reset">
          <Reset />
        </Route>

        <ProtectedRoute exact path="/protected" component={Secret} />

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
