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
    Typography 
  } from "@mui/material";
  import React, { useEffect } from "react";
  import * as images from "assets/images";
  import { ILogin, ILoginContainerDispatch } from "../../interfaces/auth.interface";
  import { useNavigate } from "react-router";
  import AOS from "aos";
  import "aos/dist/aos.css";
  import { LoginSuccessPayload } from "store/auth/types";
  import { toast } from "react-toastify";
  import { EMAIL_PATTERN, PASSWORD_PATTERN } from "utils/constants";
  import { useForm } from "react-hook-form";
import { setLoginDetails } from "utils/helper";
  
  export type LoginProps = ILoginContainerDispatch;
  
  export const LoginForm = (props: LoginProps) => {
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
    } = useForm<ILogin>();
  
    useEffect(() => {
      AOS.init({
        easing: "ease-in",
        duration: 400,
        once: true,
      });
      AOS.refresh();
    }, []);
  
    
    const getUserNameError = (): string => {
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
  
    const onLoginSuccess = async (response: LoginSuccessPayload) => {
      setLoginDetails(response)
      navigate("/dashboard");
      toast.success("Logged in successfully");
    };
  
    const onSubmit = async (data: ILogin) => {
      const { loginRequest } = props;
      if (loginRequest) {
        // showLoader();
        const payload = {
          values: {
            email: data.emailId,
            password: data.password
            // rememberMe: data.rememberMe,
          },
          callback: onLoginSuccess,
        };
  
        loginRequest(payload);
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
                <img
                  src={images.loginLogo}
                  alt="Event Management System"
                />
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
                    Login
                  </Typography>
                  <div className="login-content-form">
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
                      helperText={getUserNameError()}
                      {...register("emailId", {
                        required: true,
                        pattern: EMAIL_PATTERN,
                      })}
                    />
  
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="password" error={!!errors.password}>
                        Password <span className="color-red">*</span>
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
                                <img src={images.eyeOpen} alt="show" />
                              ) : (
                                <img src={images.eyeClose} alt="hide" />
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
                  </div>
                </CardContent>
                <CardActions>
                  <Box className="login-links">
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
                    <a
                      href="/forgot-password"
                      title="Forgot password"
                      className="forgot-pwd"
                    >
                      Forgot password?
                    </a>
                  </Box>
                  <Button
                    variant="contained"
                    title="Login"
                    className="login-btn"
                    disableElevation
                    type="submit"
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </form>
    );
  }
  
  export default LoginForm