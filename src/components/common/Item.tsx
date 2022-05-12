import { MouseEvent, useState } from 'react';
import { atom, useRecoilState } from 'recoil';
import styled from 'styled-components';
import store from 'store';
import { HiOutlineBookmark } from 'react-icons/hi';

import { IResult } from 'components/home/List';
import SelectModal from 'components/common/SelectModal';

export const bookmarkState = atom<IResult[]>({
  key: '#bookmarkState',
  default: store.get('bookmark') || [],
});

interface Props {
  result: IResult;
}

const Item = ({ result }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bookmark, setBookmark] = useRecoilState(bookmarkState);

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
    <LiContainer key={result.imdbID} className='result_item' onClick={handleResultItemClick}>
      <div className='result_content'>
        <img src={result.Poster} alt={result.Title} />

        <div className='content_wrap'>
          <div className='content_text'>
            <p className='content_title'>
              {result.Title} ({result.Year})
            </p>
            <span className={`content_type ${result.Type}`}>{capitalizeFirstLetter(result.Type)}</span>
          </div>

          <div className='content_bookmark'>
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
  border-radius: 5px;
  cursor: pointer;

  & + & {
    margin-top: 20px;
  }

  .result_content {
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

    .content_wrap {
      display: flex;
      flex-direction: column;
      width: 80%;
      padding-left: 10px;

      .content_text {
        display: flex;
        align-items: center;
        min-height: 20px;
        line-height: 20px;

        svg {
          width: 36px;
          height: 40px;
        }

        .content_title {
          overflow: hidden;
          display: -webkit-box;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          max-height: 60px;
          text-overflow: ellipsis;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        .content_type {
          display: inline-block;
          padding: 0 3px;
          font-size: 12px;
          font-weight: bold;
          border-radius: 5px;
          border: 2px solid #333;
          color: #333;
          margin-left: 5px;

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

      .content_bookmark {
        padding: 10px 0;
        height: 40px;

        svg {
          width: 40px;
          height: 100%;
        }
      }
    }
  }
`;
