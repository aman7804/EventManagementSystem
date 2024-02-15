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
import { ICatering } from "interfaces/catering.interface";
import { useEffect } from "react";
import NumericFormControl, { CustomNumericFormatProps, removeNumberFormatting } from "components/elements/NumericFormControl";
import CheckBox from "components/elements/CheckBox";
import React from "react";
import { NumericFormatProps } from "react-number-format";

interface IAddEditCateringProps {
  isEditCatering: boolean;
  showScreen: boolean;
  handleCateringClose: any;
  handleAddCatering: any;
  currentCateringData?: ICatering
}

export interface IIndexable {
  [key: string]: any;
} 

const fieldNames : IIndexable = {
  name: "Catering Name",
  description: "Catering Description",
  price: "Catering Price"
}


const maxPrice = 9999999999999999.99;
const CustomPriceComponent =
React.forwardRef<NumericFormatProps, CustomNumericFormatProps>((props, ref ) =>
  <NumericFormControl {...props} min={0} max={maxPrice}/>)

const AddEditCatering: React.FC<IAddEditCateringProps> = ({
  isEditCatering,
  showScreen,
  handleCateringClose,
  handleAddCatering: handleSaveCatering,
  currentCateringData,
}) => {

  const maxNameLength = 100;
  const maxDescriptionLength = 250;

  const onModalClose = () => {
    reset();
    handleCateringClose();
  };

  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if (type) {
      console.log(fieldName);      
      switch (type) {
        case "required":
          return `${fieldNames[fieldName]} is required.`;
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
  } = useForm<ICatering>();

  useEffect(() => {
      reset(currentCateringData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditCatering, setValue, showScreen, currentCateringData]);
  
  const beginSubmit = async (data: any) => {
    data.price = removeNumberFormatting(data.price.toString());
    handleSaveCatering(data);
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
              {isEditCatering ? "Edit Catering" : "Add Catering"}
            </Typography>       
          </Box>              
            <form onSubmit={handleSubmit(beginSubmit)}>           
              <Grid container spacing={2}>
                <Grid item
                  xs={isEditCatering ? 8 : 12}
                  md={isEditCatering ? 8 : 12}
                  xl={isEditCatering ? 8 : 12}
                >       
                  <TextField
                    id="name"
                    label={
                      <>
                        Catering Name <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"
                    multiline
                    error={!!errors.name}
                    helperText={getError("name")}
                    {...register("name", {
                      required: true,
                      maxLength: maxNameLength,
                    })}
                  />
                </Grid>
                  {
                    isEditCatering  && (
                      <Grid item xs={4} xl={4} md={4} mt={2} alignContent={"center"}>
                          <CheckBox
                            label="Active"  
                            isChecked={
                              currentCateringData ? currentCateringData.isActive : true
                            }
                            {...register("isActive")}
                            onChange={e => setValue("isActive", e.target.checked)}
                          />
                      </Grid>
                    )
                  }
                <Grid item xs={12} md={12} xl={12}>
                  <TextField
                    id="description"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    error={!!errors.description}
                    helperText={getError("description")}
                    {...register("description", {
                      maxLength: maxDescriptionLength 
                    })}
                  />
                </Grid>
                <Grid item xs={12} xl={4} md={6}>
                  <TextField
                    id="price"
                    label={
                    <>
                      Price <span className="color-red">*</span>
                    </>
                    }
                    fullWidth
                    InputLabelProps={{shrink: true}}
                    autoComplete="off"
                    variant="outlined"
                    error={!!errors.price}
                    helperText={getError("price")}
                    {...register("price", { required: true })}
                    InputProps={{
                      inputComponent: CustomPriceComponent as any,
                    }}
                    value={isEditCatering
                      ? currentCateringData?.price || "" : undefined
                    }       
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    className="btn-save"
                    type="submit"
                  >
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

export default AddEditCatering;
