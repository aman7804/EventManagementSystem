import React from 'react';
import { NumericFormat } from 'react-number-format';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const prefix = "₹"
  
export const removeNumberFormatting = (value: string): Number => {
  const prefixRegex = new RegExp(prefix, "g");
  value = value.replace(prefixRegex, "").replace(/,/g, "");
  return parseFloat(value);
}

const NumericFormControl: React.FC<CustomProps> = (props) => {
  const { onChange, ...other } = props;
  return (
    <NumericFormat
      {...other}
      thousandSeparator
      onValueChange={(values)=>{
        onChange({
          target:{
            name: props.name, 
            value: values.floatValue?.toString() || ""
          }
        })
      }}
      prefix={prefix}
    />
  );
};



export default NumericFormControl;