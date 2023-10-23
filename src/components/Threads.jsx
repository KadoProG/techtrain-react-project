import { useEffect, useState } from "react";
import { fetchThreadsData } from "../fetch";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";

const Threads = (props) => {
  const [hasError, setHasError] = useState(false); // エラー状態
  const [isLoading, setIsLoading] = useState(true); // 待ち状態
  const [threads, setThreads] = useState([]); // スレッド一覧

  // ロード時に実行
  useEffect(() => {
    fetchThreadsData(0)
      .then((result) => {
        setThreads(result);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      });
  }, []);

  // デバッグ用
  useEffect(() => {
    console.log(threads);
  }, [threads]);

  // ローディングが完了したら、エラーを解除
  useEffect(() => {
    if (isLoading === false) {
      setHasError(false);
    }
  }, [isLoading]);

  const handleClick = (title) => {
    props.setTitle(title);
  };

  // 挿入するListの要素
  const items = hasError ? (
    <p key={-1} className="main__threads__error">
      エラーのため読み込みに失敗しました
    </p>
  ) : (
    <ul>
      {threads.map((thread, index) => {
        const threadUrl = "/thread/" + thread.id;
        return (
          <li key={thread.id}>
            <Link to={threadUrl} onClick={() => handleClick(thread.title)}>
              <span>{index + 1}</span>
              {thread.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // 無限スクロールで、一定以上スクロールしたら発火される処理
  const loadMore = async () => {
    if (hasError) return;
    setIsLoading(true);
    await fetchThreadsData(threads.length)
      .then((result) => {
        setThreads([...threads, ...result]);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      });
  };

  // ロード時の要素?
  const loader = <div key={0}>Loading ...</div>;

  return (
    <div>
      <h2>新着スレッド</h2>
      <InfiniteScroll
        className="main__threads-container"
        loadMore={loadMore}
        hasMore={!isLoading}
        loader={loader}
      >
        {items}
      </InfiniteScroll>
    </div>
  );
};

export default Threads;
