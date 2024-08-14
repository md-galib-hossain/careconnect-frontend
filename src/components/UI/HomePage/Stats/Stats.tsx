"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AnimatedCounter } from "react-animated-counter";

// Custom hook to animate numbers with random increments and delays
const useAnimatedCounter = (start: number, end: number): number => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let incrementTimeout: NodeJS.Timeout;

    const randomIncrements = [1, 2, 3, 4, 6, 7, 8, 10];
    const randomDelays = [500, 750, 1000, 1250, 1500];

    const incrementCounter = () => {
      const randomIncrement = randomIncrements[Math.floor(Math.random() * randomIncrements.length)];
      const newCount = Math.min(count + randomIncrement, end);

      setCount(newCount);

      if (newCount >= end) {
        setCount(start); // Reset the count to start when the end is reached
      }

      // Schedule the next increment
      const randomDelay = randomDelays[Math.floor(Math.random() * randomDelays.length)];
      incrementTimeout = setTimeout(incrementCounter, randomDelay);
    };

    incrementTimeout = setTimeout(incrementCounter, 1000);

    return () => {
      clearTimeout(incrementTimeout); // Clear the timeout when the component unmounts
    };
  }, [count, start, end]);

  return count;
};

interface StatsProps {
  doctorLimit?: number;
  serviceLimit?: number;
  patientLimit?: number;
  awardLimit?: number;
}

const Stats: React.FC<StatsProps> = ({ doctorLimit = 150, serviceLimit = 300, patientLimit = 100000, awardLimit = 400 }) => {
  const expertDoctors = useAnimatedCounter(1, doctorLimit);
  const expertServices = useAnimatedCounter(1, serviceLimit);
  const happyPatients = useAnimatedCounter(2000, patientLimit);
  const bestAwardWinners = useAnimatedCounter(1, awardLimit);

  return (
    <Container>
      <Box
        sx={{
          backgroundImage: "linear-gradient(45deg, blue, cyan)",
          borderRadius: "20px",
          margin: "50px auto",
        }}
      >
        <Grid container spacing={2} textAlign="center" p={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h1" fontWeight={500} color="white">
              40+
            </Typography>
            <Typography variant="h6" component="h1" fontWeight={500} color="white">
              Expert Doctors
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h1" fontWeight={500} color="white">
              150+
            </Typography>
            <Typography variant="h6" component="h1" fontWeight={500} color="white">
              Expert Services
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box display="flex" justifyContent="center" height={"56px"}>
              <AnimatedCounter containerStyles={{ margin: "0px" }} decimalPrecision={0} value={happyPatients} color="white" incrementColor="white" fontSize="3rem" />
              <Typography variant="h3" component="h1" fontWeight={500} color="white">
                +
              </Typography>
            </Box>
            <Typography variant="h6" component="h1" fontWeight={500} color="white">
              Happy Patients
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" component="h1" fontWeight={500} color="white">
              200+
            </Typography>
            <Typography variant="h6" component="h1" fontWeight={500} color="white">
              Best Award Winners
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Stats;
