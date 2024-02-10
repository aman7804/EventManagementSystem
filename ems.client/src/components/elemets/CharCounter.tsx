import React, { useEffect, useState } from 'react';
import { TextField, Typography, Box, CircularProgress } from '@mui/material';

interface ICharacterCounterProps{
    maxLength: number;
    // onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
    text?: string;
    isLimitReached:(isLimitOver: boolean)=>void
}

const CharacterCounter = (props: ICharacterCounterProps) => {
    const {text, maxLength, isLimitReached} = props
    const textLength = text?.length || 0; //  character limit
    const  [isLimitOver, setIsLimitOver] = useState(false);
    
    console.log(props)
//   let texts = props.text?.length || 0/
  const remainingChars = maxLength - textLength;
  const circleDiameter = 30;
console.log("charCount: ",text)
  useEffect(() => {
    if (remainingChars < 0) {
        setIsLimitOver(true);
        isLimitReached(true);
    }
    else{
        setIsLimitOver(false)
        isLimitReached(false);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [remainingChars]);

//   const handleChange = (event) => {
//     setText(event.target.value);
//   };
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box position="relative" sx={{mr:2}} width={circleDiameter} height={circleDiameter}>
          <CircularProgress
            variant="determinate"
            value={(textLength / props.maxLength) * 100}
            size={circleDiameter}
            thickness={4}
            color={isLimitOver ? 'error' : 'primary'}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="subtitle2" color="textSecondary">
              {remainingChars}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CharacterCounter;
