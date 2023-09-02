import React from "react";
import { useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const fetchRequest = async (url) => {
    if (url) {
      try {
        setLoading(true);
        let response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [loading, data, fetchRequest];
};

export default useFetch;
