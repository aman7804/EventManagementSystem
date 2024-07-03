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
import { IVenue } from "interfaces/venue.interface";
import { IPhotography } from "interfaces/photography.interface";
import { ICatering } from "interfaces/catering.interface";
import { IDecoration } from "interfaces/decoration.interface";
import { getDefaultSettings } from "http2";
  
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
    getVenueRequest: (id: number) => void;
    getPhotographyRequest: (id: number) => void;
    getCateringRequest: (id: number) => void;
    getDecorationRequest: (id: number) => void;
    getVenue?: IVenue | null;
    getPhotography?: IPhotography | null;
    getCatering?: ICatering | null;
    getDecoration?: IDecoration | null;
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
    photographyDropDownList,
    getVenueRequest,
    getPhotographyRequest,
    getDecorationRequest,
    getCateringRequest,
    getVenue,
    getCatering,
    getDecoration,
    getPhotography
  }) => {

    const onModalClose = () => {
      reset();
      handlePackageClose();
    };

    // const getErrorMessage = (fieldName: string, type: string|undefined): string => {
    //   if (type) {    
    //     switch (type) {
    //       case "required":
    //         return `${fieldNames[fieldName]} is required.`;
    //       case "maxLength":
    //         return  `Maximum length of ${fieldNames[fieldName].toLowerCase()} is
    //           ${fieldName === "description" ? maxDescriptionLength : maxNameLength}.`;
    //       default:
    //         return "";
    //     }
    //   }
    //   return "";
    // }
    // const getError = (fieldName: string): string => {
    //   switch (fieldName) {
    //     case "name":
    //       return getErrorMessage(fieldName, errors.name?.type);
    //     // case "description":
    //     //   return getErrorMessage(fieldName, errors.description?.type);
    //     // case "price":
    //     //   return getErrorMessage(fieldName, errors.price?.type);
    //     default:
    //       return "field cannot be empty";
    //   }
    // };
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
    const [selectedVenue, setSelectedVenue] = useState<number|null|"">();
    const [selectedPhotography, setSelectedPhotography] = useState<number|null|"">();
    const [selectedDecoration, setSelectedDecoration] = useState<number|null|"">();
    const [selectedCatering, setSelectedCatering] = useState<number|null|"">();
    console.log(getVenue,'\n')
    console.log(getDecoration,'\n')
    console.log(getCatering,'\n')
    console.log(getPhotography,'\n')
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        Venue
                        <DropDownSelect
                          label="Venue"
                          value={currentPackageData?.venueId}
                          list={venueDropDownList}
                          error={undefined}
                          helperText={"undefined"}
                          onChange={e=>{
                            setSelectedVenue(Number(e.target.value))
                            Number(e.target.value)
                              && getVenueRequest(Number(e.target.value))
                          }}
                          allowNone={true}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        PRICE:{getVenue?.price}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <TextField
                        label="Capacity"
                        value={
                          selectedVenue
                          ? `${getVenue?.minCapacity?.toString()} - 
                            ${getVenue?.maxCapacity?.toString()}`
                          : ''
                        }
                        InputProps={{
                          readOnly: true,
                        }}
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                      />
                      <TextField
                          label="Address"
                          fullWidth
                          value={selectedVenue ? getVenue?.address : ''}
                          // value={getVenue?.address}
                          InputProps={{
                            readOnly: true,
                          }}
                      />
                      <TextField
                          label="Description"
                          fullWidth
                          value={selectedVenue ? getVenue?.description : ''}
                          InputProps={{
                            readOnly: true,
                          }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        Photography
                        <DropDownSelect
                          label="Photography"
                          value={currentPackageData?.photographyId}
                          list={photographyDropDownList}
                          error={undefined}
                          helperText={"undefined"}
                          onChange={e=>{
                            setSelectedPhotography(Number(e.target.value))
                            Number(e.target.value)
                              && getPhotographyRequest(Number(e.target.value))
                          }}
                          allowNone={true}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        PRICE: {selectedPhotography && getPhotography?.price}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <TextField
                          label="Description"
                          fullWidth
                          value={selectedPhotography ? getPhotography?.description : ''}
                          InputProps={{
                            readOnly: true,
                          }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        Decoration
                        <DropDownSelect
                          label="Decoration"
                          value={currentPackageData?.decorationId}
                          list={decorationDropDownList}
                          error={undefined}
                          helperText={"undefined"}
                          onChange={e=>{
                            setSelectedDecoration(Number(e.target.value))
                            Number(e.target.value)
                              && getDecorationRequest(Number(e.target.value))
                          }}
                          allowNone={true}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        PRICE:{selectedDecoration && getDecoration?.price}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <TextField
                          label="Description"
                          fullWidth
                          value={selectedDecoration ? getDecoration?.description : ''}
                          InputProps={{
                            readOnly: true,
                          }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={7}>
                        Catering
                        <DropDownSelect
                          label="Catering"
                          value={currentPackageData?.cateringId}
                          list={cateringDropDownList}
                          error={undefined}
                          helperText={"undefined"}
                          onChange={e=>{
                            setSelectedCatering(Number(e.target.value))
                            Number(e.target.value)
                              && getCateringRequest(Number(e.target.value))
                          }}
                          allowNone={true}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        PRICE:{selectedCatering && getCatering?.price}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <TextField
                          label="Description"
                          fullWidth
                          value={selectedCatering ? getCatering?.description : ''}
                          InputProps={{
                            readOnly: true,
                          }}
                      />
                    </Grid>
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
  