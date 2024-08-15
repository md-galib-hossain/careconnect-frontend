'use client';

import { Doctor } from '@/types/doctor';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const placeholder =
    'https://t4.ftcdn.net/jpg/06/32/90/79/360_F_632907942_M6CVHD1ivhUrWK1X49PkBlSH3ooNPsog.jpg';

  return (
    <Stack direction='row' gap={2} sx={{ bgcolor: '#f8f8f8', p: 2, borderRadius: 2, boxShadow: 2 }}>
      <Box sx={{ width: 220, height: 220, bgcolor: '#808080', borderRadius: 1, overflow: 'hidden' }}>
        <Image
          src={doctor?.profilePhoto || placeholder}
          alt='doctor image'
          width={220}
          height={220}
          style={{ height: '220px', width: '220px', objectFit: 'cover' }}
        />
      </Box>

      <Stack flex={1} justifyContent='space-between' sx={{ p: 1 }}>
        <Box>
          <Typography variant='h6' fontWeight={700}>
            {doctor?.name}
          </Typography>
          <Typography variant='body1' sx={{ my: 1, color: 'text.secondary' }}>
            {doctor?.designation}
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary', mb: 2, maxWidth: '45ch', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {doctor?.doctorSpecialties?.length
              ? 'Specialties: ' +
                doctor?.doctorSpecialties?.map(
                  (specialty) => specialty?.specialties?.title
                ).join(', ')
              : 'No specialties listed'}
          </Typography>
          <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
            Fee: ${doctor?.appointmentFee}
          </Typography>
        </Box>

        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mt: 2 }}>
          <Box>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Working at: <strong>{doctor?.currentWorkingPlace}</strong>
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Experience: <strong>{doctor?.experience}+ years</strong>
            </Typography>
          </Box>
          <Button variant='contained' color='primary' component={Link} href={`/doctors/${doctor.id}`}>
            View Details
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DoctorCard;
