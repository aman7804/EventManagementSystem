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
import { IVenue } from "interfaces/venue.interface";
import { useEffect, useState } from "react";
import NumericFormControl, { CustomNumericFormatProps, removeNumberFormatting } from "components/elements/NumericFormControl";
import * as GENERIC from "interfaces/generic.interface";
import DropDownSelect from "components/elements/DropDownSelect";
import CheckBox from "components/elements/CheckBox";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";

interface IAddEditVenueProps {
  isEditVenue: boolean;
  showScreen: boolean;
  handleVenueClose: any;
  handleSaveVenue: any;
  currentVenueData?: IVenue
  cityDropDownList: GENERIC.IKeyValuePair[] | null | undefined
}

export interface IIndexable {
  [key: string]: any;
} 

const fieldNames : IIndexable = {
  name: "Venue Name",
  address: "Venue Address",
  description: "Venue Description",
  cityId: "Venue City",
  price: "Venue Rent/Price",
  minCapacity: "Minimum Capacity",
  maxCapacity: "Maximum Capacity"
}

const maxPrice = 9999999999999999.99;
  const CustomPriceComponent =
  React.forwardRef<NumericFormatProps, CustomNumericFormatProps>((props, ref ) =>
    <NumericFormControl {...props} min={0} max={maxPrice}/>)


const maxCapacity = 2147483647
const CustomCapacityComponent = 
  React.forwardRef<NumericFormatProps, CustomNumericFormatProps>((props, ref) => {
    const {onChange} = props;
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        allowNegative={false}
        decimalScale={0}
        name={props.name}
        onChange={onChange}
        isAllowed={(values)=>{
          const {floatValue} = values;
          return floatValue === undefined ||
            (
              floatValue >= 0 &&
              floatValue <=  maxCapacity &&
              Number.isInteger(floatValue)
            )
        }}
      />
    )
  }
  )

const AddEditVenue: React.FC<IAddEditVenueProps> = ({
  isEditVenue,
  showScreen,
  handleVenueClose,
  handleSaveVenue,
  currentVenueData,
  cityDropDownList
}) => {

  const maxNameLength = 100;
  const maxAddressLength = 200;
  const maxDescriptionLength = 100;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<IVenue>();

  const onModalClose = () => {
    reset();
    handleVenueClose();
  };

  interface ICapacityRange{
    min: number | undefined;
    max: number | undefined;
  }
  const [capacityRange, setCapacityRange] = useState<ICapacityRange>({min: 0, max: maxCapacity})

  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if (type) {
      switch (type) {
        case "required":
          return `${fieldNames[fieldName]} is required.`;
        case "maxLength":
          switch(fieldName){
            case "name": return  `Cannot exceed ${maxNameLength} characters.`;
            case "address": return `Cannot exceed ${maxAddressLength} characters.`;
            case "description": return `Cannot exceed ${maxDescriptionLength} characters.`;
          }
          break;
        case "min":
          return `${fieldNames[fieldName]} cannot be less than Minimum Capacity.`;
        case "max":
          return `${fieldNames[fieldName]} cannot be more than Maximum Capacity.`;
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
        case "address":
        return getErrorMessage(fieldName, errors.address?.type);
      case "description":
        return getErrorMessage(fieldName, errors.description?.type);
      case "price":
        return getErrorMessage(fieldName, errors.price?.type);
      case "minCapacity":
        return getErrorMessage(fieldName, errors.minCapacity?.type);
      case "maxCapacity":
        return getErrorMessage(fieldName, errors.maxCapacity?.type);
      case "cityId":
        return getErrorMessage(fieldName, errors.cityId?.type);
      default:
        return "field cannot be empty";
    }
    
  };

  useEffect(() => {
      reset(currentVenueData)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditVenue, setValue, showScreen, currentVenueData]);
  
  const beginSubmit = (data: any) => {
    data.price = removeNumberFormatting(data.price.toString());
    handleSaveVenue(data);
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
              {isEditVenue ? "Edit Venue" : "Add Venue"}
            </Typography>       
          </Box>              
            <form onSubmit={handleSubmit(beginSubmit)}>           
              <Grid container spacing={2}>
                <Grid item xs={8} md={8} xl={8}>
                  <TextField
                    id="name"
                    label={
                      <>
                        Venue Name <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"
                    multiline
                    error={!!errors.name}
                    helperText={getError("name")}
                    {...register("name", {
                      required: true,
                      maxLength: maxNameLength
                    })}
                  />
                </Grid>
                <Grid item xs={4} xl={4} md={4} mt={2} alignContent={"center"}>
                  <CheckBox
                    label="Active"  
                    isChecked={
                      currentVenueData ? currentVenueData.isActive : true
                    }
                    {...register("isActive")}
                    onChange={e => setValue("isActive", e.target.checked)}
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
                      maxLength: maxAddressLength
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={12} xl={12}>
                  <DropDownSelect
                    label="City"
                    value={currentVenueData?.cityId}
                    list={cityDropDownList}
                    error={!!errors.cityId}
                    helperText={getError("cityId")}
                    {...register("cityId", { required: true })}
                    onChange={e => {
                      setValue("cityId", Number(e.target.value))
                      trigger("cityId")
                    }}
                  />
                </Grid>
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
                    id="minCapacity"
                    label={
                      <>
                        Minimum Capacity <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"
                    error={!!errors.minCapacity}  
                    helperText={getError("minCapacity")}
                    {...register("minCapacity", {
                      required: true,
                      max: capacityRange.max,
                    })}
                    onChange={(e)=>{
                      const range = {...capacityRange,
                        min: Number(e.target.value) || 0}
                      setCapacityRange(range)
                    }}
                    InputProps={{
                      inputComponent: CustomCapacityComponent as any
                    }}
                    value={currentVenueData?.minCapacity}
                    />
                </Grid>
                <Grid item xs={12} xl={4} md={6}>
                  <TextField
                    id="maxCapacity"
                    label={
                      <>
                        Maximum Capacity <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"
                    error={!!errors.maxCapacity}
                    helperText={getError("maxCapacity")}
                    {...register("maxCapacity", {
                      required: true,
                      min: capacityRange.min
                    })}
                    onChange={(e)=>{
                      const range = {...capacityRange,
                        max: Number(e.target.value) || maxCapacity}
                      setCapacityRange(range)
                    }}
                    InputProps={{
                      inputComponent: CustomCapacityComponent as any
                    }}
                    value={currentVenueData?.maxCapacity}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <TextField
                    id="price"
                    label={
                      <>
                        Price <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    variant="outlined"  
                    autoComplete="off"
                    error={!!errors.price}
                    helperText={getError("price")}
                    {...register("price", { required: true })}
                    InputProps={{
                      inputComponent: CustomPriceComponent as any,
                    }}
                    value={isEditVenue 
                        ? currentVenueData?.price || "" : undefined
                      }                    
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item>
                  <Button variant="contained" className="btn-save" type="submit">
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

export default AddEditVenue;
