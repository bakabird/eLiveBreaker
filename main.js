var path = require('path');
var fs = require('fs')

function eLiveBreaker(filePath,cutsArr){
    var re = [];

    for (var i = 0; i < cutsArr.length; i++) {
      var cutTask = cutsArr[i];
      var start = cutTask[0];
      var end = cutTask[1];
      var extname = path.extname(filePath);
      var outputFile = "".concat(filepath.substr(0, filepath.length - extname.length), "___").concat(start, "_").concat(end).concat(extname);
    
      if (end != "9999") {
        re.push("ffmpeg.exe -i \"".concat(filePath, "\" -ss 00:").concat(start.substr(0, 2), ":").concat(start.substr(2, 2), " -to 00:").concat(end.substr(0, 2), ":").concat(end.substr(2, 2), " -c copy \"").concat(outputFile, "\""));
      } else {
        re.push("ffmpeg.exe -i \"".concat(filePath, "\" -ss 00:").concat(start.substr(0, 2), ":").concat(start.substr(2, 2), " -c copy \"").concat(outputFile, "\""));
      }
    }
    
    return re.join("\n");
};

var argv = process.argv
var filepath = argv[2]
var cutTasks = []
for(var i = 3;i < argv.length;i++){
    cutTasks.push([
        argv[i].split("-")[0],
        argv[i].split("-")[1],
    ])
}

var breakerCode = eLiveBreaker(filepath,cutTasks)
console.log("")
console.log(breakerCode)
console.log("")
fs.writeFileSync("./breaker.bat",breakerCode)
