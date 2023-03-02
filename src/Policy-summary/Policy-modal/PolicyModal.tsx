import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./PolicyModal.css";
import { jsx } from "@emotion/react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface policyPropModal {
  policyTitle: string;
  className?: string;
  policySubTitle: string;
  policyButtonText?: string;
  modalIcon?: string;
}
const PolicyModal: React.FC<policyPropModal> = ({
  policyTitle,
  className,
  policySubTitle,
  policyButtonText,
  modalIcon,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="policy-modal">
          <Box className="modal-img">
            <img src={modalIcon} alt="" />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {policyTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {policySubTitle}
          </Typography>
          <Box className="modal-btn">{policyButtonText}</Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default PolicyModal;
