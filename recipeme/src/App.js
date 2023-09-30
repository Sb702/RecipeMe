import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import CreateAccount from "./Pages/CreateAccount";
import Login from "./Pages/Login";
import AccountPage from "./AccountPage";
import Navigation from "./Navigation";
import { supabase } from "./supabaseClient";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    } else {
      console.log(data);
      setData(data);
      setLoggedIn(true);
    }
  };

  const handleLogout = async () => {
    if (!supabase.auth.user()) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      setData({});
      setLoggedIn(false);
    }
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>Recipe App</h1>
          <Navigation loggedIn={loggedIn} handleLogout={handleLogout} />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SearchPage data={data} loggedIn={loggedIn} />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <AccountPage data={data} />
                ) : (
                  <Login
                    handleLogin={handleLogin}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    loggedIn={loggedIn}
                  />
                )
              }
            />
            <Route path="/account" element={<AccountPage data={data} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;