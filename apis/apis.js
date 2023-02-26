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
        "مستودع كارفور - البيادر",
        "مستودع سامح مول - العريفة طبربور",
        "مستودع السيفوي - الزرقاء الجديدة",
        "مستودع طريق المطار - جاموس بلازا",
        "مستودع كريم ماركت المدينة الرياضية",
      ]
    }
  }
};

const getBranches = async (username) => {
  let data = { username };
  return axios({
    url: "https://www.google.com/",
    baseURL,
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // data: JSON.stringify(data),
  })
    .then((response) => {
      return ({
        status: "success",
        data:{
          branches:[
            "مستودع كارفور - البيادر",
            "مستودع سامح مول - العريفة طبربور",
            "مستودع السيفوي - الزرقاء الجديدة",
            "مستودع طريق المطار - جاموس بلازا",
            "مستودع كريم ماركت المدينة الرياضية",
            'مستودع كريم ماركت - شارع الاذاعة',
            'مستودع معرض اربد',
            "1-مستودع كارفور - البيادر",
            "1-مستودع سامح مول - العريفة طبربور",
            "1-مستودع السيفوي - الزرقاء الجديدة",
            "1-مستودع طريق المطار - جاموس بلازا",
            "1-مستودع كريم ماركت المدينة الرياضية",
            '1-مستودع كريم ماركت - شارع الاذاعة',
            '1-مستودع معرض اربد',
            "2-مستودع كارفور - البيادر",
            "2-مستودع سامح مول - العريفة طبربور",
            "2-مستودع السيفوي - الزرقاء الجديدة",
            "2-مستودع طريق المطار - جاموس بلازا",
            "2-مستودع كريم ماركت المدينة الرياضية",
            '2-مستودع كريم ماركت - شارع الاذاعة',
            '2-مستودع معرض اربد',
            "3-مستودع كارفور - البيادر",
            "3-مستودع سامح مول - العريفة طبربور",
            "3-مستودع السيفوي - الزرقاء الجديدة",
            "3-مستودع طريق المطار - جاموس بلازا",
            "3-مستودع كريم ماركت المدينة الرياضية",
            '3-مستودع كريم ماركت - شارع الاذاعة',
            '3-مستودع معرض اربد',
          ]
        }
      })
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

export { getUser, saveRate, getBranches };
