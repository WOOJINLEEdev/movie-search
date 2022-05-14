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
  right: 2%;
  bottom: 100px;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0;
  color: #333333;
  cursor: pointer;
  background: #efefef;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 20%);
  opacity: 1;
  transition: opacity 0.5s;

  svg {
    width: 25px;
    height: 25px;
  }

  &.hidden {
    cursor: auto;
    background-color: #efefef;
    opacity: 0;
    transition: opacity 0.5s;
  }
`;
