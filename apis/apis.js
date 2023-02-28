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
      branches:[
        "مستودع كارفور - البيادر",
        "مستودع سامح مول - العريفة طبربور",
        "مستودع السيفوي - الزرقاء الجديدة",
        "مستودع طريق المطار - جاموس بلازا",
        "مستودع كريم ماركت المدينة الرياضية",
      ],
      categories:[
        {
          id:0,
          max:3,
          total:0,
          maxTotal:8,
          name:'مظهر الموظف',
          questions:[
            {
              id:0,
              max:4,
              score:0,
              qCode:'q1',
              question:'الالتزام بالزي الرسمي و نظافته والبادج',
              maxGrade:2
            },
            {
              id:1,
              max:4,
              score:0,
              qCode:'q2',
              question:'ترتيب ونظافة الموظفين :حلاقه اللحية (ذكور) - مكياج و اكسسوارات (اناث)',
              maxGrade:2
            },
            {
              id:2,
              max:4,
              score:0,
              qCode:'q3',
              question:'نظافة الوجه , اليديين , الأظافر',
              maxGrade:2
            },
            {
              id:3,
              max:4,
              score:0,
              qCode:'q3',
              question:'ارتداء القفازات و القناع',
              maxGrade:2
            },
            {
              id:4,
              max:4,
              note:''
            }
          ]
        },
        {
          id:1,
          max:3,
          total:0,
          maxTotal:18,
          name:'سلوكيات الموظف',
          questions:[
            {
              id:0,
              max:9,
              score:0,
              qCode:'q1',
              question:'استخدام وسائل البيع الأفقي أو العامودي',
              maxGrade:2
            },
            {
              id:1,
              max:9,
              score:0,
              qCode:'q2',
              question:'الترويج لأحدث العروض و المنتجات الجديدة',
              maxGrade:2
            },
            {
              id:2,
              max:9,
              score:0,
              qCode:'q3',
              question:'مدى معرفه الموظف بالهدف الشهري و الأهداف الأضافية',
              maxGrade:2
            },
            {
              id:3,
              max:9,
              score:0,
              qCode:'q4',
              question:'مدى معرفه الموظف بالمنتج و طريقة تقديمه',
              maxGrade:2
            },
            {
              id:4,
              max:9,
              score:0,
              qCode:'q5',
              question:'استقبال الموظف للعملاء " أهلا و سهلا"',
              maxGrade:2
            },
            {
              id:5,
              max:9,
              score:0,
              qCode:'q6',
              question:'ممنوع التدخين في المتجر (لا يمكن رؤيته بالنسبة للعميل، أو شم رائحة سيئة) ',
              maxGrade:2
            },
            {
              id:6,
              max:9,
              score:0,
              qCode:'q7',
              question:'خدمة العملاء (المظهر/ الابتسامة/ لغة الجسد/ التحدث/ وقت المناولة/ توفير السلال/ التعاون / الاصغاء) ',
              maxGrade:2
            },
            {
              id:7,
              max:9,
              score:0,
              qCode:'q8',
              question:'عدم استخدام الموظفون كلمات مضللة (لا أعلم، ما عندي فكرة، لا أستطيع، أنا جديد، مشرفي قال...)',
              maxGrade:2
            },
            {
              id:8,
              max:9,
              score:0,
              qCode:'q9',
              question:'عدم أكل  أو تذوق الموظفون داخل الفرع من العينات أمام العملاء',
              maxGrade:2
            },
            {
              id:9,
              max:9,
              note:''
            }
          ]
        },
        {
          id:2,
          max:3,
          total:0,
          maxTotal:15,
          name:'الجودة',
          questions:[
            {
              id:0,
              max:10,
              score:0,
              qCode:'q1',
              question:'المستلم أولا يباع أولا',
              maxGrade:2
            },
            {
              id:1,
              max:10,
              score:0,
              qCode:'q2',
              question:'غربلة و تقليب البضاعة',
              maxGrade:2
            },
            {
              id:2,
              max:10,
              score:0,
              qCode:'q3',
              question:'عزل التوالف و المرتجعات و تجهيز طلب الأرجاع',
              maxGrade:2
            },
            {
              id:3,
              max:10,
              score:0,
              qCode:'q4',
              question:'ضمان أن المنتجات عالية الجودة فقط معروضة',
              maxGrade:1
            },
            {
              id:4,
              max:10,
              score:0,
              qCode:'q5',
              question:' استخدام ملف الأستلام و الأرجاع',
              maxGrade:1
            },
            {
              id:5,
              max:10,
              score:0,
              qCode:'q6',
              question:'الالتزام بتوزيع الأصناف حسب برنامج اسقاط المواد ',
              maxGrade:1
            },
            {
              id:6,
              max:10,
              score:0,
              qCode:'q7',
              question:'توفير كافة الأصناف و بكميات مقبولة',
              maxGrade:1
            },
            {
              id:7,
              max:10,
              score:0,
              qCode:'q8',
              question:'وجود بطاقه بيان لكل منتج',
              maxGrade:1
            },
            {
              id:8,
              max:10,
              score:0,
              qCode:'q9',
              question:'التأكد من وجود الشهادات صحية و صلاحيتها',
              maxGrade:1
            },
            {
              id:9,
              max:10,
              score:0,
              qCode:'q10',
              question:'تفقد الاصناف الحساسه للتاكد من عدم وجود دود او بيوض فراش',
              maxGrade:1
            },
            {
              id:10,
              max:10,
              note:''
            }
          ]
        },
      ]
    }
  }
};

