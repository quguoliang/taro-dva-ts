/*
 * @file:
 * @author: quguoliang
 * @Date: 2020-04-29 13:33:11
 * @LastEditors: quguoliang
 * @LastEditTime: 2020-04-29 18:49:27
 */
import { create } from 'dva-core';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

let app;
let store;
let dispatch;

function createApp(opt) {
  // redux日志
  opt.onAction = [createLogger()];
  app = create(opt);
  app.use(createLoading({}));

  //   if (!global.registered){
  opt.models.forEach((model) => {
    app.model(model);
  });
  //   }else{
  //     global.registered = true;
  //   }

  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}
export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  }
};
