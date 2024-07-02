import {
    Box,
    Button,
    Card,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
  import { saveIcon } from "assets/images";
  import * as GENERIC from '../interfaces/generic.interface'
  import { useForm } from "react-hook-form";
  import { IPackage, IPackageFull } from "interfaces/package.interface";
  import { useEffect, useState } from "react";
  import NumericFormControl, { CustomNumericFormatProps, removeNumberFormatting } from "components/elements/NumericFormControl";
  import CheckBox from "components/elements/CheckBox";
  import React from "react";
import { NumericFormatProps } from "react-number-format";
import DropDownSelect from "./elements/DropDownSelect";
  
  interface IAddEditPackageProps {
    isEditPackage: boolean;
    showScreen: boolean;
    handlePackageClose: any;
    // handleAddPackage: any;
    currentPackageData?: IPackageFull;
    venueDropDownList: GENERIC.IKeyValuePair[];
    photographyDropDownList: GENERIC.IKeyValuePair[];
    decorationDropDownList: GENERIC.IKeyValuePair[];
    cateringDropDownList: GENERIC.IKeyValuePair[];
  }
  
  export interface IIndexable {
    [key: string]: any;
  } 
  
  const fieldNames : IIndexable = {
    name: "Package Name",
    description: "Package Description",
    price: "Package Price"
  }
  
  
  // const maxPrice = 9999999999999999.99;
  // const CustomPriceComponent =
  // React.forwardRef<NumericFormatProps, CustomNumericFormatProps>((props, ref ) =>
  //   <NumericFormControl {...props} min={0} max={maxPrice}/>)

  const AddEditPackage: React.FC<IAddEditPackageProps> = ({
    isEditPackage,
    showScreen,
    handlePackageClose,
    // handleAddPackage: handleSavePackage,
    currentPackageData,
    venueDropDownList,
    cateringDropDownList,
    decorationDropDownList,
    photographyDropDownList
  }) => {

    const maxNameLength = 100;
    const maxDescriptionLength = 250;
    // const [priceValue, setPriceValue] = useState(currentPackageData?.price);

    const onModalClose = () => {
      reset();
      handlePackageClose();
    };

    const getErrorMessage = (fieldName: string, type: string|undefined): string => {
      if (type) {    
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
        // case "description":
        //   return getErrorMessage(fieldName, errors.description?.type);
        // case "price":
        //   return getErrorMessage(fieldName, errors.price?.type);
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
    } = useForm<IPackage>();
  
    useEffect(() => {
        reset(currentPackageData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditPackage, setValue, showScreen, currentPackageData]);
    
    const beginSubmit = async (data: any) => {
      data.price = removeNumberFormatting(data.price.toString());
      // handleSavePackage(data);
    }
    console.log(
      "venueDDL: ",venueDropDownList,
      "pDDL: ",photographyDropDownList,
      "dDDL: ",decorationDropDownList,
      "cDDL: ",cateringDropDownList,
    )
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
                {isEditPackage ? "Edit Package" : "Add Package"}
              </Typography>       
            </Box>              
              <form onSubmit={handleSubmit(beginSubmit)}>           
                {/* <Grid container spacing={2}>
                  <Grid item
                    xs={isEditPackage ? 8 : 12}
                    md={isEditPackage ? 8 : 12}
                    xl={isEditPackage ? 8 : 12}
                  >       
                      <TextField
                        id="name"
                        label={
                          <>
                            Package Name <span className="color-red">*</span>
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
                    isEditPackage  && (
                      <Grid item xs={4} xl={4} md={4} mt={2} alignContent={"center"}>
                        <CheckBox
                          label="Active"  
                          isChecked={
                            currentPackageData ? currentPackageData.isActive : true
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
                      autoComplete="off"
                      variant="outlined"
                      error={!!errors.price}
                      helperText={getError("price")}
                      {...register("price", { required: true })}
                      InputProps={{
                        inputComponent: CustomPriceComponent as any,
                      }}
                      value={isEditPackage ? priceValue : undefined } 
                      onBlur={(e) => {
                        if (e.target.value === '')
                          setPriceValue(undefined)
                        else 
                          setPriceValue(Number(e.target.value))
                      }}
                      InputLabelProps={{shrink:  priceValue !== undefined }}
                    />
                  </Grid>
                </Grid> */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    Container 1
                    <DropDownSelect
                      label="Venue"
                      value={currentPackageData?.venueId}
                      list={venueDropDownList}
                      error={undefined}
                      helperText={"undefined"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    Container 2
                    <DropDownSelect
                      label="Photography"
                      value={currentPackageData?.photographyId}
                      list={photographyDropDownList}
                      error={undefined}
                      helperText={"undefined"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    Container 3
                    <DropDownSelect
                      label="Decoration"
                      value={currentPackageData?.decorationId}
                      list={decorationDropDownList}
                      error={undefined}
                      helperText={"undefined"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    Container 4
                    <DropDownSelect
                      label="Catering"
                      value={currentPackageData?.cateringId}
                      list={cateringDropDownList}
                      error={undefined}
                      helperText={"undefined"}
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
  
  export default AddEditPackage;
  