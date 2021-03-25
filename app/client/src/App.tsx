import React, { useState } from "react";
import "./App.css";
import axios from "axios";

interface postProps {
  _id: string;
  title?: string;
  description?: string;
  date: string;
}
const BASE_URL = "http://localhost:4000";

function App() {
  const [data, setData] = useState<postProps>({
    _id: "",
    title: "",
    description: "",
    date: "",
  });

  const getData = async (id: string) => {
    try {
      axios.get(BASE_URL + "/posts/" + id).then((res) => {
        const data = res.data;
        console.log(res.data);

        setData({
          _id: data._id,
          title: data.title,
          description: data.description,
          date: data.date,
        });
      });
    } catch (e) {
      console.log("err", e);
    }
  };

  return (
    <div>
      ReactJS & ExpressJS 테스트
      <button onClick={() => getData("6027682d685eeb203c4ab338")}>
        getData
      </button>
      <div>- 데이터 정보 -</div>
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>{data.date}</div>
    </div>
  );
}

export default App;
