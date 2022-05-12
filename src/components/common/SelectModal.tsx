import { MouseEvent } from 'react';
import styled from 'styled-components';

interface ISelectModalProps {
  isBookmark: boolean;
  handleSelctBtnClick: () => void;
  handleCancelBtnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SelectModal = ({ isBookmark, handleSelctBtnClick, handleCancelBtnClick }: ISelectModalProps) => {
  return (
    <SelectContainer>
      <button type='button' className='cancel_btn' onClick={handleCancelBtnClick}>
        취소
      </button>
      <button type='button' className='select_btn' onClick={handleSelctBtnClick}>
        {isBookmark === true ? '즐겨찾기 해제' : '즐겨찾기'}
      </button>
    </SelectContainer>
  );
};

export default SelectModal;

const SelectContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-evenly;
  right: 0;
  bottom: 10px;
  width: 30%;
  min-width: 180px;

  .select_btn,
  .cancel_btn {
    width: 48%;
    height: 50px;
    padding: 10px 5px;
    border-radius: 5px;
    font-size: 12px;
  }

  .select_btn {
    width: 50%;
    max-width: 100px;
    background: #008000;
    font-weight: bold;
    color: #fff;
  }

  .cancel_btn {
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

    .select_btn,
    .cancel_btn {
      width: 100%;
      height: 30px;
      padding: 5px;
      font-size: 11px;
    }
  }
`;
