const JSZip = require('jszip')
const fs = require('fs')
const path = require('path');
const zip = new JSZip();

function readDir(obj, targetPath) {
  const files = fs.readdirSync(targetPath)
  console.log(files)
  files.forEach((fileName, index) => {
    console.log(fileName, index)
    const filePath = path.join(targetPath, fileName)
    console.log(filePath)
    const file = fs.statSync(filePath);
    if(file.isDirectory())  {
      const dir = obj.folder(fileName)
      readDir(dir, filePath)
    } else {
      obj.file(fileName, fs.readFileSync(filePath))
    }
  })
}

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log('zip plugin is executed!')
    const { fileName } = this.options;
    console.log(compiler,'compiler')
    compiler.hooks.done.tapPromise('zip', function (...args) {
      return new Promise((resolve,reject) => {
        console.log(args.callback)
        console.log('zip folder')
        // 读取目录，加入所有的文件和目录
        readDir(zip, compiler.options.output.path)
        // 生成zip文件
        zip.generateAsync({ type: "nodebuffer"}).then(function(content) {
          // see FileSaver.js
          // FileSaver.saveAs(content, fileName);
          fs.writeFileSync(path.join(process.cwd(),fileName), content, "utf-8");
          resolve()
        });
      })
    })
  }
}