import { MouseEvent } from 'react';
import styled from 'styled-components';

interface IProps {
  isBookmark: boolean;
  handleSelctBtnClick: () => void;
  handleCancelBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SelectModal = ({ isBookmark, handleSelctBtnClick, handleCancelBtnClick }: IProps) => {
  return (
    <SelectContainer>
      <button type='button' className='cancelBtn' onClick={handleCancelBtnClick}>
        취소
      </button>
      <button type='button' className='selectBtn' onClick={handleSelctBtnClick}>
        {isBookmark === true ? '즐겨찾기 해제' : '즐겨찾기'}
      </button>
    </SelectContainer>
  );
};

export default SelectModal;

const SelectContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: space-evenly;
  width: 30%;
  min-width: 180px;

  .selectBtn,
  .cancelBtn {
    width: 48%;
    height: 50px;
    padding: 10px 5px;
    font-size: 12px;
    border-radius: 5px;
  }

  .selectBtn {
    width: 50%;
    max-width: 100px;
    font-weight: bold;
    color: #ffffff;
    background: #008000;
  }

  .cancelBtn {
    max-width: 100px;
    color: ${(props) => props.theme.colors?.titleColor};
    border: ${(props) => props.theme.colors?.borderColor};
  }

  @media only screen and (min-width: 320px) and (max-width: 500px) {
    & {
      flex-direction: column;
      justify-content: space-between;
      width: 100px;
      min-width: 100px;
      height: 70px;
    }

    .selectBtn,
    .cancelBtn {
      width: 100%;
      height: 30px;
      padding: 5px;
      font-size: 11px;
    }
  }
`;
