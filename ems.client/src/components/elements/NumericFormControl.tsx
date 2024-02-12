import React, { useState } from 'react';
import { NumberFormatValues, NumericFormat, NumericFormatProps } from 'react-number-format';

export interface CustomNumericFormatProps extends NumericFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  min: number | undefined
  max: number | undefined
}
const prefix = "₹"
  
export const removeNumberFormatting = (value: string): Number => {
  const prefixRegex = new RegExp(prefix, "g");
  value = value.replace(prefixRegex, "").replace(/,/g, "");
  return parseFloat(value);
}

const NumericFormControl = React.forwardRef<NumericFormatProps, CustomNumericFormatProps>(
  (props, ref) => {
    const { onChange, value, ...other } = props;
    const [ numericValue, setNumericValue] = useState<Number | undefined>(Number(value))
    
    const isAllowed  = (values: NumberFormatValues)   => {
      const {floatValue} = values;
      if (!floatValue) return true;

      const {min, max} = props;
      if (min && min > floatValue) return false;
      if (max && max < floatValue) return false
      return true;
    }
    return (
      <NumericFormat
        {...other}
        allowNegative={false}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue?.toString() || "",
            },
          });
          setNumericValue(values.floatValue);
        }}
        isAllowed={isAllowed}
        thousandSeparator
        valueIsNumericString
        value={numericValue?.toString()}
        prefix={prefix}
      />
    );
  }
)


export default NumericFormControl;