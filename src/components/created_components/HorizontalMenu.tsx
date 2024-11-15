import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { Bookmark, CalendarRange, MessageCircleMore } from 'lucide-react';

const HorizontalMenu = () => {
  const notifications = 5;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        padding: 2,
      }}
    >
      {/* Reservasi*/}
      <a href='#'>
        <IconButton
          sx={{
            backgroundColor: '#FEF0C7',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#DC6803',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
          >
          <CalendarRange />
        </IconButton>
      </a>

      {/* Ulasan Menu*/}
      <a href='../reviews'>
        <IconButton
          sx={{
            backgroundColor: '#FEF0C7',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#DC6803',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          <MessageCircleMore />
          <Badge
            badgeContent={notifications}
            color="error"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            >
          </Badge>
        </IconButton>
        </a>

      {/* Tersimpan*/}
      <a href='#'>
        <IconButton
          sx={{
            backgroundColor: '#FEF0C7',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#DC6803',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
          >
          <Bookmark />
        </IconButton>
      </a>
    </Box>
  );
};

export default HorizontalMenu;
