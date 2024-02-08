import { Box } from "@mui/system";
import { Button, IconButton, Modal, Typography } from "@mui/material";
import { closeIcon } from "assets/images";

interface IDeleteConfirmationModalProps {
  isOpenDeleteConfirmationModal: boolean;
  handleDeleteConfirmationModalClose: any;
  deleteConfirmationMessage: string;
  handleYesClick: any;
}

const DeleteConfirmationModal: React.FC<IDeleteConfirmationModalProps> = ({
  isOpenDeleteConfirmationModal,
  handleDeleteConfirmationModalClose,
  deleteConfirmationMessage,
  handleYesClick,
}) => {
  return (
    <>
      <Modal
        open={isOpenDeleteConfirmationModal}
        onClose={handleDeleteConfirmationModalClose}
      >
        <Box className="common-modal delete-modal">
          <Box className="modal-header">
            <Typography variant="h4">Delete Confirmation</Typography>
            <IconButton onClick={handleDeleteConfirmationModalClose}>
              <img src={closeIcon} alt="close" />
            </IconButton>
          </Box>
          <Box className="modal-body">
            <Typography variant="h5">{deleteConfirmationMessage}</Typography>
          </Box>
          <Box className="modal-footer">
            <Button
              variant="contained"
              className="btn-save"
              onClick={handleYesClick}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              className="btn-cancel"
              onClick={handleDeleteConfirmationModalClose}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteConfirmationModal;