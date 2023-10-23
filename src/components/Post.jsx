import { useState } from "react";
import { fetchAddThreadItem } from "../fetch";

const Post = (props) => {
  const threadId = props.threadId;
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
    fetchAddThreadItem(threadId, newText)
      .then((result) => {
        console.log(result);
        props.onReload();
      })
      .catch((error) => {
        setText(newText);
        console.error(error);
      });
  };

  return (
    <form className="main__new main__topright" onSubmit={handleSubmit}>
      <textarea
        cols="30"
        rows="10"
        placeholder="投稿しよう！"
        onChange={handleChange}
        value={text}
      ></textarea>
      <button type="submit">投稿</button>
    </form>
  );
};

export default Post;
