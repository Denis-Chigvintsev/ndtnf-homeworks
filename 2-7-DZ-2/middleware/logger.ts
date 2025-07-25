const fs = require('fs');
const os = require('os');

function logger(req:any, res:any, next:any) {
  const now = new Date().toLocaleString();

  const { url, method } = req;
  const data = `${now} ${method} ${url}`;

  fs.appendFile('log.txt', `${data} +${os.EOL}`, (err:any) => {
    if (err) {
      console.log(err);
    }
  });
  next();
}

export default logger;
