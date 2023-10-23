import { useEffect, useState } from "react";
import { fetchAddThread } from "../fetch";
import { Link } from "react-router-dom";

const New = () => {
  const [text, setText] = useState(""); // 入力テキスト

  // テキストを更新
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // 送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "") return;
    const newText = text;
    setText("");
    fetchAddThread(newText)
      .then((result) => {
        const threadId = result.id;
        const url = "/thread/" + threadId;
        window.location.href = url;
        console.log(result);
      })
      .catch((error) => {
        setText(newText);
        console.error(error);
      });
  };

  // デバッグ用
  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <form className="main__new" onSubmit={handleSubmit}>
      <h2>スレッド新規作成</h2>
      <input
        type="text"
        placeholder="スレッドタイトル"
        value={text}
        onChange={handleChange}
      />
      <div className="main__new__bottom">
        <Link to="/">トップに戻る</Link>
        <button type="submit">作成</button>
      </div>
    </form>
  );
};

export default New;
