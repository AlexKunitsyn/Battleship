import React, {useState} from 'react';

import {styled} from "@mui/material";
import { Box, Button, Typography } from '@mui/material';


import Grid from "@mui/material/Grid";
import palette from '../../src/theme/palette';
import useTheme from "@mui/material/styles/useTheme";

const ProjectList = styled(Grid)(({ theme }) => ({

}));


const ProjectItem = styled(Grid)(({ theme, isHovered  }) => ({
   position:'relative',
    overflow: 'hidden',
    height:'300px',
    // flexBasis: isHovered ? '50%' : '25%', // Эквивалент sm=6 или sm=3
    transition: 'flex-basis 0.3s ease', // Плавная анимация изменения размера
    'img': {
        width:'100%',
        height:'100%',
        objectFit:'cover',
    }
}));

const Shadow = styled(Box)(({ theme, isHovered }) => ({
    position:'absolute',
    top:'0',
    left:'0',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
    background:'rgba(0,0,0, 0.5)',
    color:palette.mainColor,
    cursor:'pointer',
    opacity: isHovered ? 0 : 1, // Скрываем блок
    visibility: isHovered ? 'hidden' : 'visible',
    transition: 'opacity 0.3s ease, visibility 0.3s ease', // Плавное исчезновение

}));


const FutureProject = props => {
  const  {itemArr} = props;
  const theme = useTheme();

  const [hoveredIndex, setHoveredIndex] = useState(0);

  console.log(itemArr,'itemArr!!!!')

  return (
      <ProjectList container>
          {itemArr?.map((el, i) => (
              <ProjectItem item sm={hoveredIndex === i ? 6 : 3 }
               key={i}
               isHovered={hoveredIndex === i}
               onMouseEnter={() => setHoveredIndex(i)}
               onMouseLeave={() => setHoveredIndex(0)}
              >
                  {console.log(hoveredIndex,'-------hoveredIndex')}
                 <img src={el.image} alt={'img'}/>
                  {i !== 0 &&
                      <Shadow isHovered={hoveredIndex === i}>
                          <Typography variant='h6' color={palette.mainColor}>{el.name}</Typography>
                      </Shadow>
                  }
              </ProjectItem>
              ))}

      </ProjectList>
  )
};

export default FutureProject;