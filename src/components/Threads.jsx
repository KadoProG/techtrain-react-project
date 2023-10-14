import { useEffect, useState } from "react";
import { fetchThreadsData } from "../fetch";
import InfiniteScroll from "react-infinite-scroller";

const Threads = () => {
  const [hasError, setHasError] = useState(false); // エラー状態
  const [hasWait, setHasWait] = useState(true); // 待ち状態
  const [threads, setThreads] = useState([]); // スレッド一覧

  // ロード時に実行
  useEffect(() => {
    fetchThreadsData(0)
      .then((result) => {
        setThreads(result);
        setHasWait(false);
      })
      .catch((error) => {
        setHasError(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(threads);
  }, [threads]);

  useEffect(() => {
    if (hasWait === false) {
      setHasError(false);
    }
  }, [hasWait]);

  const items = hasError ? (
    <p key={-1}>エラーのため読み込みに失敗しました</p>
  ) : (
    threads.map((thread, index) => {
      return (
        <p key={index}>
          <span>{index + 1}</span>
          {thread.title}
        </p>
      );
    })
  );

  const loadMore = async () => {
    setHasWait(true);
    await fetchThreadsData(threads.length)
      .then((result) => {
        setThreads([...threads, ...result]);
        setHasWait(false);
      })
      .catch((error) => {
        hasError(true);
        console.error(error);
      });
  };

  const loader = <div key={0}>Loading ...</div>;

  return (
    <div>
      <h2>新着スレッド</h2>
      <InfiniteScroll
        className="main__threads-container"
        loadMore={loadMore}
        hasMore={!hasWait}
        loader={loader}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
};

export default Threads;
