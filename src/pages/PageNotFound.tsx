import styled from 'styled-components';

const PageNotFound = () => {
  return <DivContainer>This page could not be found.</DivContainer>;
};

export default PageNotFound;

const DivContainer = styled.div`
  min-height: calc(100vh - 130px);
  font-weight: bold;
  line-height: calc(100vh - 130px);
  text-align: center;
`;
