import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";

const HeroSection = () => {
  return (
    //raw css
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
        }}
      >
        {/* Background grid */}
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-95px",
            left: "-120px",
          }}
        >
          <Image src={assets.svgs.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Healthier Hearts{" "}
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Come From
        </Typography>
        <Typography
          color="primary.main"
          variant="h3"
          component="h1"
          fontWeight={600}
        >
          Preventive Care
        </Typography>
        <Typography sx={{ my: 4 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eum
          iusto consequatur eius, doloribus nesciunt facere aliquid eveniet et.
          Rerum maiores saepe cupiditate repellat recusandae atque sed. Saepe,
          vitae id?
        </Typography>
        <Box display="flex" gap={2}>
          <Button>Make Appointment</Button>
          <Button variant="outlined">Contact Us</Button>
        </Box>
      </Box>
      {/* right side parent box start */}
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 0,
        }}
      >
        {/* arrow sign svg */}
        <Box
          sx={{
            position: "absolute",
            left: "200px",
            top: "-30px",
          }}
        >
          <Image src={assets.svgs.arrow} width={100} height={100} alt="arrow" />
        </Box>
        {/* 2 doctor image parent box of right side */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {/* doctor image 1 */}
          <Box mt={4}>
            <Image
              width={240}
              height={380}
              src={assets.images.doctor1}
              alt="doctor1"
            />
          </Box>
          {/* doctor image 2 */}
          <Box>
            <Image
              width={240}
              height={350}
              src={assets.images.doctor2}
              alt="doctor1"
            />
          </Box>
        </Box>
        {/* doctor 3 */}
        <Box sx={{
          position: "absolute",top: "220px" , left: "150px"
        }}>
          <Image height={240} width={240} src={assets.images.doctor3} alt="doctor3" />
        </Box>
        {/*  stethoscope image  */}
        <Box sx={{
          position: "absolute", bottom : "-50px", right:"0",zIndex:"-1"
        }}>
          <Image height={180} width={180} src={assets.images.stethoscope} alt="doctor3" />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
