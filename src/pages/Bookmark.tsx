import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Item, { bookmarkState } from 'components/Item';

const Bookmark = () => {
  const myBookmark = useRecoilValue(bookmarkState);

  return (
    <SectionContainer>
      <h2 className='section_title'>내 즐겨찾기</h2>
      <ul>
        {myBookmark.length > 0 ? (
          myBookmark.map((bookmark) => {
            return <Item key={`bookmark_${bookmark.imdbID}`} result={bookmark} />;
          })
        ) : (
          <li>등록한 즐겨찾기가 없습니다.</li>
        )}
      </ul>
    </SectionContainer>
  );
};

export default Bookmark;

const SectionContainer = styled.section`
  padding: 20px;

  .section_title {
    font-size: 30px;
    padding: 20px 0;
  }
`;
