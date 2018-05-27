var express = require('express')
var config = require ('./config/index')
var port = process.env.PORT || config.env.PORT
var app =express ()
var router = express.router()
router.get ('/',function (req, res, next){
    req.url = '/index.html'
    next()
})
app.use(router)
var appData = require('./data.json')  // 你的本地数据路径

var ratings = appData.ratings
var goods = appData.goods
var seller = appData.seller
var apiRoutes = express.Router() //路由
app.use('/api', apiRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
devServer: {
    before(app) {
          app.get('/api/seller', function(req, res)  {
            res.json({
            errno:0,
            data:seller
            })
          }),
          app.get('/api/goods', (req, res) => {
            res.json({
              errno:0,
              data:goods
            })
          }),
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno:0,
          data:ratings
        })
      })
    }
}