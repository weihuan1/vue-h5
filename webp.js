const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const crypto = require('node:crypto');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

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
 * @param filePath
 * @returns {any}
 */
const getHashJson = (filePath) => {
  const hashPath = filePath + '/hash.json'
  const isHashJson = fs.pathExistsSync(hashPath)
  const initJson = { };
  if (!isHashJson) {
    fs.ensureFileSync(hashPath)
    fs.writeJsonSync(hashPath, initJson, { spaces: 2 });
  }
  const hashJson = fs.readJsonSync(hashPath);
  return hashJson
}


const webp = async (entryPath, outputPath = './cache-webp') => {
  const imageDataList = glob.sync(`${entryPath}/**/*.@(jpg|png|jpeg)`);
  const hashJson = getHashJson(outputPath)
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
  if (createImgArr.length > 0) {
    const res = await imagemin(createImgArr, {
      plugins: [
        imageminWebp({ quality: 50 })
      ]
    })
    createImgArr.map((path, index) => {
      const outputImgPath = path.replace(entryPath, outputPath).replace(/(.png)|(.jpg)|(.jpeg)/, '.' + createImgHashJson[path] + '.webp')
      fs.ensureFileSync(outputImgPath)
      fs.writeFileSync(outputImgPath, res[index].data)
    })
    fs.writeJsonSync(outputPath + '/hash.json', Object.assign(hashJson, createImgHashJson), { spaces: 2 })
  }
  
  console.log('总文件数:' + allLength)
  console.log('待生成文件数:' + createImgArr.length)
}

webp('./src/assets/images')