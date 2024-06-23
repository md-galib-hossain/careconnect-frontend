import React from 'react';
import notfoundimg from "./../assets/notfound2.svg";
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Box sx={{ width: "70%", mb: 3 }}>
        <Image src={notfoundimg} alt="not found" layout="responsive" />
      </Box>
      <Typography variant="h4" fontWeight="bold">
        Page is under construction
      </Typography>
      <Button variant='text' component={Link} href={'/'}> Go Back</Button>
    </Box>
  );
}

export default NotFoundPage;
