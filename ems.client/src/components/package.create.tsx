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
import { removeNumberFormatting } from "components/elements/NumericFormControl";
import React from "react";
import DropDownSelect from "./elements/DropDownSelect";
import { IVenue } from "interfaces/venue.interface";
import { IPhotography } from "interfaces/photography.interface";
import { ICatering } from "interfaces/catering.interface";
import { IDecoration } from "interfaces/decoration.interface";

interface IAddEditPackageProps {
  isEditPackage: boolean;
  showScreen: boolean;
  handlePackageClose: any;
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
  handlePackageClose();
};

const beginSubmit = async (data: any) => {
  data.price = removeNumberFormatting(data.price.toString());
  // handleSavePackage(data);
}

const {
register,
handleSubmit,
reset,
setValue,
formState: { errors }
} = useForm<IPackage>();

const [selectedVenue, setSelectedVenue] = useState<number|null|"">(currentPackageData?.venueId || "");
const [selectedPhotography, setSelectedPhotography] = useState<number|null|"">(currentPackageData?.photographyId || "");
const [selectedDecoration, setSelectedDecoration] = useState<number|null|"">(currentPackageData?.decorationId || "");
const [selectedCatering, setSelectedCatering] = useState<number|null|"">(currentPackageData?.cateringId || "");
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
                <Card>
                  <Box padding={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        PRICE: {selectedVenue ?
                        (currentPackageData?.venuePrice || getVenue?.price) : ""}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Venue Details</Typography>
                        {
                          selectedVenue ? (
                            <>
                              <Typography variant="body1">
                                Capacity: {`${currentPackageData?.minCapacity || getVenue?.minCapacity} - 
                                ${currentPackageData?.maxCapacity || getVenue?.maxCapacity}`}
                              </Typography><br/>
                              <Typography variant="body1">
                                Address: {currentPackageData?.venueAddress || getVenue?.address}
                              </Typography><br/>
                              <Typography variant="body1">
                                Description: {currentPackageData?.venueDescription || getVenue?.description}
                              </Typography>
                            </>
                          )
                          : ""
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Box padding={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        PRICE: {selectedPhotography ?
                        (currentPackageData?.photographyPrice || getPhotography?.price) : ""}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Photography Details</Typography>
                        {
                          selectedPhotography ?
                            <Typography variant="body1">
                              {currentPackageData?.photographyDescription || getPhotography?.description}
                            </Typography>
                          : ""
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Box padding={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        PRICE:{selectedDecoration ?
                        (currentPackageData?.decorationPrice || getDecoration?.price) : ""}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Decoration Details</Typography>
                        {
                          selectedDecoration ?
                          <Typography variant="body1">
                            {currentPackageData?.decorationDescription || getDecoration?.description}
                          </Typography>
                          : ""
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Box padding={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
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
                      <Grid item xs={4}>
                        PRICE: {selectedCatering ?
                        (currentPackageData?.cateringPrice || getCatering?.price) : ""}
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="h6">Catering Details</Typography>
                        {
                          selectedCatering ?
                          <Typography variant="body1">
                            {currentPackageData?.cateringDescription || getCatering?.description}
                          </Typography>
                          : ""
                        }
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
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
