// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import NavigationIcon from '@mui/icons-material/Navigation';

// export default function FloatingActionButtons() {
//   return (
//     <Box
//   sx={{
//     position: 'absolute',
//     top: '100px',
//     left: '-165px',
//     '& > :not(style)': { m: 1 }
//   }}
// >
//   <Fab variant="extended">
//     modificações
//   </Fab>
// </Box>

//   );
// }

import { Fab, Box, styled } from '@mui/material';
import { keyframes } from '@mui/styled-engine';

const blink = keyframes`
  0% {
    background-color: #ff9800; /* Laranja fraco */
  }
  50% {
    background-color: #ff8f00; /* Laranja mais forte */
  }
  100% {
    background-color: #ff9800; /* Laranja fraco */
  }
`;

const BlinkingWarningFab = styled(Fab)({
    backgroundColor: '#ff9800', 
    color: 'white', 
    animation: `${blink} 1s infinite`, 
    width: "100px",
    height: "40px",
    padding:"0px 60px",
    borderRadius:"50px"
});

export default function FloatingActionButtons({onclick}) {
    return (
        <Box
            sx={{
                width: "100px",
                marginTop:"60px",
                '& > :not(style)': { m: 1 }
            }}
        >
            <BlinkingWarningFab aria-label="warning" >
                Alterações
            </BlinkingWarningFab>
        </Box>
    );
}
