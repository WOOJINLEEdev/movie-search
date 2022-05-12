import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import store from 'store';

import Item, { bookmarkState } from 'components/common/Item';

const Bookmark = () => {
  const myBookmark = useRecoilValue(bookmarkState);
  const setMyBookmark = useSetRecoilState(bookmarkState);

  const handleResetBtnClick = () => {
    store.remove('bookmark');
    setMyBookmark([]);
  };

  return (
    <SectionContainer>
      <h2 className='section_title'>내 즐겨찾기</h2>

      <div className='bookmark_info'>
        <p>{myBookmark.length > 0 ? <span className='bookmark_count'>총 {myBookmark.length}개</span> : ''}</p>

        <button type='button' className='reset_btn' onClick={handleResetBtnClick}>
          전체 해제
        </button>
      </div>

      <ul>
        {myBookmark.length > 0 ? (
          myBookmark.map((bookmark) => {
            return <Item key={`bookmark_${bookmark.imdbID}`} result={bookmark} />;
          })
        ) : (
          <li className='bookmark_no_data'>등록한 즐겨찾기가 없습니다.</li>
        )}
      </ul>
    </SectionContainer>
  );
};

export default Bookmark;

const SectionContainer = styled.section`
  position: relative;
  padding: 20px;

  .section_title {
    font-size: 30px;
    padding: 20px 0;
  }

  .bookmark_info {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .bookmark_count {
      font-weight: bold;
      font-size: 18px;
      line-height: 40px;
    }

    .reset_btn {
      height: 40px;
      background: #d4d4d4;
      font-weight: 600;
      padding: 10px;
      border-radius: 5px;
    }
  }

  .bookmark_no_data {
    text-align: center;
    min-height: calc(100vh - 320px);
    line-height: calc(100vh - 320px);
  }
`;
