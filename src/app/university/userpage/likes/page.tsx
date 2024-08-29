import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Likes() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link href="/university/userpage/reviews">
        <Button>reviews</Button>
      </Link>
      <Button>likes</Button>
    </Box>
  );
}
