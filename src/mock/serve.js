// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const http = require("http"); // 文档中使用的方法，编辑器还会提醒使用es6 import的写法
// import http from 'http'

const hostname = "127.0.0.1";
const port = 3004;

// 模拟数据

const data = [
  {
    key: 1,
    name: "张宏",
    age: 20,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "男",
    status: "在校",
  },
  {
    key: 2,
    name: "张明",
    age: 21,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "男",
    status: "在校",
  },
  {
    key: 3,
    name: "李明",
    age: 22,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "男",
    status: "在校",
  },
  {
    key: 4,
    name: "李红",
    age: 22,
    apartment: "计算机学院",
    class: "20级（1）班",
    sex: "女",
    status: "离校",
  },
  {
    key: 5,
    name: "王明",
    age: 19,
    apartment: "计算机学院",
    class: "20级（2）班",
    sex: "女",
    status: "在校",
  },
  {
    key: 6,
    name: "李明",
    age: 20,
    apartment: "计算机学院",
    class: "20级（1）班",
    sex: "女",
    status: "离校",
  },
  {
    key: 7,
    name: "张强",
    age: 20,
    apartment: "计算机学院",
    class: "20级（1）班",
    sex: "男",
    status: "离校",
  },
  {
    key: 8,
    name: "张丽",
    age: 20,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "女",
    status: "离校",
  },
  {
    key: 9,
    name: "李丽",
    age: 20,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "女",
    status: "离校",
  },
  {
    key: 10,
    name: "李丽",
    age: 20,
    apartment: "信息工程学院",
    class: "20级（1）班",
    sex: "女",
    status: "离校",
  },
];

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html;charset='utf-8' ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "X-Request-With");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");

  res.write(JSON.stringify(data));
  //   console.log(data);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
