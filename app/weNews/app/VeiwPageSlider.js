import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import Image from 'react-native-image-progress';
import ViewPager from 'react-native-viewpager';
//var ViewPager = require('./ViewPager');
var deviceWidth = Dimensions.get('window').width;

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
       return (<ViewPager 
                    style={this.props.style}
                    dataSource={this.rowSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}
                 />)

    }

    // render every page
    _renderPage(pageData){
        return (<Image
                    source={{uri: pageData}}
                    style={styles.page}
                />)        
    }


}


var styles = StyleSheet.create({
  page: {
    width: deviceWidth,
  },
});
