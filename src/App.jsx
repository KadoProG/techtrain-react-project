import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Threads from "./components/Threads";
import New from "./components/New";

const App = () => {
  return (
    <div>
      <header className="header">
        <h1>掲示板</h1>
        <a href="/thread/new">新しいスレッド</a>
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
