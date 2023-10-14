import { useEffect, useState } from "react";
import { fetchAddThread } from "../fetch";

const New = () => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // 送信時の処理
  const handleClick = (e) => {
    if (text === "") return;
    e.preventDefault();
    const newText = text;
    setText("");
    fetchAddThread(newText)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setText(newText);
        console.error(error);
      });
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className="main__new">
      <h2>スレッド新規作成</h2>
      <input
        type="text"
        placeholder="スレッドタイトル"
        value={text}
        onChange={handleChange}
      />
      <div className="main__new__bottom">
        <a href="/">トップに戻る</a>
        <button onClick={handleClick}>作成</button>
      </div>
    </div>
  );
};

export default New;
