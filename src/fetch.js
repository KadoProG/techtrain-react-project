// 掲示板のBase URL
const BASE_URL = "https://2y6i6tqn41.execute-api.ap-northeast-1.amazonaws.com";

// スレッド一覧取得
export const fetchThreadsData = async (num) => {
  const url = BASE_URL + "/threads?offset=" + num;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => resolve(result),
        (error) => {
          reject(new Error(error));
        }
      );
  });
};

// 新しいスレッドを追加
export const fetchAddThread = async (titleText) => {
  const url = BASE_URL + "/threads";
  const send_json = { title: titleText };
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_json),
    })
      .then((res) => res.json())
      .then(
        (result) => resolve(result),
        (error) => {
          reject(new Error(error));
        }
      );
  });
};