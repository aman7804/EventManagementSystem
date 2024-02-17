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
import React, { useEffect, useState } from "react";
import * as images from "../../assets/images";
import { IRegistration, IRegistrationContainerDispatch } from "../../interfaces/auth.interface";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { LoginSuccessPayload } from "store/auth/types";
import { toast } from "react-toastify";
import { EMAIL_PATTERN, MOBILE_PATTERN, PASSWORD_PATTERN } from "utils/constants";
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom"
import { showLoader } from "utils/helper";
import { IIndexable } from "components/venue.create";
import { CustomMobileComponent } from "components/user.create";

export type RegistrationProps = IRegistrationContainerDispatch;

const fieldNames : IIndexable = {
  firstName: "First Name",
  lastName: "Last Name",
  emailId: "Email",
  password: "Password",
  mobileNo: "Mobile Number",
  address: "Address"
}

export const RegistrationForm = (props: RegistrationProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  

  const maxFirstNameLength = 50;
  const maxLastNameLength = 50;
  const maxEmailIdLength = 256;
  const maxPasswordLength = 256;
  const maxAddressLength = 500; 
  const [mobileNoValue, setMobileNoValue] = useState<string|undefined>("");

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


  const getErrorMessage = (fieldName: keyof IRegistration, type: string|undefined): string => {
    if(type){
      switch(type){
        case "required":
          return `${fieldNames[fieldName]} is required.`
        case "pattern":
          return `Invalid ${fieldNames[fieldName].toLowerCase()}.`
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
        default:
          return ""
      }
    }
    return ""
  }

  const getError = (fieldName: keyof IRegistration): string => {
    switch(fieldName){
      case "firstName":
        return getErrorMessage(fieldName, errors?.firstName?.type);
      case "lastName":
        return getErrorMessage(fieldName, errors?.lastName?.type);
      case "emailId":
        return getErrorMessage(fieldName, errors?.emailId?.type);
      case "password":
        return getErrorMessage(fieldName, errors?.password?.type);
      case "mobileNo":
        return getErrorMessage(fieldName, errors?.mobileNo?.type);
      case "address":
        return getErrorMessage(fieldName, errors?.address?.type);
      default:
        return "field cannot be empty";
    }
  }

  const onRegistrationSuccess = async (response: LoginSuccessPayload) => {
    navigate("/login");
    toast.success("Registration successful");
  };

  const onSubmit = async (data: IRegistration) => {
    const { registrationRequest } = props;
    if (registrationRequest) {
      showLoader();
      const payload = {
        values: {
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          mobileNo: data.mobileNo,
          emailId: data.emailId,
          password: data.password,
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
                            FirstName <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={getError("firstName")}
                        {...register("firstName", {
                          required: true,
                          maxLength: maxFirstNameLength,
                        })}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="lastName"
                        label={
                          <>
                            LastName <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.lastName}
                        helperText={getError("lastName")}
                        {...register("lastName", {
                          required: true,
                          maxLength: maxLastNameLength
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="address"
                        label={
                          <>
                            Address <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        multiline
                        variant="outlined"
                        error={!!errors.address}
                        helperText={getError("address")}
                        {...register("address", {
                          required: true,
                          maxLength: maxAddressLength
                        })}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        label={
                          <>
                            Email <span className="color-red">*</span>
                          </>
                        }
                        fullWidth
                        variant="outlined"
                        error={!!errors.emailId}
                        helperText={getError("emailId")}
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
                            {getError("password")}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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
                        value={mobileNoValue} 
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
                </div>
              </CardContent>
              <CardActions>
                <Box className="login-links" sx={{ mt:4, mb: 2 }}>
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
