import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "./../helpers/constans";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const res = await axios.get(
      "https://text-translator2.p.rapidapi.com/getLanguages",
      options
    );
    const languages = res.data.data.languages;

    // diziyi dönüp code keylleri valueye çevir
    // name keyleri label eçevir

    const newLanguage = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));

    return newLanguage;
  }
);

// çeviri yapma

export const getAnswer = createAsyncThunk(
  "translate/getAnswer",
  async (prop) => {
    // istek için gerekli olanlar

    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", prop.sourceLang.value);
    encodedParams.set("target_language", prop.targetLang.value);
    encodedParams.set("text", prop.text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key":
          "c974f7db8amshbfee62640b69369p126f80jsn08900929acdb",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const rest = await axios.request(options);
    const answer = rest.data.data.translatedText;

    return answer;
  }
);
