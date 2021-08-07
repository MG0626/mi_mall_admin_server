// 导入腾讯云对象存储sdk
const COS = require('cos-nodejs-sdk-v5');
// 初始化
const cos = new COS({
  SecretId: 'AKIDym0yht1aEclGUSv4ZnlUs0rlPoxnDjtm',
  SecretKey: 'oNgifSzHIjwtcEenmHaeSP7am7ewylIa',
});

// 上传头像
const uploadAvatar = (file) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'mi-1251573291' /* 必须 */,
        Region: 'ap-guangzhou' /* 必须 */,
        Key: 'avatar/' + file.originalname /* 必须 */,
        Body: file.buffer /* 必须 */,
      },
      function (err, data) {
        resolve(data) || reject(err);
      },
    );
  });
};

// 上传商品图片
const uploadImages = (file, path) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'mi-1251573291' /* 必须 */,
        Region: 'ap-guangzhou' /* 必须 */,
        Key: `goods/${path}/${file.originalname}` /* 必须 */,
        Body: file.buffer /* 必须 */,
      },
      function (err, data) {
        resolve(data) || reject(err);
      },
    );
  });
};

// 上传商品描述图片
const uploadDescImages = (file, path) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'mi-1251573291' /* 必须 */,
        Region: 'ap-guangzhou' /* 必须 */,
        Key: `goods/${path}/desc/${file.originalname}` /* 必须 */,
        Body: file.buffer /* 必须 */,
      },
      function (err, data) {
        resolve(data) || reject(err);
      },
    );
  });
};

// 首页推广图片上传
const uploadAdvertisingImage = (file) => {
  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: 'mi-1251573291' /* 必须 */,
        Region: 'ap-guangzhou' /* 必须 */,
        Key: `advertising/${file.originalname}` /* 必须 */,
        Body: file.buffer /* 必须 */,
      },
      function (err, data) {
        resolve(data) || reject(err);
      },
    );
  });
}

module.exports = {
  uploadAvatar,
  uploadImages,
  uploadDescImages,
  uploadAdvertisingImage
}
