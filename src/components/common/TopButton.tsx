import styled from 'styled-components';
import { IoIosArrowUp } from 'react-icons/io';

const TopButton = () => {
  const handleTopBtnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <TopBtn type='button' className='tob_btn' onClick={handleTopBtnClick} aria-label='Top Button'>
      <IoIosArrowUp />
    </TopBtn>
  );
};

export default TopButton;

const TopBtn = styled.button`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 2%;
  bottom: 100px;
  width: 50px;
  height: 50px;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.colors?.titleColor};
  background: ${(props) => props.theme.colors?.bgColor};
  padding: 0;
  z-index: 100;
  cursor: pointer;
  opacity: 0;

  svg {
    width: 25px;
    height: 25px;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #efefef;
      transition: opacity 0.3s;
      -webkit-transition: opacity 0.3s;
      opacity: 1;
    }

    &:hover > svg {
      fill: #333;
    }
  }
`;
