'use strict';


import React from 'react';
let { View, StyleSheet, TextInput, Text, DatePickerAndroid} = require('react-native');
import {Field} from './Field';


  export class DatePickerComponent extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        date: props.date? new Date(props.date) :'',
        isPickerVisible: false
      }

    }

    handleLayoutChange(e){
      let {x, y, width, height} = {... e.nativeEvent.layout};

      this.setState(e.nativeEvent.layout);
      //e.nativeEvent.layout: {x, y, width, height}}}.
    }

    handleValueChange(date){

      this.setState({date:date});

      if(this.props.onChange)      this.props.onChange((this.props.prettyPrint)?this.props.dateTimeFormat(date):date);
      if(this.props.onValueChange) this.props.onValueChange(date);
    }
    setDate(date){
      this.setState({date:date});
      if(this.props.onChange)      this.props.onChange((this.props.prettyPrint)?this.props.dateTimeFormat(date):date);
      if(this.props.onValueChange) this.props.onValueChange(date);
    }


//      this.refs.picker.measure(this.getPickerLayout.bind(this));


    async _togglePicker(event){
      try {

        const {action, year, month, day} = await DatePickerAndroid.open({
          date: this.props.date || new Date(),
	  minDate:this.props.minimumDate,

          maxDate:this.props.maximumDate
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          this.handleValueChange(new Date(year,month,day));
          // Selected year, month (0-11), day
        }
      } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
      }
      this.props.onPress && this.props.onPress(event);
    }
    
    render(){
      let placeholderComponent = (this.props.placeholderComponent)
                        ? this.props.placeholderComponent
                        : <Text style={this.props.placeholderStyle}>{this.props.placeholder}</Text>
      return(<View><Field
        {...this.props}
        ref='inputBox'
        onPress={this._togglePicker.bind(this)}>
        <View style={this.props.containerStyle}
          onLayout={this.handleLayoutChange.bind(this)}>
		  {(this.props.iconLeft)
            ? this.props.iconLeft
            : null
          }
          {placeholderComponent}
          <View style={this.props.valueContainerStyle}>
            <Text style={this.props.valueStyle}>{
            (this.state.date)?this.state.date.toLocaleDateString():""
          }</Text>


          </View>
		  {(this.props.iconRight)
              ? this.props.iconRight
              : null
          }
        </View>
        </Field>
        {(this.state.isPickerVisible)?
          <DatePickerAndroid
            {...this.props}
           date={this.state.date || new Date()}

           onDateChange={this.handleValueChange.bind(this)}
         />

        : null
      }

    </View>
      )
    }

  }

  DatePickerComponent.propTypes = {
    dateTimeFormat: React.PropTypes.func
  }

  DatePickerComponent.defaultProps = {
    dateTimeFormat: (date)=>{
      if(!date) return "";
      return date.toLocaleDateString()
    }
  };
