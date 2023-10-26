import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Threads from "./components/Threads";
import New from "./components/New";
import Thread from "./components/Thread";
import { useState } from "react";

const App = () => {
  const [threadTitle, setThreadTitle] = useState("");
  return (
    <div>
      <header className="header">
        <Link to="/">
          <h1>掲示板</h1>
        </Link>
        <Link to="/thread/new">新しいスレッド</Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/thread/:id" element={<Thread title={threadTitle} />} />
          <Route
            path="/"
            element={<Threads setTitle={(title) => setThreadTitle(title)} />}
          />
          <Route
            path="/thread/new"
            element={<New setTitle={(title) => setThreadTitle(title)} />}
          />
        </Routes>
      </main>
      <footer className="footer">ここがﾌｯﾀﾞ</footer>
    </div>
  );
};

export default App;
