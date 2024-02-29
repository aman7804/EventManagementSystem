import { Box } from "@mui/system";
import {
  Button,
  Card,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  arrowBackwardIcon,
  arrowForwardIcon,
  deleteIcon,
  editIcon,
  plusLightIcon,
} from "assets/images";
import React, { useCallback, useEffect, useState } from "react";
// import AOS from "aos";
import "aos/dist/aos.css";
import {
  IPackage,
  IPackageContainerDispatch,
  IPackageContainerState,
  IPackagePagination,
} from "interfaces/package.interface";
import { showLoader } from "utils/helper";
import { toast } from "react-toastify";
import { PAGE_SIZES, RUPEE_SYMBOL, SOMETHING_WENT_WRONG } from "utils/constants";
import { Order } from "utils/enums";
import DeleteConfirmationModal from "components/modals/delete.confirm";
// import AddEditPackage from "components/package.create";
import projectTheme from "App.theme";
import * as GENERIC from "interfaces/generic.interface";
import { get } from "lodash";
import EnhancedTableHead from "components/elements/EnhancedTableHead";

const ArrowBackIcon = () =>
  <img src={arrowBackwardIcon} alt="arrow-backward" />;
const ArrowForwardIcon = () =>
  <img src={arrowForwardIcon} alt="arrow-forward" />;

// capitalization
const capitalization = (str: string): string => 
  str.charAt(0).toUpperCase() + str.slice(1);

const columnDisplayName: GENERIC.IIndexable<IPackage> = {
  name: "Name",
  venueName: "Venue Name",
  photographyName: "Photography Name",
  cateringName: "Catering Name",
  decorationName: "Description",
}

export type PackageProps = IPackageContainerState &
  IPackageContainerDispatch;

