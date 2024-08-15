'use client';

import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useGetAllSpecialtiesQuery } from '@/redux/api/specialtiesApi';

const ScrollCategory = ({ specialties }: { specialties?: string|undefined }) => {
  const { data } = useGetAllSpecialtiesQuery(undefined);
  const [value, setValue] = useState(specialties || 'all');
  const router = useRouter();

  useEffect(() => {
    setValue(specialties || 'all');
  }, [specialties]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    router.push(`/doctors?specialties=${newValue !== 'all' ? newValue : ''}`);
  };

  return (
    <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper', mx: 'auto' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='scrollable auto tabs example'
      >
        <Tab
          key='all'
          label='All'
          value='all'
          sx={{ fontWeight: 600 }}
        />
        {data?.data?.map((specialty: any) => (
          <Tab
            key={specialty.id}
            label={specialty.title}
            value={specialty.title}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default ScrollCategory;
