require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;
const app = new Koa();
const router = new Router();

import * as usersCtrl from './users.ctrl';
import share from './share';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

router.get('/', (ctx) => {
  ctx.body = '홈';
});
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.register);
router.get('/shop', usersCtrl.shop);

// 라우터 설정
router.use('/share', share.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT가 지정되어 있지 않으면 3100을 적용
const port = PORT || 3100;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});

export default router;
