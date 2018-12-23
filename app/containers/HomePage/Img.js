import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: black; /* fallback color */
  background-image: url("images/nyc.jpg");
  background-position: center;
  background-size: cover;
`;

export default Img;
