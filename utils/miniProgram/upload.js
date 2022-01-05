
const ci = require('miniprogram-ci');
const path = require("path");
(async () => {
    const appid='wx43970f2914c69223';
    const project = new ci.Project({
        appid,
        type: 'miniProgram',
        projectPath: path.resolve(__dirname,'../dist/dev/mp-weixin'),
        privateKeyPath: path.resolve(__dirname,`./private.${appid}.key`),
        ignores: ['node_modules/**/*'],
    });
    const uploadResult = await ci.upload({
        project,
        version:'1.0',  // 版本号
        desc:'我要备注',  // 自定义备注
        setting: {
            es6: true,
        },
        onProgressUpdate: console.log,
    }).then(()=>{
        console.log('上传成功')
    });
    console.log(uploadResult);
})();