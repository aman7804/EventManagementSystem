import {
    Box,
    Button,
    Card,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { saveIcon } from "assets/images";
  import { useForm } from "react-hook-form";
  import { IPhotography } from "interfaces/photography.interface";
  import { useEffect } from "react";
  import NumericFormControl, { CustomNumericFormatProps, removeNumberFormatting } from "components/elements/NumericFormControl";
  import CheckBox from "components/elements/CheckBox";
  import React from "react";
import { NumericFormatProps } from "react-number-format";
  
  interface IAddEditPhotographyProps {
    isEditPhotography: boolean;
    showScreen: boolean;
    handlePhotographyClose: any;
    handleAddPhotography: any;
    currentPhotographyData?: IPhotography
  }
  
  export interface IIndexable {
    [key: string]: any;
  } 
  
  const fieldNames : IIndexable = {
    name: "Photography Name",
    description: "Photography Description",
    price: "Photography Price"
  }
  
  
  const maxPrice = 9999999999999999.99;
  const CustomPriceComponent =
  React.forwardRef<NumericFormatProps, CustomNumericFormatProps>((props, ref ) =>
    <NumericFormControl {...props} min={0} max={maxPrice}/>)

  const AddEditPhotography: React.FC<IAddEditPhotographyProps> = ({
    isEditPhotography,
    showScreen,
    handlePhotographyClose,
    handleAddPhotography: handleSavePhotography,
    currentPhotographyData,
  }) => {
    const minNameLength = 5;
    const maxNameLength = 25;
    const minDescriptionLength = 20;
    const maxDescriptionLength = 200;
    const onModalClose = () => {
      reset();
      handlePhotographyClose();
    };

    const getErrorMessage = (fieldName: string, type: string|undefined): string => {
      if (type) {
        console.log(fieldName);      
        switch (type) {
          case "required":
            return `${fieldNames[fieldName]} is required.`;
          case "minLength":
            return  `Minimum length of ${fieldNames[fieldName].toLowerCase()} is
              ${fieldName === "description" ? minDescriptionLength : minNameLength}.`;
          case "maxLength":
            return  `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
              ${fieldName === "description" ? maxDescriptionLength : maxNameLength}.`;
          default:
            return "";
        }
      }
      return "";
    }
  
    const getError = (fieldName: string): string => {
      switch (fieldName) {
        case "name":
          return getErrorMessage(fieldName, errors.name?.type);
        case "description":
          return getErrorMessage(fieldName, errors.description?.type);
        case "price":
          return getErrorMessage(fieldName, errors.price?.type);
        default:
          return "field cannot be empty";
      }
    };

    const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors }
    } = useForm<IPhotography>();
  
    useEffect(() => {
        reset(currentPhotographyData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditPhotography, setValue, showScreen, currentPhotographyData]);
    
    const beginSubmit = async (data: any) => {
      data.price = removeNumberFormatting(data.price.toString());
      handleSavePhotography(data);
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
                {isEditPhotography ? "Edit Photography" : "Add Photography"}
              </Typography>       
            </Box>              
              <form onSubmit={handleSubmit(beginSubmit)}>           
                <TextField
                  id="name"
                  label={
                    <>
                      Photography Name <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={
                    errors.name?.type !== "minLength"
                    && errors.name?.type !== "maxLength"
                      ? !!errors.name : false
                  }
                  helperText={getError("name")}
                  {...register("name", {
                    required: true,
                    maxLength: maxNameLength,
                    minLength: minNameLength,
                  })}
                />
                <TextField
                  id="description"
                  label={
                    <>
                      Description <span className="color-red">*</span>
                    </>
                  }
                  fullWidth
                  variant="outlined"
                  multiline
                  error={
                    errors.description?.type !== "minLength"
                    && errors.description?.type !== "maxLength"
                      ? !!errors.description : false
                  }
                  helperText={getError("description")}
                  {...register("description", {
                    required: true,
                    minLength: minDescriptionLength,
                    maxLength: maxDescriptionLength 
                  })}
                />
                <Grid container spacing={2}>
                <Grid item xs={12} xl={4} md={12}>
                <TextField
                  id="price"
                  label={
                  <>
                    Price <span className="color-red">*</span>
                  </>
                  }
                  fullWidth
                  autoComplete="off"
                  variant="outlined"
                  error={!!errors.price}
                  helperText={getError("price")}
                  {...register("price", { required: true })}
                  InputProps={{
                    inputComponent: CustomPriceComponent as any,
                  }}
                  value={isEditPhotography
                    ? currentPhotographyData?.price || "" : undefined
                  }       
                />
                </Grid>
                </Grid>
                <Button
                  variant="contained"
                  className="btn-save"
                  type="submit"
                >
                  <img src={saveIcon} alt="save" />
                  Save
                </Button>
                <Button
                  variant="outlined"
                  className="btn-cancel"
                  onClick={onModalClose}
                >
                  Cancel
                </Button>
                <Box style={{
                  position: "absolute",
                  right: 0,
                  margin: "10px",
                }}>
                  <CheckBox
                    label="Active"
                    isChecked={currentPhotographyData 
                      ? currentPhotographyData.isActive : true
                    }
                    {...register("isActive")}
                    onChange={e => setValue("isActive", e.target.checked)}
                  />
              </Box>
              </form>             
          </Card>
        </Grid>
      </Grid>
    );
  };
  
  export default AddEditPhotography;
  