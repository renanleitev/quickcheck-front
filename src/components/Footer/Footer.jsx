import styled from 'styled-components';
import colors from '../../config/colors';

const BarFooter = styled.div`
  background-color: ${colors.primaryColor};
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Footer() {
  return <BarFooter />;
}
