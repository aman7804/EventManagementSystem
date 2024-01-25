import { Typography } from "@mui/material";
import { FOOTER_TEXT } from "utils/constants";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <Typography variant="body2">{FOOTER_TEXT}</Typography>
    </footer>
  );
};

export default Footer;