import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { IKeyValuePair } from "interfaces/generic.interface";
import { useState } from "react";


interface IDropDownProps {
  key?: string
  list: IKeyValuePair[] |undefined | null
  label: string
  value: number | undefined
  onChange?: (e: SelectChangeEvent) => void,
  error: boolean | undefined
  helperText: string | undefined
}

const DropDownSelect = (props: IDropDownProps) => {
  const {key, label, onChange, value, list, helperText, error} = props;
  const [selectedValue,setSelectedValue] = useState<string|undefined>(value?.toString() || "");

  console.log("dropDownComp",list)
  return (
    <>
      <FormControl fullWidth error={error}>
        <InputLabel id={key || `dropdown${label.replaceAll(" ", "_")}`}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Age"
          onChange={(e) => {
            setSelectedValue(e.target.value);
            if (onChange) onChange(e);
          }}
        >
          {list?.map((item) => 
              <MenuItem value={item.id}>{item.name}</MenuItem>
          )}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  )
}

export default DropDownSelect;