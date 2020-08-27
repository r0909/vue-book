let http = require("http");
let fs = require("fs");
let url = require("url");
let sliders = require("./mock/sliders");

function read(cb) {
  fs.readFile("./mock/book.json", "utf8", function(err, data) {
    if (err || data.length == 0) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}
function write(data, cb) {
  fs.writeFile("./mock/book.json", JSON.stringify(data), cb);
}

let pageSize = 5;

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.setHeader(
      "Access-Control-Allow-Methods",
      "DELETE,PUT,POST,GET,OPTIONS"
    );
    //接收ajax请求手动提交的cookie信息
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("X-Powered-By", " 3.2.1");
    if (req.method == "OPTIONS") return res.end(); //让options请求快速返回

    let { pathname, query } = url.parse(req.url, true);

    if (pathname === "/page") {
      let offset = parseInt(query.offset) || 0;
      read(function(books) {
        let result = books.reverse().slice(offset, offset + pageSize);
        let hasMore = true;
        if (books.length <= offset + pageSize) {
          hasMore = false;
        }
        res.setHeader("Content-Type", "application/json;charset=utf8");
        res.end(JSON.stringify({ hasMore, books: result }));
      });
      return;
    }

    if (pathname === "/sliders") {
      res.setHeader("Content-Type", "application/json;charset=utf8");
      return res.end(JSON.stringify(sliders));
    }
    if (pathname === "/hot") {
      read(function(books) {
        let hot = books.reverse().slice(0, 6);
        res.setHeader("Content-Type", "application/json;charset=utf8");
        res.end(JSON.stringify(hot));
      });
      return;
    }
    if (pathname === "/book") {
      let id = parseInt(query.id);
      switch (req.method) {
        case "GET":
          if (!isNaN(id)) {
            read(books => {
              let book = books.find(item => item.bookId === id);
              if (!book) {
                book = {};
              }
              res.setHeader("Content-Type", "application/json;charset=utf8");
              res.end(JSON.stringify(book));
            });
          } else {
            read(books => {
              res.setHeader("Content-Type", "application/json;charset=utf8");
              res.end(JSON.stringify(books.reverse()));
            });
          }
          break;
        case "POST":
          let str = "";
          req.on("data", chunk => {
            str += chunk;
          });
          req.on("end", () => {
            let book = JSON.parse(str);
            read(books => {
              book.bookId = books.length
                ? books[books.length - 1].bookId + 1
                : 1;
              books.push(book);
              write(books, () => {
                res.end(JSON.stringify(book));
              });
            });
          });
          break;
        case "PUT":
          if (id) {
            let str = "";
            req.on("data", chunk => {
              str += chunk;
            });
            req.on("end", () => {
              let book = JSON.parse(str);
              read(books => {
                books = books.map(item => {
                  if (item.bookId === id) {
                    return book;
                  }
                  return item;
                });
                write(books, () => {
                  res.end(JSON.stringify(book));
                });
              });
            });
          }
          break;
        case "DELETE":
          read(books => {
            books = books.filter(item => item.bookId !== id);
            write(books, () => {
              res.end(JSON.stringify({}));
            });
          });
          break;
      }
      return;
    }
  })
  .listen(3000);
