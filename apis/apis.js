import axios from "axios";

const baseURL = "http://localhost:3030/rate"; 

const getUser = async (username, password) => {
  let data = { username, password };
  return axios({
    url: "/check-supervisor-user",
    baseURL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return {
      status: "falid",
      msg: "خطا اتصال"
    }
  });
};

const getRateTemplatesData = async () => {
  return axios({
    url: "get-rate-questions",
    baseURL,
    method: "GET",
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return {
      status: "falid",
      msg: "خطا اتصال"
    }
  });
};

const saveRate = async (data) => {
  return axios({
    url: "/save-rate",
    baseURL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    return {
      status: "falid",
      msg: "خطا اتصال"
    }
  });
};

export { getUser, saveRate, getRateTemplatesData };
