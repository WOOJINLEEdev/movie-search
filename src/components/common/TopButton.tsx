import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowUp } from 'react-icons/io';

const TopButton = () => {
  const [scrollY, setScrollY] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollY);

    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  function handleScrollY() {
    if (window.scrollY > 299) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  }

  const handleTopBtnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <TopBtn
      type='button'
      className={scrollY ? 'tob_btn' : 'hidden'}
      onClick={handleTopBtnClick}
      aria-label='Top Button'
    >
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
  color: #333;
  background: #efefef;
  padding: 0;
  z-index: 100;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.5s;
  -webkit-transition: opacity 0.5s;

  svg {
    width: 25px;
    height: 25px;
  }

  &.hidden {
    background-color: #efefef;
    opacity: 0;
    transition: opacity 0.5s;
    -webkit-transition: opacity 0.5s;
    cursor: auto;
  }
`;
