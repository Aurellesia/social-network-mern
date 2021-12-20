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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/followers/:id" element={<Followers />} />
            <Route path="/following/:id" element={<Following />} />
            <Route path="/profile/:id" element={<FriendsProfile />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