const getRateTemplatesData = async (username) => {
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
          ],
          categories:[
            {
              id:0,
              max:3,
              total:0,
              maxTotal:8,
              name:'مظهر الموظف',
              questions:[
                {
                  id:0,
                  max:4,
                  score:0,
                  qCode:'q1',
                  question:'الالتزام بالزي الرسمي و نظافته والبادج',
                  maxGrade:2
                },
                {
                  id:1,
                  max:4,
                  score:0,
                  qCode:'q2',
                  question:'ترتيب ونظافة الموظفين :حلاقه اللحية (ذكور) - مكياج و اكسسوارات (اناث)',
                  maxGrade:2
                },
                {
                  id:2,
                  max:4,
                  score:0,
                  qCode:'q3',
                  question:'نظافة الوجه , اليديين , الأظافر',
                  maxGrade:2
                },
                {
                  id:3,
                  max:4,
                  score:0,
                  qCode:'q3',
                  question:'ارتداء القفازات و القناع',
                  maxGrade:2
                },
                {
                  id:4,
                  max:4,
                  note:''
                }
              ]
            },
            {
              id:1,
              max:3,
              total:0,
              maxTotal:18,
              name:'سلوكيات الموظف',
              questions:[
                {
                  id:0,
                  max:9,
                  score:0,
                  qCode:'q1',
                  question:'استخدام وسائل البيع الأفقي أو العامودي',
                  maxGrade:2
                },
                {
                  id:1,
                  max:9,
                  score:0,
                  qCode:'q2',
                  question:'الترويج لأحدث العروض و المنتجات الجديدة',
                  maxGrade:2
                },
                {
                  id:2,
                  max:9,
                  score:0,
                  qCode:'q3',
                  question:'مدى معرفه الموظف بالهدف الشهري و الأهداف الأضافية',
                  maxGrade:2
                },
                {
                  id:3,
                  max:9,
                  score:0,
                  qCode:'q4',
                  question:'مدى معرفه الموظف بالمنتج و طريقة تقديمه',
                  maxGrade:2
                },
                {
                  id:4,
                  max:9,
                  score:0,
                  qCode:'q5',
                  question:'استقبال الموظف للعملاء " أهلا و سهلا"',
                  maxGrade:2
                },
                {
                  id:5,
                  max:9,
                  score:0,
                  qCode:'q6',
                  question:'ممنوع التدخين في المتجر (لا يمكن رؤيته بالنسبة للعميل، أو شم رائحة سيئة) ',
                  maxGrade:2
                },
                {
                  id:6,
                  max:9,
                  score:0,
                  qCode:'q7',
                  question:'خدمة العملاء (المظهر/ الابتسامة/ لغة الجسد/ التحدث/ وقت المناولة/ توفير السلال/ التعاون / الاصغاء) ',
                  maxGrade:2
                },
                {
                  id:7,
                  max:9,
                  score:0,
                  qCode:'q8',
                  question:'عدم استخدام الموظفون كلمات مضللة (لا أعلم، ما عندي فكرة، لا أستطيع، أنا جديد، مشرفي قال...)',
                  maxGrade:2
                },
                {
                  id:8,
                  max:9,
                  score:0,
                  qCode:'q9',
                  question:'عدم أكل  أو تذوق الموظفون داخل الفرع من العينات أمام العملاء',
                  maxGrade:2
                },
                {
                  id:9,
                  max:9,
                  note:''
                }
              ]
            },
            {
              id:2,
              max:3,
              total:0,
              maxTotal:15,
              name:'الجودة',
              questions:[
                {
                  id:0,
                  max:10,
                  score:0,
                  qCode:'q1',
                  question:'المستلم أولا يباع أولا',
                  maxGrade:2
                },
                {
                  id:1,
                  max:10,
                  score:0,
                  qCode:'q2',
                  question:'غربلة و تقليب البضاعة',
                  maxGrade:2
                },
                {
                  id:2,
                  max:10,
                  score:0,
                  qCode:'q3',
                  question:'عزل التوالف و المرتجعات و تجهيز طلب الأرجاع',
                  maxGrade:2
                },
                {
                  id:3,
                  max:10,
                  score:0,
                  qCode:'q4',
                  question:'ضمان أن المنتجات عالية الجودة فقط معروضة',
                  maxGrade:1
                },
                {
                  id:4,
                  max:10,
                  score:0,
                  qCode:'q5',
                  question:' استخدام ملف الأستلام و الأرجاع',
                  maxGrade:1
                },
                {
                  id:5,
                  max:10,
                  score:0,
                  qCode:'q6',
                  question:'الالتزام بتوزيع الأصناف حسب برنامج اسقاط المواد ',
                  maxGrade:1
                },
                {
                  id:6,
                  max:10,
                  score:0,
                  qCode:'q7',
                  question:'توفير كافة الأصناف و بكميات مقبولة',
                  maxGrade:1
                },
                {
                  id:7,
                  max:10,
                  score:0,
                  qCode:'q8',
                  question:'وجود بطاقه بيان لكل منتج',
                  maxGrade:1
                },
                {
                  id:8,
                  max:10,
                  score:0,
                  qCode:'q9',
                  question:'التأكد من وجود الشهادات صحية و صلاحيتها',
                  maxGrade:1
                },
                {
                  id:9,
                  max:10,
                  score:0,
                  qCode:'q10',
                  question:'تفقد الاصناف الحساسه للتاكد من عدم وجود دود او بيوض فراش',
                  maxGrade:1
                },
                {
                  id:10,
                  max:10,
                  note:''
                }
              ]
            },
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

export { getUser, saveRate, getRateTemplatesData };
