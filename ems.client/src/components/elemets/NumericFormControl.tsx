import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface CustomProps extends NumericFormatProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const prefix = "₹"
  
export const removeNumberFormatting = (value: string): Number => {
  const prefixRegex = new RegExp(prefix, "g");
  value = value.replace(prefixRegex, "").replace(/,/g, "");
  return parseFloat(value);
}

const NumericFormControl = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        allowNegative={false}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue?.toString() || "",
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix={prefix}
      />
    );
  },
);



export default NumericFormControl;