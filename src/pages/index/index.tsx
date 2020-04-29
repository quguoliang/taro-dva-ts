import Taro, { useEffect, useState } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import './index.scss';
import { IStateMap } from '../../models/stateType';

const Index = (props) => {
  const dispatch = useDispatch();
  const stateData = useSelector((state: IStateMap) => state.index);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <View className="index-page">
      <Text>正如你所见这是你的index页面</Text>
    </View>
  );
};

Index.config = {
  navigationBarTitleText: 'index'
};
//全局样式继承 你可以关掉
Index.options = {
  addGlobalClass: true
};
export default Index;
