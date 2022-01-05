const project = process.env.NODE_ENV === 'pro' ? 'dist/pro/mp-weixin' : 'dist/dev/mp-weixin';
const miniProgram = {
    appid: 'wx43970f2914c69223',
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, '../dist/dev/mp-weixin'),
    privateKeyPath: path.resolve(__dirname, `./private.${appid}.key`),
    ignores: ['node_modules/**/*'],
};

export default miniProgram