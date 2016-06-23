import React, { Component } from 'react';
import{
  AppRegistry,
  Platform,
  StyleSheet,
  Navigator,
  BackAndroid,
  ToastAndroid,
  View
} from 'react-native';

import TabbarView from './TabbarView'
import PushNotificationControler from './PushNotificationControler'



export default class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
     BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);

  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.onBackPressed);
  }

  onReceiveMessage(message) {

  }
  onOpenMessage(message) {
  }

  onBackAndroid = () => {
   if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
     //最近2秒内按过back键，可以退出应用。
     return false;
   }

   const nav = this.navigator;
    const routers = nav.getCurrentRoutes();
    if (routers.length > 1) {
      const top = routers[routers.length - 1];
      if (top.ignoreBack || top.component.ignoreBack){
        // 路由或组件上决定这个界面忽略back键
        return true;
      }
      const handleBack = top.handleBack || top.component.handleBack;
      if (handleBack) {
        // 路由或组件上决定这个界面自行处理back键
        return handleBack();
      }
      // 默认行为： 退出当前界面。
      nav.pop();
      return true;
    }else {
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
      return true;
    }
 };
  /**
 * 配置场景动画
 * @param route 路由
 * @param routeStack 路由栈
 * @returns {*} 动画
 */
  configureScene(route, routeStack) {
    if (route.name === 'buttom') {
      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
    }
    return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  }
  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
         ref={nav => { this.navigator = nav; }}
          style={{flex:1}}
          initialRoute={{component: TabbarView}}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
         />
         <PushNotificationControler onReceiveMessage={this.onReceiveMessage.bind(this)} />
       </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
