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
import { useEffect } from "react";
import NumericFormControl, { removeNumberFormatting } from "components/elements/NumericFormControl";
import * as GENERIC from "interfaces/generic.interface";
import DropDownSelect from "components/elements/DropDownSelect";
import CheckBox from "components/elements/CheckBox";

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
  price: "Venue Rent/Price",
  minCapacity: "Minimum Capacity",
  maxCapacity: "Maximum Capacity"
}

const AddEditVenue: React.FC<IAddEditVenueProps> = ({
  isEditVenue,
  showScreen,
  handleVenueClose,
  handleAddVenue,
  currentVenueData,
  cityDropDownList
}) => {

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<IVenue>();

  const onModalClose = () => {
    reset();
    handleVenueClose();
  };

  const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    if (type) {
      console.log(fieldName);      
      switch (type) {
        case "required":
          return `${fieldNames[fieldName]} is required.`;
        case "min":
          return `${fieldNames[fieldName]} cannot be less than Minimum Capacity.`;
        case "max":
          return `${fieldNames[fieldName]} cannot be less than Maximum Capacity.`;
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
console.log(currentVenueData)
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
                error={!!errors.name}
                helperText={getError("name")}
                {...register("name", {
                  required: true,
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
                error={!!errors.address}
                helperText={getError("address")}
                {...register("address", {
                  required: true,
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
                error={!!errors.description}
                helperText={getError("description")}
                {...register("description", {
                  required: true,
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
                      inputComponent: NumericFormControl as any,
                    }}
                    value={
                      isEditVenue 
                        ? currentVenueData?.price || ""
                        : undefined
                      }                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DropDownSelect
                    label="City"                
                    value={currentVenueData?.cityId}
                    list={cityDropDownList}
                    error={!!errors.cityId}
                    helperText={getError("cityId")}
                    {...register("cityId", {
                      required: true,
                    })}
                    onChange={e => setValue("cityId", Number(e.target.value))}
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
                    multiline
                    error={!!errors.minCapacity}
                    helperText={getError("minCapacity")}
                    {...register("minCapacity", {
                      required: true,
                      max: Number(getValues("maxCapacity"))
                    })}
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
                    variant="outlined"
                    multiline
                    error={!!errors.maxCapacity}
                    helperText={getError("maxCapacity")}
                    {...register("maxCapacity", {
                      required: true,
                      min: Number(getValues("minCapacity"))
                    })}
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
