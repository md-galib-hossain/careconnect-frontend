import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { TDoctor } from "./TopRatedDoctortypes";
import Image from "next/image";
import Link from "next/link";

const TopRatedDoctors = async () => {
  const res = await fetch("http://localhost:5000/api/v1/doctor?page=1&limit=3");
  const { data: topRatedDoctors } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 10,
        
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400} sx={{ mt: 2 }}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top-quality surgery facilities right here.
        </Typography>
      </Box>
      <Container
        sx={{
          margin: "30px auto",
        }}
      >
        {/* parent grid for doctors card */}
        <Grid container spacing={2} my={5}>
          {topRatedDoctors.map((doctor: TDoctor) => (
            // grid items
            <Grid item key={doctor?.id} md={4}>
              <Card>
                <Box sx={{
                  width : "100%",
                  height :300,
                  '& img' : {
width : "100%",
height : "100%",
overflow : "hidden",
objectFit : "cover"
                  }
                }}>
                  <Image
                    width={500}
                    height={500}
                    src={
                      doctor?.profilePhoto ||
                      "https://codringtoncollege.edu.bb/wp-content/uploads/2021/04/avatar.png"
                    }
                    alt={`${doctor?.name}'s photo`}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor?.qualification}, {doctor?.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon /> {doctor?.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}
                >
                  {/* <Button>Book Now</Button> */}
                  <Button component={Link} href={`doctors/${doctor?.id}`} variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button variant="outlined" component={Link} href='/doctors'>View All</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
