import React from "react";
import Select from "react-select";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLanguages, getAnswer } from "../redux/action";

const MainPage = () => {
  const [text, setText] = useState("");
  // kaynak ve hedef dil state'ine ilk değer verdik
  //   uygulama başladığı anda bu diller seçili gelir
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  });
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  });

  const dispatch = useDispatch();

  const store = useSelector((store) => store);

  const areaRef = useRef();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleClick = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);

    areaRef.current.value = "";
  };
  return (
    <>
      <h1>Çeviri +</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            isLoading={store.isLoading}
            className="select"
            options={store.language}
          />
          <textarea
            ref={areaRef}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <button className="change-btn" onClick={handleClick}>
          Değiş
        </button>

        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            isLoading={store.isLoading}
            className="select"
            options={store.language}
          />
          <textarea disabled value={store.answer}></textarea>
        </div>
      </div>

      <button
        onClick={() =>
          dispatch(getAnswer({ text, sourceLang, targetLang }))
        }
      >
        Çevir
      </button>
    </>
  );
};

export default MainPage;
