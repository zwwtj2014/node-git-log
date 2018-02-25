const util = require("util");
const fs = require("fs");
const open = util.promisify(fs.open);
const exec = util.promisify(require("child_process").exec);

function Gitlog() {}

Gitlog.prototype._ = async function(options, fPath, cb) {
  const { stdout, stderr } = await exec(`git log ${options}`);
  if (stderr) {
    throw stderr;
  }
  this._outputFile(fPath, stdout, cb);
};

Gitlog.prototype.sinceUntil = async function(since, until, fPath, pretty, cb) {
  since = since ? `--since ${since}` : "";
  until = until ? `--until ${until}` : "";
  pretty = pretty ? `--pretty ${pretty}` : "";
  const cmd = `git log ${since} ${until}  ${pretty}`;
  const { stdout, stderr } = await exec(cmd);
  if (stderr) {
    throw stderr;
  }
  this._outputFile(stdout, fPath || `${process.cwd()}/git-log.txt`, cb || (err => {}));
};
Gitlog.prototype._outputFile = async function(data, fPath, cb) {
  if (fPath) {
    fs.writeFile(fPath, data, cb);
  }
};

// Gitlog.prototype._udfToEmptyStr = function(...str) {
//   (strs || []).forEach(str => {
//     str = str ? `--${str} ${str}` : "";
//   });
//   return strs;
// };

module.exports = exports = Gitlog;
