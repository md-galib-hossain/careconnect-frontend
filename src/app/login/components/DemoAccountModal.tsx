import React from "react";
import { Box, Modal, Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const credentials = [
  { role: 'Admin', email: 'admin@gmail.com', password: '123456' },
  { role: 'Doctor', email: 'doctor1@gmail.com', password: '123456' },
  { role: 'Patient', email: 'test@gmail.com', password: '123456' },
];

const DemoAccountModal = ({ open, setOpen }: any) => {
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="demo-accounts-modal">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Demo Accounts
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          Use the following credentials to log in as different roles:
        </Typography>
        <List>
          {credentials.map((credential, index) => (
            <ListItem key={index} >
                <Box sx={{ display : "flex", flexDirection: "column"}}>
                <ListItemText
                primary={`${credential.role} Role`}
                secondary={`Email: ${credential.email}`}

              />
              <ListItemText
             
                secondary={`Password: ${credential.password}`}

              />
                </Box>
             
              <ListItemSecondaryAction>
                <Box sx={{ display : "flex", flexDirection: "column"}}>

                <CopyToClipboard text={`${credential.email}`}>
                  <IconButton edge="end" aria-label="copy">
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
                <CopyToClipboard text={`${credential.password}`}>
                  <IconButton edge="end" aria-label="copy">
                    <ContentCopy />
                  </IconButton>
                </CopyToClipboard>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

export default DemoAccountModal;
