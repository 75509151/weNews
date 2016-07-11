import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Image from 'react-native-image-progress';
import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;
debugger;
var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

export default class  VeiwPageSlider extends Component {
    constructor(props, context) {
        super(props, context);
        this.rowSource = new ViewPager.DataSource({
                            pageHasChanged: (p1, p2) => p1 !== p2,
                            }).cloneWithPages(IMGS);
    }

    render(){
       return (
              <View>
                    <ViewPager 
                          style={styles.page}
                          dataSource={this.rowSource}
                          renderPage={this._renderPage}
                          isLoop={true}
                          autoPlay={true}
                      />
                </View>)
    }

    // render every page
    _renderPage(pageData,pageId){
        return ( <TouchableOpacity style={{flex: 1}}>
        <Image
          source={{uri: pageData}}
          style={styles.headerItem} >
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}
              numberOfLines={2}>
              {'this is a tessst'+pageId}
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
      )        



    }


}


var styles = StyleSheet.create({
  page: {
    height: 200,
 
  },
  headerPager: {
    height: 200,
  },
  headerItem: {
    flex:1,
    height: 200,
    flexDirection: 'row',
  },
  headerTitleContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
});
