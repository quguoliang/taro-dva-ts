/*
 * @file:
 * @author: quguoliang
 * @Date: 2020-04-29 13:39:28
 * @LastEditors: quguoliang
 * @LastEditTime: 2020-04-29 18:48:59
 */

/**
 * pages模版快速生成脚本,执行命令 yarn run temp `文件名`
 */
// eslint-disable-next-line import/no-commonjs
const fs = require('fs');

const dirName = process.argv[2];
if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('yarn run temp test');
  process.exit(0);
}
// 页面模版
const indexTep = `import Taro,{ useEffect, useState } from '@tarojs/taro';
import { View,Text } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { IStateMap } from '../../models/stateType'

const ${titleCase(dirName)} = props =>{
  const dispatch = useDispatch()
  const stateData = useSelector((state:IStateMap)=>state.${dirName})

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <View className="${dirName}-page">
      <Text>${dirName}页面</Text>
    </View>
  )
}
${titleCase(dirName)}.config = {
  navigationBarTitleText: '${dirName}'
}
//全局样式继承 你可以关掉
${titleCase(dirName)}.options = {
  addGlobalClass: true
}
export default ${titleCase(dirName)}
`;
// less文件模版
const scssTep = `
.${dirName}-page {
}
`;

// model文件模版
const modelTep = `import * as ${dirName}Api from './service';

export interface I${dirName}State{}

export const ${dirName}State:I${dirName}State = {}

export default {
  namespace: '${dirName}',
  state: ${dirName}State,
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *effectsDemo({payload}, { call, put }) {
      const { status, data } = yield call(${dirName}Api.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },
};
`;

// service页面模版
const serviceTep = `import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};
export default {
  demo
};
`;

//增加state类型
const data = fs.readFileSync(`./src/models/stateType.ts`, 'utf8').split('\n');
const dataJson = data.join('\n');
const pageJson =
  `import { ${dirName}State } from '../pages/${dirName}/model'` +
  '\n' +
  dataJson.substring(0, dataJson.lastIndexOf('}') - 1) +
  ',' +
  '\n' +
  `    ${dirName}:${dirName}State` +
  '\n' +
  dataJson.substring(dataJson.lastIndexOf('}'));
fs.writeFileSync(`./src/models/stateType.ts`, pageJson, 'utf8');

const dataModel = fs.readFileSync(`./src/models/models.ts`, 'utf8').split('\n');
const dataJsonstr = dataModel.join('\n');

const dataJsonModel =
  `import ${dirName} from '../pages/${dirName}/model'` +
  '\n' +
  dataJsonstr.substring(0, dataJsonstr.indexOf(']')) +
  ',' +
  `${dirName}` +
  dataJsonstr.substring(dataJsonstr.indexOf(']'));
fs.writeFileSync(`./src/models/models.ts`, dataJsonModel, 'utf8');

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.tsx', indexTep);
fs.writeFileSync('index.scss', scssTep);
fs.writeFileSync('model.ts', modelTep);
fs.writeFileSync('service.ts', serviceTep);

console.log(`\033[42;30m \033[40;32m ✅ 模版${dirName}已创建成功\033[0m`);

function titleCase(str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}
process.exit(0);
