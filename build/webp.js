const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const crypto = require('node:crypto');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

const webpConfig = {
  entry: path.resolve(__dirname, '../src/assets/images'),
  output: path.resolve(__dirname, '../cache-webp'),
  hashPath: path.resolve(__dirname, '../cache-webp/hash.json'),
  rule: /\.(png|jpe?g|gif|webp)$/
}

// 获取文件hash
const getFileHash = (localPath) => {
  const fsHash = crypto.createHash('md5');
  // 读取一个Buffer
  const buffer = fs.readFileSync(localPath)
  fsHash.update(buffer);
  const md5 = fsHash.digest('hex');
  return md5;
}

/**
 * 获取/生成并获取hash.json文件
 * @returns {any}
 */
const getHashJson = () => {
  const hashPath = webpConfig.hashPath
  const isHashJson = fs.pathExistsSync(hashPath)
  const initJson = { };
  if (!isHashJson) {
    fs.ensureFileSync(hashPath)
    fs.writeJsonSync(hashPath, initJson, { spaces: 2 });
  }
  const hashJson = fs.readJsonSync(hashPath);
  return hashJson
}
/**
 * 获取绝对路径兼容Linux与Windows
 * @param filePath
 */
function getPath (filePath) {
  return filePath.split(path.sep).join('/')
}

async function webp () {
  const entryPath = getPath(webpConfig.entry)
  const outputPath = getPath(webpConfig.output)
  const imageDataList = glob.sync(`${entryPath}/**/*.@(png|jpg|jpeg|gif|webp)`);
  const hashJson = getHashJson()
  const allLength = imageDataList.length
  const createImgHashJson = {}
  // 文件名称检查
  const nonComplianceImageNameList = imageDataList.filter(filePath => {
    const fileName = path.parse(filePath).name;
    return !fileName.match(/^[a-z0-9_\-@\(\)]+$/i);
  })

  if(nonComplianceImageNameList.length) {
    throw new Error(`${nonComplianceImageNameList.join(',')}名字不符合规则, 不能含有特殊字符如空格`)
  }
  imageDataList.map(path => {
    const fileHash = getFileHash(path)
    // 判断hash存在或者文件有变更
    if (!hashJson[path] || hashJson[path] !== fileHash) {
      createImgHashJson[path] = fileHash
    }
  })
  const createImgArr = Object.keys(createImgHashJson)
  console.log('总文件数:' + allLength)
  console.log('待生成文件数:' + createImgArr.length)
  console.time('webp图片转换耗时')
  if (createImgArr.length > 0) {
    const res = await imagemin(createImgArr, {
      plugins: [
        imageminWebp({ quality: 50 })
      ]
    })
    createImgArr.map((path, index) => {
      const outputImgPath = path.replace(entryPath, outputPath).replace(webpConfig.rule, '.' + createImgHashJson[path] + '.webp')
      fs.ensureFileSync(outputImgPath)
      fs.writeFileSync(outputImgPath, res[index].data)
    })
    console.timeEnd('webp图片转换耗时')
    fs.writeJsonSync(webpConfig.hashPath, Object.assign(hashJson, createImgHashJson), { spaces: 2 })
  }
}
module.exports = {
  webpConfig, getFileHash, getHashJson, getPath, webp
}