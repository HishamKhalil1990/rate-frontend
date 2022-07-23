import axios from "axios";

const baseURL = "https://alrayhan-rate.herokuapp.com";

const getUser = async (username) => {
  let data = {
    username,
  };
  return axios({
    url: "/get-user",
    baseURL,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((data) => {
      if (data.data.length > 0) {
        return data.data[0].pass;
      } else {
        return "Invalid Username or Password";
      }
    })
    .catch((err) => {});
};

const saveRate = async (data) => {
  return axios({
    url: "/save-rate",
    baseURL,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((msg) => {
      console.log(msg.data);
      return msg.data;
    })
    .catch((err) => {});
};

export { getUser, saveRate };
