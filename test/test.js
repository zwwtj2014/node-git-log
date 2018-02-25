const gitlog = new (require("../index"))();

gitlog.sinceUntil("2018-01-01", "2018-02-26",'log.txt','--name-status');
