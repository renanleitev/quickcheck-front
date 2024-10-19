import { Tabs, Tab } from '@mui/material';
import styled from 'styled-components';
import colors from '../../config/colors';

const tabWidth = '10rem';

export const StyledTabs = styled(Tabs)({
  borderBottom: `2px solid ${colors.primaryWhiteColor}`,
  '& .MuiTabs-indicator': {
    backgroundColor: colors.primaryWhiteColor
  }
});

export const StyledTab = styled(Tab)({
  width: tabWidth,
  '&.Mui-selected': {
    backgroundColor: colors.primaryWhiteColor
  },
  '&.MuiTab-textColorPrimary': {
    color: colors.primaryWhiteColor
  }
});
