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
import { IChangePassword, IChangePasswordContainerDispatch } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router";
import { ChangePasswordPayload, LoginSuccessPayload } from "store/auth/types";
import { toast } from "react-toastify";
import { PASSWORD_PATTERN } from "utils/constants";
import { useForm } from "react-hook-form";
import { showLoader } from "utils/helper";
import { IIndexable } from "components/venue.create";
import { get } from "lodash";

export type ChangePasswordProps = IChangePasswordContainerDispatch;

const fieldNames : IIndexable = {
  oldPassword: "Old Password",
  newPassword: "New Password",
  confirmPassword: "Confirm Password"
}

export const ChangePasswordForm = (props: ChangePasswordProps) => {

  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

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
          return "Password must be different from older"
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

  const onChangePasswordSuccess = async (response: LoginSuccessPayload) => {
    navigate("/");
    toast.success("ChangePassword successful");
  };
  
  const onModalClose = () => {
    reset();
    navigate("/dashboard")
  };

  const currentUserEmailId = get(props, "user.emailId", "")
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
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh'
        // , minWidth: '100vh'
      }}
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
                      type={showOldPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {showOldPassword ? (
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
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {showNewPassword ? (
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
                          if(value === getValues("oldPassword"))
                            return "New Password should be different from Current Password";
                          if(value !== getValues("confirmPassword"))
                            return "New Password should be same as Confirm Password"
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
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disableFocusRipple
                            disableRipple
                          >
                            {showConfirmPassword ? (
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
                          if(value === getValues("oldPassword"))
                            return "Confirm Password should be different from Current Password";
                          if(value !== getValues("newPassword"))
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
                  errors?.newPassword?.type !== "pattern" &&
                  errors?.oldPassword?.type !== "pattern"
                  ? "gray" : "red"
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
