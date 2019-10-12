module.exports = {
  plugins: [
    require('autoprefixer')({
      "overrideBrowserslist": [   //webpack4必须写上这个，不然不回家浏览器前缀
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
}