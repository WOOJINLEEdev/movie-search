import { MouseEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import store from 'store';
import { HiOutlineBookmark } from 'react-icons/hi';
import { DraggableProvided } from 'react-beautiful-dnd';

import { IResult } from 'components/home/List';
import SelectModal from 'components/common/SelectModal';
import { bookmarkState } from 'state';

interface IProps {
  result: IResult;
  innerProvided?: DraggableProvided;
}

const Item = ({ result, innerProvided }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookmark, setBookmark] = useRecoilState<IResult[]>(bookmarkState);

  const handleResultItemClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleCancelBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleSelctBtnClick = () => {
    setBookmark((prevBookmark) => {
      const foundIndex = prevBookmark.findIndex((item) => item.imdbID === result.imdbID);
      if (foundIndex < 0) {
        store.set('bookmark', [...prevBookmark, { ...result, bookmark: true }]);
        return [...prevBookmark, { ...result, bookmark: true }];
      }

      const clone = JSON.parse(JSON.stringify(prevBookmark));
      clone.splice(foundIndex, 1);
      store.set('bookmark', clone);

      return clone;
    });
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <LiContainer
      key={result.imdbID}
      className='result_item'
      onClick={handleResultItemClick}
      ref={innerProvided?.innerRef}
      {...innerProvided?.draggableProps}
      {...innerProvided?.dragHandleProps}
    >
      <div className='resultContent'>
        <img src={result.Poster} alt={result.Title} />

        <div className='contentWrap'>
          <div className='contentText'>
            <p className='contentTitle'>
              {result.Title} ({result.Year})
            </p>
            <span className={`contentType ${result.Type}`}>{capitalizeFirstLetter(result.Type)}</span>
          </div>

          <div className='contentBookmark'>
            <HiOutlineBookmark fill={result.bookmark ? '#006000' : '#fff'} />
          </div>
        </div>
      </div>

      {isModalOpen ? (
        <SelectModal
          isBookmark={result.bookmark}
          handleSelctBtnClick={handleSelctBtnClick}
          handleCancelBtnClick={handleCancelBtnClick}
        />
      ) : (
        ''
      )}
    </LiContainer>
  );
};

export default Item;

const LiContainer = styled.li`
  position: relative;
  width: 100%;
  height: 150px;
  cursor: pointer;
  border-radius: 5px;

  & + & {
    margin-top: 20px;
  }

  .resultContent {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    img {
      width: 20%;
      min-width: 80px;
      max-width: 100px;
      height: 100%;
      border-radius: 5px;
    }

    .contentWrap {
      display: flex;
      flex-direction: column;
      width: 80%;
      padding-left: 10px;

      .contentText {
        display: flex;
        align-items: center;
        min-height: 20px;
        line-height: 20px;

        svg {
          width: 36px;
          height: 40px;
        }

        .contentTitle {
          display: -webkit-box;
          max-height: 60px;
          overflow: hidden;
          font-size: 16px;
          font-weight: bold;
          line-height: 20px;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .contentType {
          display: inline-block;
          padding: 0 3px;
          margin-left: 5px;
          font-size: 12px;
          font-weight: bold;
          color: #333333;
          border: 2px solid #333333;
          border-radius: 5px;

          &.movie {
            background: #f9c817;
            border: 0;
          }

          &.series {
            background: #87b815;
            border: 0;
          }
        }
      }

      .contentBookmark {
        height: 40px;
        padding: 10px 0;

        svg {
          width: 40px;
          height: 100%;
        }
      }
    }
  }
`;
