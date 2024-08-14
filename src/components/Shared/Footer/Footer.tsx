import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import facebookIcon from "@/assets/landing_page/facebook.png"; 
import instagramIcon from "@/assets/landing_page/instagram.png"; 
import linkedinIcon from "@/assets/landing_page/linkedin.png";
import twitterIcon from "@/assets/landing_page/twitter.png"; 

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Grid container spacing={4}>
          {/* Get in Touch Section */}
          <Grid item xs={12} md={3}>
            <Typography color="#fff" fontWeight={600} gutterBottom>
              GET IN TOUCH
            </Typography>
            <Typography color="#fff" component="a" href="mailto:support@careconnect.com">
              mdgalibhossain23@gmail.com
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <Link href="https://www.facebook.com/careconnect">
                <Image src={facebookIcon} width={24} height={24} alt="facebook" />
              </Link>
              <Link href="https://www.instagram.com/careconnect">
                <Image src={instagramIcon} width={24} height={24} alt="instagram" />
              </Link>
              <Link href="https://www.twitter.com/careconnect">
                <Image src={twitterIcon} width={24} height={24} alt="twitter" />
              </Link>
              <Link href="https://www.linkedin.com/in/md-galib-hossain">
                <Image src={linkedinIcon} width={24} height={24} alt="linkedin" />
              </Link>
            </Stack>
          </Grid>

          {/* Solutions Section */}
          <Grid item xs={12} md={3}>
            <Typography color="#fff" fontWeight={600} gutterBottom>
              SOLUTIONS
            </Typography>
            <Stack spacing={1}>
              <Typography color="#fff" component={Link} href="/consultations">
                Consultations
              </Typography>
              <Typography color="#fff" component={Link} href="/wellness-plans">
                Wellness Plans
              </Typography>
              <Typography color="#fff" component={Link} href="/health-assessments">
                Health Assessments
              </Typography>
            </Stack>
          </Grid>

          {/* Resources Section */}
          <Grid item xs={12} md={3}>
            <Typography color="#fff" fontWeight={600} gutterBottom>
              RESOURCES
            </Typography>
            <Stack spacing={1}>
              <Typography color="#fff" component={Link} href="/blog">
                Blog
              </Typography>
              <Typography color="#fff" component={Link} href="/articles">
                Articles
              </Typography>
              <Typography color="#fff" component={Link} href="/case-studies">
                Case Studies
              </Typography>
              <Typography color="#fff" component={Link} href="/webinars">
                Webinars
              </Typography>
              <Typography color="#fff" component={Link} href="/guides">
                Guides
              </Typography>
            </Stack>
          </Grid>

          {/* Company Section */}
          <Grid item xs={12} md={3}>
            <Typography color="#fff" fontWeight={600} gutterBottom>
              COMPANY
            </Typography>
            <Stack spacing={1}>
              <Typography color="#fff" component={Link} href="/about">
                About Us
              </Typography>
              <Typography color="#fff" component={Link} href="/careers">
                Careers
              </Typography>
              <Typography color="#fff" component={Link} href="/faq">
                FAQ
              </Typography>
              <Typography color="#fff" component={Link} href="/terms">
                Terms of Use
              </Typography>
              <Typography color="#fff" component={Link} href="/privacy">
                Privacy Notice
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ border: "1px dashed lightgray", my: 3 }}></Box>

        {/* Footer Bottom */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="#fff" component="p">
            &copy;2024 Care Connect. All Rights Reserved.
          </Typography>
          <Typography color="#fff" variant="h4" fontWeight={600} component={Link} href="/">
            Care{" "}
            <Box component="span" color="primary.main">
              Connect
            </Box>
          </Typography>
          <Typography color="#fff" component={Link} href="/privacy">
            Privacy Policy | Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
