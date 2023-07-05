import axios from "axios";

const baseURL = "http://maltrans.abuodehbros.com:3030/rate"; //maltrans.abuodehbros.com

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

const getRateTemplatesData = async (data) => {
  return axios({
    url: "/get-rate-questions",
    baseURL,
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data:JSON.stringify(data)
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

const saveRate = async (formData) => {
  return axios.post(`${baseURL}/save-rate`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout:10000
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err)
    return {
      status: "falid",
      msg: "خطا اتصال"
    }
  });
};

export { getUser, saveRate, getRateTemplatesData };
