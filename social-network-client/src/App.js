import "./App.css";
import "./style/sass/styles.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Timeline from "./pages/Timeline";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Setting from "./pages/Setting";
import { Provider } from "react-redux";
import store from "./redux/store";
import Logout from "./pages/Logout";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import FriendsProfile from "./pages/FriendsProfile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Timeline />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route
              path="/setting"
              element={
                <PrivateRoute>
                  <Setting />
                </PrivateRoute>
              }
            />
            <Route
              path="/followers/:id"
              element={
                <PrivateRoute>
                  <Followers />
                </PrivateRoute>
              }
            />
            <Route
              path="/following/:id"
              element={
                <PrivateRoute>
                  <Following />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <FriendsProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/posts/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
