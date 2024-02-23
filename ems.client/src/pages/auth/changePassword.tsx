import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import * as images from "../../assets/images";
import { IChangePasswordContainerDispatch } from "../../interfaces/auth.interface";
import { ChangePasswordPayload } from "store/auth/types";
import { PASSWORD_PATTERN } from "utils/constants";
import { useForm } from "react-hook-form";
import { showLoader } from "utils/helper";
import { get } from "lodash";
import { IApiSuccessResponse, IIndexable } from "interfaces/generic.interface"

export type ChangePasswordProps = IChangePasswordContainerDispatch;

const fieldNames : IIndexable = {
  oldPassword: "Old Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password"
}

export const ChangePasswordForm = (props: ChangePasswordProps) => {
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  interface PasswordVisibility {
    oldPassword: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  }
  const [passwordVisibility, setPasswordVisibility] = React.useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  })
  const togglePasswordVisibility = (fieldName: keyof PasswordVisibility) => {
    setPasswordVisibility((prevState)=>({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }))
  }

  interface IChangePasswordForm{
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IChangePasswordForm>();

  
const maxPasswordLength = 16
  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if(type){
      switch(type){
        case "required":
          return `${fieldNames[fieldName]} is required.`
        case "pattern":
          return `Invalid Password.`
        case "validate":
          switch(fieldName){
            case "newPassword":
              return errors.newPassword?.message || ""
            case "confirmPassword":
              return errors.confirmPassword?.message || ""
          }
          break;
        case "maxLength": 
          return `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
            ${maxPasswordLength}.`;
        default:
          return ""
      }
    }
    return ""
  }
  const getError = (fieldName: string): string => {
    switch(fieldName){
      case "oldPassword":
        return getErrorMessage(fieldName, errors?.oldPassword?.type);
      case "newPassword":
        return getErrorMessage(fieldName, errors?.newPassword?.type);
      case "confirmPassword":
        return getErrorMessage(fieldName, errors?.confirmPassword?.type);
      default:
        return "field cannot be empty";
    }
  }
  
  const bc = new BroadcastChannel("change_password")

  const onChangePasswordSuccess = async (response: IApiSuccessResponse<null>) => {
    bc.postMessage("Change-password successful")
    window.close();
  };
  
  const onModalClose = () => {
    reset();
    window.close();
  };

  const currentUserEmailId = get(props, "userEmailId", "")
  const onSubmit = async (data: IChangePasswordForm) => {
    const { changePasswordRequest } = props;
    if (changePasswordRequest) {
      showLoader();
      const payload: ChangePasswordPayload = {
        values: {
          emailId: currentUserEmailId,
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        },
        callback: onChangePasswordSuccess,
      };
      changePasswordRequest(payload);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        bgcolor="#f5edf4"
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh'}}
      >
      <Box width={500}>
        <Card>
          <CardContent>
            <Typography variant="h2" className="card-heading" mb={2}>
              ChangePassword
            </Typography>
            <div>
              <Grid container rowSpacing={0.1} columnSpacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel
                      htmlFor="password"
                      error={!!errors.oldPassword}
                    >
                      Current Password <span className="color-red">*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="oldPassword"
                      className="with-icon"
                      type={passwordVisibility.oldPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={()=>togglePasswordVisibility("oldPassword")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {passwordVisibility.oldPassword ? (
                              <img
                                src={images.eyeOpen}
                                alt="show"
                              />
                            ) : (
                              <img
                                src={images.eyeClose}
                                alt="hide"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.oldPassword}
                      {...register("oldPassword", {
                        required: true,
                        maxLength: maxPasswordLength,
                        pattern: PASSWORD_PATTERN,
                      })}
                    />
                    {!!errors.oldPassword && (
                      <FormHelperText error>
                        {getError("oldPassword")}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="outlined"  
                    fullWidth
                  >
                    <InputLabel
                      htmlFor="password"
                      error={!!errors.newPassword}
                    >
                      New Password <span className="color-red">*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="newPassword"
                      className="with-icon"
                      type={passwordVisibility.newPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={()=>togglePasswordVisibility("newPassword")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {passwordVisibility.newPassword ? (
                              <img
                                src={images.eyeOpen}
                                alt="show"
                              />
                            ) : (
                              <img
                                src={images.eyeClose}
                                alt="hide"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.newPassword}
                      {...register("newPassword", {
                        required: true,
                        maxLength: maxPasswordLength,
                        pattern: PASSWORD_PATTERN,
                        validate:(value)=>{
                          const [oldPassValue, confirmPassValue] = getValues(["oldPassword", "confirmPassword"])
                          if(value === oldPassValue && value !== confirmPassValue)
                            return `New Password should be different from Current Password and same as Confirm Password.`
                          if(value === oldPassValue)
                            return "New Password should be different from Current Password.";
                          if(value !== confirmPassValue)
                            return "New Password should be same as Confirm Password."
                          return true
                        }
                      })}
                    />
                    {!!errors.newPassword && (
                      <FormHelperText error>
                        {getError("newPassword")}
                      </FormHelperText>
                    )}
                  </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl
                    variant="outlined"  
                    fullWidth
                  >
                    <InputLabel
                      htmlFor="password"
                      error={!!errors.confirmPassword}
                    >
                      Confirm Password <span className="color-red">*</span>
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      className="with-icon"
                      type={passwordVisibility.confirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={()=>togglePasswordVisibility("confirmPassword")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {passwordVisibility.confirmPassword ? (
                              <img
                                src={images.eyeOpen}
                                alt="show"
                              />
                            ) : (
                              <img
                                src={images.eyeClose}
                                alt="hide"
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={!!errors.confirmPassword}
                      {...register("confirmPassword", {
                        required: true,
                        maxLength: maxPasswordLength,
                        pattern: PASSWORD_PATTERN,
                        validate:(value)=>{
                          const [oldPassValue, newPasswordValue] = getValues(["oldPassword", "newPassword"])
                          if(value === oldPassValue && value !== newPasswordValue)
                            return `Confirm Password should be different from Current Password and same as Confirm Password.`
                          if(value === oldPassValue)
                            return "Confirm Password should be different from Current Password";
                          if(value !== newPasswordValue)
                            return "Confirm Password should be same as New Password"
                          return true
                        }
                      })}
                    />
                    {!!errors.confirmPassword && (
                      <FormHelperText error>
                        {getError("confirmPassword")}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Typography color={()=>
                  errors?.oldPassword?.type === "pattern" ||
                  errors?.newPassword?.type === "pattern" ||
                  errors?.confirmPassword?.type === "pattern"
                  ? "red" : "gray"
                }
                m={2}
                >
                  Password must be 8+ characters with a special character,
                  number, and uppercase letter.
                </Typography>
              </Grid>
            </div>
          </CardContent>
          <CardActions>
          <Grid container spacing={2}>
            <Grid item>
            <Button
              type="submit"
              variant="contained"
              title="Login"
              className="login-btn"
              disableElevation
            >
              Change Password
            </Button>
            </Grid>
            <Grid item xl={6} md={6} xs={6}>
              <Button
                variant="outlined"
                className="btn-cancel"
                onClick={onModalClose}
                >
                Cancel
              </Button>
            </Grid>
          </Grid>
          </CardActions>
        </Card>
      </Box>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
