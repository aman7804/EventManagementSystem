import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useState } from 'react'

interface ICheckBoxProps{
    label: string,
    isChecked: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

const CheckBox = (props: ICheckBoxProps) => {
    const {label, isChecked, onChange} = props;
    const [IsChecked, setIsChecked] = useState<boolean>(isChecked)

  return (
    <>
    <FormControlLabel
        control={
            <Checkbox
                checked={IsChecked}
                onChange={(e,checked)=>{
                    setIsChecked(checked);
                    if(onChange) onChange(e,checked);   
                }}
            />
        }
        label={label}   
    />
    </>
  )
}

export default CheckBox
