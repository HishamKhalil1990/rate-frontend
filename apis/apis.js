import axios from "axios";

const baseURL = "http://maltrans.abuodehbros.com:3030/mobile";

const getUser = async (username, password) => {
  let data = { username, password };
  // return axios({
  //   url: "/check-supervisor-user",
  //   baseURL,
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (response.data.status === "success") {
  //       return response.data;
  //     } else {
  //       return "Invalid Username or Password";
  //     }
  //   })
  //   .catch((err) => {});
  return {
    status: "success",
    data:{
      employeeNames:[
        "Hisham",
        "Mamoun",
        "Obada",
        "Zaid",
        "Mohammad",
        "Ramzi"
      ],
      branches:[
        ["مستودع كارفور - البيادر"],
        ["مستودع سامح مول - العريفة طبربور"],
        ["مستودع السيفوي - الزرقاء الجديدة"],
        ["مستودع طريق المطار - جاموس بلازا"],
        ["مستودع كريم ماركت المدينة الرياضية"],
      ]
    }
  }
};

const getBranches = async (username) => {
  let data = { username };
  return new Promise((resolve,reject) => {
    // return axios({
    //   url: "/check-supervisor-user",
    //   baseURL,
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     if (response.data.status === "success") {
    //       return response.data;
    //     } else {
    //       return "Invalid Username or Password";
    //     }
    //   })
    //   .catch((err) => {});
    setTimeout(() => {
      resolve ({
        status: "success",
        data:{
          branches:[
            ["مستودع كارفور - البيادر"],
            ["مستودع سامح مول - العريفة طبربور"],
            ["مستودع السيفوي - الزرقاء الجديدة"],
            ["مستودع طريق المطار - جاموس بلازا"],
            ["مستودع كريم ماركت المدينة الرياضية"],
            ['مستودع كريم ماركت - شارع الاذاعة'],
            ['مستودع معرض اربد']
          ]
        }
      })
    },1000)
  })
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

export { getUser, saveRate, getBranches };
