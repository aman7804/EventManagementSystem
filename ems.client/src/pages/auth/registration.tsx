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
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect } from "react";
import * as images from "../../assets/images";
import { IRegistration, IRegistrationContainerDispatch } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { LoginSuccessPayload } from "store/auth/types";
import { toast } from "react-toastify";
import { EMAIL_PATTERN, MOBILE_NO, PASSWORD_PATTERN } from "utils/constants";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"

export type RegistrationProps = IRegistrationContainerDispatch;

export const RegistrationForm = (props: RegistrationProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistration>();

  useEffect(() => {
    AOS.init({
      easing: "ease-in",
      duration: 400,
      once: true,
    });
    AOS.refresh();
  }, []);

  const getEmailError = (): string => {
    if (errors.emailId) {
      if (errors.emailId.type === "required") {
        return "Email is required";
      }
      if (errors.emailId.type === "pattern") {
        return "Enter valid email";
      }
    }
    return "";
  };

  const getUserNameError = (): string => {
    if (errors.firstName) {
      if (errors.firstName.type === "required")
        return "FirstName is required";
    }
    if (errors.lastName) {
      if (errors.lastName.type === "required")
        return "LastName is required";
    }
    return "";
  };

  const getPasswordError = (): string => {
    if (errors.password) {
      if (errors.password.type === "required") {
        return "Password is required";
      }
      if (errors.password.type === "pattern") {
        return "Password must have at least 8 characters that include at least one uppercase character, one number, and  one special character.";
      }
    }
    return "";
  };

  const getMobileNoError = (): string => {
    if(errors.mobileNo){
      if(errors.mobileNo.type === "required")
        return "Mobile number is required"
      if(errors.mobileNo.type === "pattern")
        return  "Invalid mobile number"
    }
    return ""
  }

  const onRegistrationSuccess = async (response: LoginSuccessPayload) => {
    navigate("/login");
    toast.success("Registration successfull");
  };

  let cityID = 1;
  const onSubmit = async (data: IRegistration) => {
    const { registrationRequest } = props;
    if (registrationRequest) {
      // showLoader();
      const payload = {
        values: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          cityId: cityID,
          mobileNo: data.mobileNo,
          emailId: data.emailId,
          password: data.password,
          // rememberMe: data.rememberMe,
        },
        callback: onRegistrationSuccess,
      };

      registrationRequest(payload);
    }
  };

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
                  Registration
                </Typography>
                <div className="login-content-form">
                  <Grid container rowSpacing={0.1} columnSpacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="firstName"
                        label={
                          <>
                            FirstName{" "}
                            <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        helperText={getUserNameError()}
                        {...register("firstName", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="lastName"
                        label={
                          <>
                            LastName{" "}
                            <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        helperText={getUserNameError()}
                        {...register("lastName", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="mobileNo"
                        label={
                          <>
                            MobileNo{" "}
                            <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.mobileNo}
                        helperText={getMobileNoError()}
                        {...register("mobileNo", {
                          required: true,
                          pattern: MOBILE_NO
                        })}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +91
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel id="demo-select-small-label">
                          City
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="cityId"
                          value={cityID}
                          label="City"
                        >
                          <MenuItem value={cityID}>Ahemedabad</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address"
                        label={
                          <>
                            Address{" "}
                            <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.emailId}
                        helperText={getEmailError()}
                        {...register("address", {
                          required: true,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        label={
                          <>
                            Email{" "}
                            <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.emailId}
                        helperText={getEmailError()}
                        {...register("emailId", {
                          required: true,
                          pattern: EMAIL_PATTERN,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="outlined"
                        fullWidth
                      >
                        <InputLabel
                          htmlFor="password"
                          error={!!errors.password}
                        >
                          Password{" "}
                          <span className="color-red">*</span>
                        </InputLabel>
                        <OutlinedInput
                          id="password"
                          className="with-icon"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                disableFocusRipple
                                disableRipple
                              >
                                {showPassword ? (
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
                          error={!!errors.password}
                          {...register("password", {
                            required: true,
                            pattern: PASSWORD_PATTERN,
                          })}
                        />
                        {!!errors.password && (
                          <FormHelperText error>
                            {getPasswordError()}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
              </CardContent>
              <CardActions>
                <Box className="login-links" sx={{ mt:4, mb: 2 }}>
                  {/* <FormControlLabel
                      control={
                        <Checkbox
                          disableFocusRipple
                          disableRipple
                          icon={<CheckBoxIcon />}
                          checkedIcon={<CheckedBoxIcon />}
                          id="rememberMe"
                          {...register("rememberMe")}
                        />
                      }
                      label="Remember me"
                      labelPlacement="end"
                    /> */}
                  <Link
                      to="/login"
                      title="login"
                      className="forgot-pwd"
                    >
                      Already have an account?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  title="Login"
                  className="login-btn"
                  disableElevation
                >
                  Signup
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </form>
  );
};

export default RegistrationForm;
