import styled from 'styled-components';

import LoadingImg from 'assets/img/Fading circles.gif';

const Loading = () => {
  return (
    <LoadingContainer>
      <img src={LoadingImg} className='loadingImage' alt='Loading...' />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  background-color: #ffffff;
  opacity: 0.7;

  .loadingImage {
    position: absolute;
    top: 50%;
    right: auto;
    bottom: auto;
    left: 50%;
    z-index: 100;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
`;
