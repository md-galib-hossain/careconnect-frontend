"use client";

import { useEffect, useState } from 'react';
import DashedLine from '@/components/UI/Doctor/DashedLine';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import DoctorScheduleSlots from '../components/DoctorScheduleSlots';
import { useGetSingleDoctorQuery } from '@/redux/api/doctorsApi';

type PropTypes = {
    params: {
        id: string;
    };
};

const InfoBoxStyles = {
    background: 'linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)',
    width: '100%',
    p: 3,
    '& h6': {
        color: 'primary.main',
    },
    '& p': {
        color: 'secondary.main',
    },
};

const DoctorsProfilePage = ({ params }: PropTypes) => {
    const { data: doctor, isLoading, error } = useGetSingleDoctorQuery(params.id);
    const [specialties, setSpecialties] = useState<string[]>([]);

    useEffect(() => {
        if (doctor) {
            const fetchedSpecialties = doctor.doctorSpecialties?.map((ds: any) => ds.specialties.title) || [];
            setSpecialties(fetchedSpecialties);
        }
    }, [doctor]);

    if (isLoading) {
        return (
            <Container>
                <Typography variant='h4' fontWeight={700} textAlign='center' my={5}>
                    Loading...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant='h4' fontWeight={700} textAlign='center' my={5}>
                    Error loading doctor's profile
                </Typography>
            </Container>
        );
    }
console.log(doctor)
    return (
        <Container>
            <Box my={5}>
                <Typography variant='h4' fontWeight={700} textAlign='center'>
                    Doctor&apos;s Profile Details
                </Typography>
             
            </Box>

            <Box>
                <Box sx={{ my: 10, p: 3, bgcolor: '#f8f8f8' }}>
                    <Stack sx={{ bgcolor: 'white', p: 3 }}>
                        <Stack direction='row' gap={3}>
                            <Box sx={{ width: 281, height: 281, bgcolor: '#808080' }}>
                                {doctor?.profilePhoto ? (
                                    <Image
                                        src={doctor.profilePhoto}
                                        alt='doctor image'
                                        width={281}
                                        height={281}
                                        style={{ height: '281px' }}
                                    />
                                ) : (
                                    <Typography>No Image Available</Typography>
                                )}
                            </Box>
                            <Stack flex={1}>
                                <Box>
                                    <Typography variant='h6' fontWeight={600}>
                                        {doctor?.name}
                                    </Typography>
                                    <Typography sx={{ my: '2px', color: 'secondary.main' }}>
                                        {doctor?.designation}
                                    </Typography>
                                    <Stack direction='row' alignItems='center' gap={2} mt={1}>
                                        <Typography noWrap sx={{ maxWidth: '45ch' }}>
                                            Specialties in
                                        </Typography>
                                        <Box>
                                            {specialties.map((sp) => (
                                                <Chip key={sp} label={sp} color='primary' sx={{ mr: 1 }} />
                                            ))}
                                        </Box>
                                    </Stack>
                                </Box>

                                <DashedLine />
                                <Box>
                                    <Typography sx={{ my: '2px' }}>Working at</Typography>
                                    <Typography>{doctor?.currentWorkingPlace}</Typography>
                                </Box>
                                <DashedLine />
                                <Box>
                                    <Stack direction='row'>
                                        <Typography
                                            fontWeight={'bold'}
                                            sx={{ color: '#141414' }}
                                        >
                                            Consultation Fee
                                        </Typography>
                                        <Stack sx={{ ml: 2 }}>
                                            <Typography>
                                                ${doctor?.appointmentFee} (incl. Vat)
                                            </Typography>
                                            <Typography>Per consultation</Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} gap={3} justifyContent={'space-between'} sx={{ my: 4 }}>
                            <Box sx={InfoBoxStyles}>
                                <Typography variant='h6'>Total Experience</Typography>
                                <Typography>{doctor?.experience}+ Years</Typography>
                            </Box>
                            <Box sx={InfoBoxStyles}>
                                <Typography variant='h6'>Qualification</Typography>
                                <Typography>{doctor?.qualification}</Typography>
                            </Box>
                            <Box sx={InfoBoxStyles}>
                                <Typography variant='h6'>Average Rating</Typography>
                                <Typography>{doctor?.averageRating}</Typography>
                            </Box>
                            <Box sx={InfoBoxStyles}>
                                <Typography variant='h6'>Contact Number</Typography>
                                <Typography>{doctor?.contactNumber}</Typography>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <DoctorScheduleSlots id={doctor?.id} />
        </Container>
    );
};

export default DoctorsProfilePage;
