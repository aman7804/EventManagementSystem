import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { saveIcon } from "assets/images";
import { useForm } from "react-hook-form";
import { IUser } from "interfaces/user.interface";
import { useEffect, useState } from "react";
import { CustomNumericFormatProps } from "components/elements/NumericFormControl";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";
import { EMAIL_PATTERN, MOBILE_PATTERN, PASSWORD_PATTERN } from "utils/constants";

interface IAddEditUserProps {
  isEditUser: boolean;
  showScreen: boolean;
  handleUserClose: any;
  handleSaveUser: any;
  currentUserData?: IUser;
}

export interface IIndexable {
  [key: string]: any;
}

const fieldNames: IIndexable = {
  firstName: "User First-Name",
  lastName: "User Last-Name",
  emailId: "User EmailId",
  mobileNo: "User Mobile Number",
  password: "User Password",
  address: "User Address",
};

const CustomMobileComponent = React.forwardRef<
  NumericFormatProps,
  CustomNumericFormatProps
>((props, ref) => {
  const { onChange } = props;
  return (
    <NumericFormat
      {...props}
      getInputRef={ref}
      allowNegative={false}
      decimalScale={0}
      name={props.name}
      onChange={onChange}
    />
  );
});

const AddEditUser: React.FC<IAddEditUserProps> = ({
  isEditUser,
  showScreen,
  handleUserClose,
  handleSaveUser,
  currentUserData,
}) => {
  const maxFirstNameLength = 50;
  const maxLastNameLength = 50;
  const maxEmailIdLength = 256;
  const maxPasswordLength = 256;
  const maxAddressLength = 500;
  const [mobileNoValue, setMobileNoValue] = useState(currentUserData?.mobileNo);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IUser>();

  const onModalClose = () => {
    reset();
    handleUserClose();
  };

  const getErrorMessage = (
    fieldName: string,
    type: string | undefined
  ): string => {
    if (type) {
      switch (type) {
        case "required":
          return `${fieldNames[fieldName]} is required.`;
        case "maxLength":
          switch (fieldName) {
            case "firstName":
              return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
                  ${maxFirstNameLength}.`;
            case "lastName":
              return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
                  ${maxLastNameLength}.`;
            case "address":
              return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
                  ${maxAddressLength}.`;
            case "emailId":
              return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
                  ${maxEmailIdLength}.`;
            case "password":
              return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
                  ${maxPasswordLength}.`;
          }
          break;
        case "min":
          return `${fieldNames[fieldName]} cannot be less than Minimum Capacity.`;
        case "max":
          return `${fieldNames[fieldName]} cannot be more than Maximum Capacity.`;
        case "pattern":
          return `Invalid ${(fieldNames[fieldName]).toLowerCase()}`;
        default:
          return "";
      }
    }
    return "";
  };

  const getError = (fieldName: string): string => {
    switch (fieldName) {
      case "firstName":
        return getErrorMessage(fieldName, errors.firstName?.type);
      case "address":
        return getErrorMessage(fieldName, errors.address?.type);
      case "lastName":
        return getErrorMessage(fieldName, errors.lastName?.type);
      case "emailId":
        return getErrorMessage(fieldName, errors.emailId?.type);
      case "cityId":
        return getErrorMessage(fieldName, errors.cityId?.type);
      case "password":
        return getErrorMessage(fieldName, errors.password?.type);
      case "mobileNo":
        return getErrorMessage(fieldName, errors.mobileNo?.type);
      default:
        return "field cannot be empty";
    }
  };

  useEffect(() => {
    reset(currentUserData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditUser, setValue, showScreen, currentUserData]);

  const beginSubmit = (data: any) => {
    handleSaveUser(data);
  };
  return (
    <Grid
      container
      spacing={{ xs: "16px", lg: "20px", xl: "24px" }}
      className="content-container"
    >
      <Grid item xs={12}>
        <Card>
          <Box className="content-header">
            <Typography variant="h4">
              {isEditUser ? "Edit User" : "Add User"}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(beginSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  id="name"
                  label={
                    <>
                      FirstName <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={!!errors.firstName}
                  helperText={getError("firstName")}
                  {...register("firstName", {
                    required: true,
                    maxLength: maxFirstNameLength,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  id="name"
                  label={
                    <>
                      LastName <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={!!errors.lastName}
                  helperText={getError("lastName")}
                  {...register("lastName", {
                    required: true,
                    maxLength: maxLastNameLength,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={12} xl={12}>
                <TextField
                  id="address"
                  label={
                    <>
                      Address <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={!!errors.address}
                  helperText={getError("address")}
                  {...register("address", {
                    required: true,
                    maxLength: maxAddressLength,
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                  id="emailId"
                  label={
                    <>
                      Email <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={!!errors.emailId}
                  helperText={getError("emailId")}
                  {...register("emailId", {
                    required: true,
                    pattern: EMAIL_PATTERN,
                  })}
                />
              </Grid>
              {!isEditUser && (
                <Grid item xs={12} xl={6} md={6}>
                  <TextField
                    id="password"
                    label={
                      <>
                        Password <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"
                    error={!!errors.password}
                    helperText={getError("password")}
                    {...register("password", {
                      required: true,
                      pattern: PASSWORD_PATTERN,
                    })}
                  />
                </Grid>
              )}
              <Grid item xs={12} xl={6} md={6}>
                <TextField
                  id="mobileNo"
                  label="Mobile"
                  fullWidth
                  variant="outlined"
                  error={!!errors.mobileNo}
                  helperText={getError("mobileNo")}
                  {...register("mobileNo", {
                    pattern: MOBILE_PATTERN,
                  })}
                  value={isEditUser ? mobileNoValue : undefined } 
                  onBlur={(e) => {
                    if (e.target.value === '')
                      setMobileNoValue(undefined)
                    else 
                      setMobileNoValue(e.target.value)
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment sx={{marginLeft: 2}} position="start">
                        +91
                      </InputAdornment>
                    ),
                    inputComponent: CustomMobileComponent as any,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" className="btn-save" type="submit">
                  <img src={saveIcon} alt="save" />
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  className="btn-cancel"
                  onClick={onModalClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddEditUser;
