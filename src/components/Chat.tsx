import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import History from "./History";
import Form from "./Form";
import Loader from "./Loader/Loader";
const _URL = "http://localhost:7070/messages";

const Chat = () => {

  type listType = {
    id: number,
    userId: string,
    content: string,
  }[];

  const [list, setList] = useState<listType>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [lastId, setLastId] = useState<number>(0);

  let timeout: number;

  useEffect(() => {
    update(0);
    logIn();
  }, []);

  useEffect(() => {
    setLoading(false);
    setLastId(getLastId());

    timeout = setTimeout(() => {
      update(getLastId());
    }, 5000);

    return (() => {
      window.clearTimeout(timeout);
    });
  },[list]);

  useEffect(() => {
    const element = document.getElementById(getLastId().toString());
    if (element) {
      element.scrollIntoView(false);
    }
  }, [lastId]);

  const logIn = () => {
    let id = localStorage.getItem("lifecycle-http_chat");
    if (!id) {
      localStorage.setItem("lifecycle-http_chat", uuidv4());
      id = localStorage.getItem("lifecycle-http_chat");
    }
    if (id) {
      setUserId(id as string);
    }
  }

  const getLastId = () => {
    return list.reduce((acc, item) => {
      return item.id > acc ? item.id : acc;
    }, 0);
  }

  // const handleSubmit = async (event: React.FormEvent) => {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { target } = event;
    const { elements } = target;
    const content = elements.content.value;
    target.reset();
    await add(content);
  }

  const add = async (content: string) => {
    setLoading(true);
    await fetch(_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        content,
      }),
    });
    scroll();
  }

  const update = async (lastId: number) => {
    const response = await fetch(_URL + `?from=${lastId}`);
    const res = await response.json(); 
    setList([...list, ...res]);
  }

  return (
    <div className="chat">
      {loading && <Loader />}
      <h1 className="chat__title">Anonymous Chat</h1>
      <History list={list} userId={userId} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
}

export default Chat;