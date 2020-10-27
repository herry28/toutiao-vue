/**
 * postcss的配置文件
 * postcss是基于nodejs运行的一个css处理工具，所以它的配置文件也是运行在nodejs中
 */

// postcss的配置文件需要导出一个对象
// module.exports = {
//     配置要使用的相关插件
//     plugins: {
//       自动添加浏览器厂商
//    autoprefixer: {
//     browsers用来配置要兼容到的浏览器环境
//     这个配置没有问题，但写在这里会有控制台的编译警告。
//     因为vue-cli是通过项目中的.browserslistrc文件来配置要兼容的环境信息的
//      browsers: ['Android >= 4.0', 'iOS >= 8'],
//     },

//         //将px转为rem   
//       'postcss-pxtorem': {
//         rootValue: 37.5,
//         propList: ['*'],
//       },
//     },
//   };



module.exports = {
    plugins: {
      'postcss-pxtorem': {
        //   转换的根元素基准值
        rootValue: 37.5,
        // 需要转换的css属性
        propList: ['*'],
      },
    },
  };
