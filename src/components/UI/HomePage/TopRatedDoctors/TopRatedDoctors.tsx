import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Rating,
  styled,
  Typography,
} from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Image from "next/image";
import Link from "next/link";
import { TDoctor } from "./TopRatedDoctortypes";

// Custom Icons for Rating
const customIcons: {
  [index: number]: { icon: React.ReactElement; label: string };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: "Very Satisfied",
  },
};

function SingleRatingIcon({ value }: { value: number }) {
  return customIcons[value] ? customIcons[value].icon : null;
}

const TopRatedDoctors = async () => {
  // Fetching top-rated doctors
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?page=1&limit=3`
  );
  const { data: topRatedDoctors } = await res.json();
  console.log(topRatedDoctors);
  return (
    <Box sx={{ my: 10 }}>
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
      //  sx={{ margin: "30px auto" }}
       
       >
        <Grid container spacing={2} my={5} justifyContent="center">
          {topRatedDoctors.map((doctor: TDoctor) => (
            <Grid item key={doctor.id} md={4}>
              <Card sx={{ width: 345 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                >
                  <Image
                    width={500}
                    height={500}
                    src={
                      doctor.profilePhoto ||
                      "https://codringtoncollege.edu.bb/wp-content/uploads/2021/04/avatar.png"
                    }
                    alt={`${doctor.name}'s photo`}
                  />
                </Box>
                <CardContent sx={{ py: 1 }}>
                  <Box display="flex" justifyContent={"space-between"}>
                    <Typography gutterBottom variant="h5" component="div">
                      {doctor.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`For ${doctor?.experience}  ${
                      doctor?.experience > 1 ? "years" : "year"
                    }`}
                  </Typography>
                  <Box display="flex">
                    <Rating
                      name="simple-controlled"
                      value={doctor?.averageRating}
                      readOnly
                      sx={{
                        color: "primary.main",
                      }}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    py: 0,
                    paddingBottom: "10px",
                  }}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Typography variant="h5" fontWeight={700}>
                      ${doctor?.appointmentFee}
                      <Typography
                        component={"span"}
                        fontSize={"small"}
                        color="text.secondary"
                      >
                        (Including VAT)
                      </Typography>{" "}
                    </Typography>
                  </Box>

                  <Box>
                    <Button
                      component={Link}
                      href={`doctors/${doctor.id}`}
                      variant="text"
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Button variant="outlined" component={Link} href="/doctors">
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