const PackageForm: React.FC<PackageProps> = (props) => {
  const [packageListMeta, setPackageListMeta] = useState<IPackagePagination | null>();
  const [page, setPage] = useState<string>("5");
  const [pageNo, setPageNo] = useState<number>(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof IPackage>("name");
  const [showScreen, setShowScreen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isEditPackage, setIsEditPackage] = useState<boolean>(false);
  const [isOpenPackageDeleteModal, setIsOpenPackageDeleteModal] = useState(false);
  const [deletePackageId, setDeletePackageId] = useState<number>();
  
  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, newOrderBy: keyof IPackage) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy]
  );

  // handle-child-component
  const handleAddEditPackage = (packageId: number|null) => {
    if (packageId) { //Edit Mode
      setIsEditPackage(true);
      getPackage(packageId);
    }
    else { //Add Mode
      setIsEditPackage(false);
      setShowScreen(true);
    }
  };
  const handlePackageClose = () => {
    setShowScreen(false);
  }
  const handlePackageDeleteModal = (packageId: number) => {
    setDeletePackageId(packageId);
    setIsOpenPackageDeleteModal(true);
  };
  const handlePackageDeleteCloseModal = () => {
    setDeletePackageId(0);
    setIsOpenPackageDeleteModal(false);
  };

  useEffect(() => {
    getPackageList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNo, order, orderBy]);

  // callbacks
  const onPackageListSuccess = (response: GENERIC.IApiSuccessResponse<IPackagePagination>) => {
    setPackageListMeta(response.data);
  };
  const onDeletePackageSuccess = (response: GENERIC.IApiSuccessResponse<IPackage>) => {
    if (response.isSuccessStatusCode) {
      toast.success("Package deleted successfully.");
      handlePackageDeleteCloseModal();
      getPackageList();
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onSavePackageSuccess = (response: GENERIC.IApiSuccessResponse<IPackage>) => {
    if (response.isSuccessStatusCode) {
      toast.success
      (`Package ${isEditPackage ? "updated" : "added"} successfully.`)
      handlePackageClose();
      getPackageList();
    } else if (response.message) {
      toast.warning(response.message);
    } else {
      toast.error(SOMETHING_WENT_WRONG);
    }
  };
  const onGetPackageSuccess = (response: GENERIC.IApiSuccessResponse<IPackage>) => {
    setShowScreen(true);
  };

  // action-dispatches
  const getPackageList = async () => {
    const { listRequest } = props;
    
    if (listRequest) {
      showLoader();
      const payload: GENERIC.ListRequestPayload<IPackagePagination> = {
        data: {
          sortByColumns: capitalization(orderBy),
          sortBy: order==="asc"  ? 0 : 1,
          pageNo: Number(pageNo),
          pageSize: Number(page),
          filter: {
            search: searchText
          },
        },
        callback: onPackageListSuccess,
      };
      listRequest(payload);
    }
  };
  const handleDeletePackage = () => {
    const { deleteRequest } = props;

    if (deleteRequest) {
      showLoader();
      const payload = {
        data: {
          id: Number(deletePackageId),
        },
        callback: onDeletePackageSuccess,
      };

      deleteRequest(payload);
    }
  };
  // const handleSavePackage = (formData: IPackage) => {
  //   const { saveRequest } = props;
  //   if (saveRequest) {
  //     showLoader();
  //     const payload: GENERIC.SaveRequestPayload<IPackage> = {
  //       data: {
  //         id: formData.id,
  //         name: formData.name,
  //         venueId: formData.venueId,
  //         photographyId: formData.photographyId,
  //         decorationId: formData.decorationId,
  //         cateringId: formData.cateringId,
  //         isActive: formData.isActive,
  //       },
  //       callback: onSavePackageSuccess,
  //     };
  //     saveRequest(payload);
  //   }
  // };
  const getPackage = (id: number) => {
    const { getRequest } = props;

    if (getRequest) {
      showLoader();
      const payload = {
        data: {id},
        callback: onGetPackageSuccess,
      };
      getRequest(payload);
    }
  };

  // search
  const handlePackageSearch = (event: any) => {
    setSearchText(event.target.value);
  };
  const handlePackageSearchKeyDown = (e: any) => {
    if (e?.key === "Enter") {
      setPageNo(1);
      getPackageList();
    }
  };
  
  // pagination
  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value);
    setPageNo(1);
  };
  const onPageChange = (e: any, value: number) => {
    setPageNo(value);
  };
  const getPaginationDetailText = () => {
    let rangeText = "";

    if (packageListMeta) {
      const minRange = (Number(pageNo) - 1) * Number(page) + 1;

      let maxRange = Number(pageNo) * Number(page);
      if (maxRange > Number(packageListMeta?.recordCount)) {
        maxRange = Number(packageListMeta?.recordCount);
      }
      const rangeString = `${minRange} - ${maxRange}`;
      rangeText = `Showing ${rangeString} of ${packageListMeta?.recordCount} entries`;
    }

    return rangeText;
  };


  const getListingScreen = () => {
    const list = get(props, "list.data", []);
    return <>
              <Grid
                container
                spacing={{ xs: "16px", lg: "20px", xl: "24px" }}
                className="content-container"
              >
                <Grid item xs={12}>
                  <Card>
                    <Box className="table-card-header">
                      <TextField
                        id="search"
                        variant="outlined"
                        className="search-input"
                        placeholder="Search by Name"
                        value={searchText}
                        onChange={handlePackageSearch}
                        onKeyDown={handlePackageSearchKeyDown}
                      />
                    </Box>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="name"
                              columnHeader="Package"
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="venueName"
                              columnHeader="VenueName"
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="photographyName"
                              columnHeader="PhotographyName"
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="cateringName"
                              columnHeader="CateringName"
                              columnDisplayName={columnDisplayName}
                            />
                            <EnhancedTableHead
                              order={order}
                              orderBy={orderBy}
                              onRequestSort={handleRequestSort}
                              columnName="decorationName"
                              columnHeader="Description"
                              columnDisplayName={columnDisplayName}
                            />
                            <TableCell
                              align="center"
                              sx={{
                                width: "152px",
                                [projectTheme.breakpoints.down("sm")]: {
                                  width: "112px",
                                },
                              }}
                            >
                              Action
                            </TableCell>                      
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {list && list?.map((row: IPackage) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <TableRow key={row?.id}>
                              <TableCell component="th" scope="row">
                                {row?.name}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.venueName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.photographyName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.cateringName}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.decorationName}
                              </TableCell>
                              <TableCell align="center">
                                <div className="table-actions">
                                  <IconButton
                                    onClick={() => handleAddEditPackage(row?.id)}
                                  >
                                    <img src={editIcon} alt="edit" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handlePackageDeleteModal(row?.id)}
                                  >
                                    <img src={deleteIcon} alt="delete" />
                                  </IconButton>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {list && list.length > 0 ? (
                      <Box className="custom-pagination">
                        <Box className="custom-rowperpage">
                          <Typography variant="body2" component="span">
                            Page:
                          </Typography>
                          <Select
                            id="pagination-select"
                            value={page}
                            onChange={handleChange}
                            MenuProps={{
                              className: "pagination-menu",
                            }}
                          >
                            {PAGE_SIZES?.map((pageSize) => (
                              <MenuItem
                                key={pageSize.value}
                                value={pageSize.value}
                                selected={pageSize?.selected}
                              >
                                {pageSize.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <Typography variant="body2" component="span">
                            {getPaginationDetailText()}
                          </Typography>{" "}
                        </Box>
                        <Pagination
                          count={packageListMeta?.pageCount}
                          variant="outlined"
                          shape="rounded"
                          page={pageNo}
                          onChange={onPageChange}
                          renderItem={(item) => (
                            <PaginationItem
                              slots={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                            />
                          )}
                        />
                      </Box>
                    ) : (
                      <Typography className="no-record-text">
                        No record found.
                      </Typography>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </>
  }

  return (
    <>
      <div>
        <Box className="content-header">
          <Typography variant="h2" className="heading">
            Package
          </Typography>
          {!showScreen && 
            <Button
              variant="contained"
              onClick={() => handleAddEditPackage(null)}
              className="btn-add"
            >
              <img src={plusLightIcon} alt="plus" />
              Add
            </Button>
          }
        </Box>
        
        {!showScreen ? 
          getListingScreen()
          :
          (<h1>Nothing to Show</h1>)
          // (<AddEditPackage
          //     isEditPackage={isEditPackage}
          //     showScreen={showScreen}
          //     handlePackageClose={handlePackageClose}
          //     handleAddPackage={handleSavePackage}
          //     currentPackageData={isEditPackage ? {...props.current} : {
          //       id: 0,
          //       description: "",
          //       name: "",
          //       price: undefined,
          //       isActive: true,
          //     }}
          //   />)
        }            
      </div>
      <DeleteConfirmationModal
        isOpenDeleteConfirmationModal={isOpenPackageDeleteModal}
        handleDeleteConfirmationModalClose={handlePackageDeleteCloseModal}
        deleteConfirmationMessage="Are you sure you want to delete package?"
        handleYesClick={handleDeletePackage}
      />
    </>
  );
};

export default PackageForm;
