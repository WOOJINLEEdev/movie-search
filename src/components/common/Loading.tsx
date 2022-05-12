import styled from 'styled-components';

import LoadingImg from 'assets/img/Fading circles.gif';

const Loading = () => {
  return (
    <LoadingContainer>
      <img src={LoadingImg} className='loading_image' alt='Loading...' />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  position: fixed;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  opacity: 0.7;
  background-color: #fff;
  text-align: center;
  z-index: 99;

  .loading_image {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
`;
