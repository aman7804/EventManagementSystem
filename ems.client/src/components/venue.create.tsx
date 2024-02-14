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
  handleAddVenue: any;
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
    const {value, onChange} = props;
    const [ numericValue, setNumericValue] = useState<Number | undefined>(Number(value))
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        allowNegative={false}
        name={props.name}
        value={numericValue?.toString()}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue?.toString() || "",
            },
          });
          setNumericValue(values.floatValue); 
        }}
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
  handleAddVenue,
  currentVenueData,
  cityDropDownList
}) => {

  const minNameLength = 5;
  const maxNameLength = 25;
  const minAddressLength = 10;
  const maxAddressLength = 100;
  const minDescriptionLength = 20;
  const maxDescriptionLength = 200;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    setError,
    watch,
    formState: { errors }
  } = useForm<IVenue>();

  const onModalClose = () => {
    reset();
    handleVenueClose();
  };

  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if (type) {
      switch (type) {
        case "required":
          return `${fieldNames[fieldName]} is required.`;
        case "minLength":
          switch(fieldName){
            case "name": return `Must be at least ${minNameLength} characters.`;
            case "address": return `Must be at least ${minAddressLength} characters.`;
            case "description": return `Must be at least ${minDescriptionLength} characters.`;
          }
          break;
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
    handleAddVenue(data);
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
                error={
                  errors.name?.type !== "minLength" &&
                  errors.name?.type !== "maxLength" 
                    ? !!errors.name : false
                }
                helperText={getError("name")}
                {...register("name", {
                  required: true,
                  minLength: minNameLength,
                  maxLength: maxNameLength
                })}
              />
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
                error={
                  errors.address?.type !== "minLength" &&
                  errors.address?.type !== "maxLength" 
                    ? !!errors.address : false
                }
                helperText={getError("address")}
                {...register("address", {
                  required: true,
                  minLength: minAddressLength,
                  maxLength: maxAddressLength
                })}
              />
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
                  errors.description?.type !== "minLength" &&
                  errors.description?.type !== "maxLength" 
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
                    variant="outlined"
                    multiline
                    error={!!errors.price}
                    helperText={getError("price")}
                    {...register("price", {
                      required: true
                    })}
                    InputProps={{
                      inputComponent: CustomPriceComponent as any,
                    }}
                    value={
                      isEditVenue 
                        ? currentVenueData?.price || ""
                        : undefined
                      }                    
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
                    type="number"
                    error={!!errors.minCapacity}  
                    helperText={getError("minCapacity")}
                    {...register("minCapacity", {
                      required: true,
                      max: Number(getValues("maxCapacity")),
                    })}
                    InputProps={{
                      inputComponent: CustomCapacityComponent as any
                    }}
                    value={currentVenueData?.minCapacity}
                  />
                </Grid>
                <Grid item xs={12} xl={4} md={6}>
                  <TextField
                    id="maxCapcity"
                    label={
                      <>
                        Maximum Capacity <span className="color-red">*</span>
                      </>
                    }
                    fullWidth
                    type="number"
                    variant="outlined"
                    error={!!errors.maxCapacity}
                    helperText={getError("maxCapacity")}
                    {...register("maxCapacity", {
                      required: true,
                      min: Number(getValues("minCapacity"))
                    })}
                    InputProps={{
                      inputComponent: CustomCapacityComponent as any
                    }}
                    value={currentVenueData?.maxCapacity}
                  />
                </Grid>
              </Grid>
            
              <Button variant="contained" className="btn-save" type="submit">
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
                  label="active"
                  isChecked={
                    currentVenueData ? currentVenueData.isActive : true
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

export default AddEditVenue;
