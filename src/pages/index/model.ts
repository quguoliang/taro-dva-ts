/*
 * @file:
 * @author: quguoliang
 * @Date: 2020-04-29 15:25:50
 * @LastEditors: quguoliang
 * @LastEditTime: 2020-04-29 18:51:03
 */
import * as indexApi from './service';

export interface IindexState {}

export const indexState: IindexState = {};

export default {
  namespace: 'index',
  state: indexState,
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {
    *effectsDemo({ payload }, { call, put }) {
      const { status, data } = yield call(indexApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data
          }
        });
      }
    }
  }
};
