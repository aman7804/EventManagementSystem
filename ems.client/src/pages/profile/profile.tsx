import {
  Box,
  Button,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { CustomNumericFormatProps } from "components/elements/NumericFormControl";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";
import { MOBILE_PATTERN } from "utils/constants";
import {IApiSuccessResponse, SaveRequestPayload, IIndexable} from "interfaces/generic.interface"
import { IProfile, IProfileContainerDispatch, IProfileContainerState } from "interfaces/profile.interface";
import { saveIcon } from "assets/images";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showLoader } from "utils/helper";

export type ProfileProps = IProfileContainerState &
  IProfileContainerDispatch;

const fieldNames: IIndexable = {
  firstName: "First-Name",
  lastName: "Last-Name",
  emailId: "EmailId",
  mobileNo: "Mobile Number",
  password: "Password",
  address: "Address",
};

export const CustomMobileComponent = React.forwardRef<
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

const ProfileComponent: React.FC<ProfileProps> = ({
  getRequest, updateRequest, profile, pending
}) => {
  const navigate = useNavigate() ;

  const maxFirstNameLength = 50;
  const maxLastNameLength = 50;
  const maxPasswordLength = 256;
  const maxAddressLength = 500; 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfile>();

  useEffect(() => {
    showLoader();
    getRequest(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(()=>{
    if(profile) reset(profile)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[profile])


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
      case "lastName":
        return getErrorMessage(fieldName, errors.lastName?.type);
      case "address":
        return getErrorMessage(fieldName, errors.address?.type);
      case "mobileNo":
        return getErrorMessage(fieldName, errors.mobileNo?.type);
      default:
        return "field cannot be empty";
    }
  };

  const onUpdateProfile = (response: IApiSuccessResponse<IProfile>) => {
    toast.success("Profile  Updated Successfully");
  }
  const onProfileClose = () => {
    navigate("/")
  }

  const beginSubmit = (formData: IProfile) => {
    const payload: SaveRequestPayload<IProfile> = {
      data: {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.emailId,
        mobileNo: formData.mobileNo,
        address: formData.address,
      },
      callback: onUpdateProfile
    }
    updateRequest(payload);
  }
  
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
              Profile
            </Typography>
          </Box>
          {!pending &&
          <form onSubmit={handleSubmit(beginSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} xl={6}>
                <TextField
                id="firstName"
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
                  id="lastName"
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
                  value={!pending ? profile?.emailId : undefined}
                  variant="outlined"
                  multiline
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
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
                  value={profile?.mobileNo || undefined} 
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
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  className="btn-cancel"
                  onClick={onProfileClose}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </form>
          }
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileComponent;
