import { TextField, TextFieldProps } from '@mui/material'

const ReadonlyTextfield = (props: TextFieldProps) => {
  return <TextField
            {...props}
            inputProps={{
              style:{color:"gray"},
              readOnly: true
            }}
          />   
}

export default ReadonlyTextfield
