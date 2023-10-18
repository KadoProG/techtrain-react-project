import { Routes, Route, Link } from "react-router-dom";
import "./App.scss";
import Threads from "./components/Threads";
import New from "./components/New";

const App = () => {
  return (
    <div>
      <header className="header">
        <Link to="/">
          <h1>掲示板</h1>
        </Link>
        {/* <a href="/thread/new">新しいスレッド</a> */}
        <Link to="/thread/new">新しいスレッド</Link>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Threads />} />
          <Route path="/thread/new" element={<New />} />
        </Routes>
      </main>
      <footer className="footer">ここがﾌｯﾀﾞ</footer>
    </div>
  );
};

export default App;
