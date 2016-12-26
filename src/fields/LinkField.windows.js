'use strict';

import React from 'react';
let { View, StyleSheet, TextInput, Text} = require('react-native');
import {LinkComponent} from '../lib/LinkComponent';


export class LinkField extends React.Component{
  render(){
    return(<LinkComponent
       {...this.props}
       labelStyle={this.props.labelStyle}
       containerStyle={this.props.containerStyle}
       />
      )
}

}
