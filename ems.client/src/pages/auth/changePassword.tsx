import {
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
import React, { useEffect, useState } from "react";
import * as images from "../../assets/images";
import { IChangePassword, IChangePasswordContainerDispatch } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
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
  newPassword: "New Password"
}

export const ChangePasswordForm = (props: ChangePasswordProps) => {

  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IChangePassword>();

  useEffect(() => {
    AOS.init({
      easing: "ease-in",
      duration: 400,
      once: true,
    });
    AOS.refresh();
  }, []);

const maxPasswordLength = 16
  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if(type){
      switch(type){
        case "required":
          return `${fieldNames[fieldName]} is required.`
        case "pattern":
          return `Invalid Password.`
        case "validate":
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
  const onSubmit = async (data: IChangePassword) => {
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
  console.log(errors)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="login-wrapper">
        <Grid container className="login-container">
          <Grid xs={12} sm="auto">
            <a
              data-aos="fade-right"
              data-aos-delay="300"
              href="/"
              title="Event Management System"
              className="login-logo"
            >
              <img src={images.loginLogo} alt="Event Management System" />
            </a>
          </Grid>
          <Grid xs={12} sm="auto">
            <Card
              className="login-card"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <CardContent>
                <Typography variant="h2" className="card-heading">
                  ChangePassword
                </Typography>
                <div className="login-content-form">
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
                          Old Password <span className="color-red">*</span>
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
                            validate:(value)=>
                              value === getValues("oldPassword")
                                ? false : true
                          })}
                        />
                        {!!errors.newPassword && (
                          <FormHelperText error>
                            {getError("newPassword")}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Typography color={()=>{
                        const isNewPassValid = errors?.newPassword?.type === "pattern";
                        const isOldPassValid = errors?.oldPassword?.type === "pattern";
                        return isNewPassValid || isOldPassValid
                        ? "red" : "gray"
                      }
                      }
                      m={2}
                      >
                        Password must be 8+ characters with a special character,
                        number, and uppercase letter.
                      </Typography>
                    </Grid>
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
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
