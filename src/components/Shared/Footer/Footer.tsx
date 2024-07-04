import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png";
const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent="center">
          <Typography color="#fff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#fff" component={Link} href="/healthplans">
            Health Plans
          </Typography>
          <Typography color="#fff" component={Link} href="/medicine">
            Medicine
          </Typography>
          <Typography color="#fff" component={Link} href="/diagnostics">
            Diagnostics
          </Typography>
          <Typography color="#fff" component={Link} href="/ngos">
            NGOs
          </Typography>
        </Stack>
        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Link href="/facebook">
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href="/facebook">
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href="/facebook">
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
          <Link href="/facebook">
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </Link>
        </Stack>
        {/* <div className="border-b-[1px] border-dashed"></div> */}
        <Box sx={{border : "1px dashed lightgray"}}>

        </Box>
        <Stack direction="row" gap={2} justifyContent="space-between" alignItems="center"py={3}>
          <Typography color="#fff" component="p">
            &copy;2024 Care Connect. All Rights Reserved.
          </Typography>
          <Typography
            color="#fff"
            variant="h4"
            fontWeight={600}
            component={Link}
            href="/"
          >
            Care{" "}
            <Box component="span" color="primary.main">
              Connect
            </Box>
          </Typography>
          <Typography color="#fff" component="p">
            Privacy Policy! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;