import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchThreadData } from "../fetch";
import InfiniteScroll from "react-infinite-scroller";
import Post from "./Post";

const Thread = (props) => {
  const [hasError, setHasError] = useState(false); // エラー状態
  const [isLoading, setIsLoading] = useState(true); // 待ち状態
  const [isLast, setIsLast] = useState(false); // 最後か否か
  const [isReadMore, setIsReadMore] = useState(false); // ロード可能か否か
  const [threadList, setThreadList] = useState([]); // スレッド一覧
  const threadTitle = props.title; // スレッドタイトル

  const threadId = useParams().id || ""; // スレッドIDを取得

  // ロード時に実行
  useEffect(() => {
    fetchThreadData(threadId, 0)
      .then((result) => {
        if (result.posts.length === 0) {
          setIsLast(true);
        }
        setThreadList([...result.posts]);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      });
    setIsLoading(false);
  }, [threadId]);

  useEffect(() => {
    setIsReadMore(!isLoading && !isLast);
  }, [isLoading, isLast]);

  // デバッグ用
  useEffect(() => {
    console.log(threadList);
  }, [threadList]);

  // 記事を再読み込み
  const onReload = () => {
    setIsLast(false);
    setThreadList([]);
  };

  // 挿入するListの要素
  const items = hasError ? (
    <p key={-1} className="main__threads__error">
      エラーのため読み込みに失敗しました
    </p>
  ) : (
    <ul>
      {threadList.map((thread, index) => {
        return (
          <li key={thread.id}>
            <span>{index + 1}</span>
            {thread.post}
          </li>
        );
      })}
    </ul>
  );

  // 無限スクロールで、一定以上スクロールしたら発火される処理
  const loadMore = async () => {
    if (hasError || isLast) return;
    setIsLoading(true);
    try {
      const result = await fetchThreadData(threadId, threadList.length);
      if (result.posts.length === 0) {
        setIsLast(true);
      }
      setThreadList([...threadList, ...result.posts]);
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
    setIsLoading(false);
  };

  // ロード時の要素?
  const loader = <div key={0}>Loading ...</div>;

  return (
    <>
      <div>
        <h2>{threadTitle}</h2>
        <Post threadId={threadId} onReload={onReload} />
        <InfiniteScroll
          className="main__thread-container"
          loadMore={loadMore}
          hasMore={isReadMore}
          loader={loader}
        >
          {items}
          {isLast ? <p>最後です</p> : ""}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Thread;
