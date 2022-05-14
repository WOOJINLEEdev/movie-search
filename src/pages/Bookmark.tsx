import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import store from 'store';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableStateSnapshot,
  DroppableProvided,
} from 'react-beautiful-dnd';

import Item from 'components/common/Item';
import { bookmarkState } from 'state';

const Bookmark = () => {
  const { pathname } = useLocation();

  const [myBookmark, setMyBookmark] = useRecoilState(bookmarkState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleResetBtnClick = () => {
    store.remove('bookmark');
    setMyBookmark([]);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = JSON.parse(JSON.stringify(myBookmark));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMyBookmark(items);
    store.set('bookmark', items);
  };

  return (
    <SectionContainer>
      <h2 className='sectionTitle'>내 즐겨찾기</h2>

      <div className='bookmarkInfo'>
        <p>{myBookmark.length > 0 ? <span className='bookmarkCount'>총 {myBookmark.length}개</span> : ''}</p>

        <button type='button' className='resetBtn' onClick={handleResetBtnClick}>
          전체 해제
        </button>
      </div>

      {myBookmark.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='bookmark'>
            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
              <ul
                className={snapshot.isDraggingOver ? 'draggingOver' : ''}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {myBookmark?.map((bookmark, i) => {
                  return (
                    <Draggable key={`bookmark_${bookmark.imdbID}`} draggableId={bookmark.imdbID} index={i}>
                      {(innerProvided) => (
                        <Item key={`bookmark_${bookmark.imdbID}`} result={bookmark} innerProvided={innerProvided} />
                      )}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className='bookmarkNoData'>등록한 즐겨찾기가 없습니다.</div>
      )}
    </SectionContainer>
  );
};

export default Bookmark;

const SectionContainer = styled.section`
  position: relative;
  padding: 20px;

  .sectionTitle {
    padding: 20px 0;
    font-size: 30px;
  }

  .bookmarkInfo {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .bookmarkCount {
      font-size: 18px;
      font-weight: bold;
      line-height: 40px;
    }

    .resetBtn {
      height: 40px;
      padding: 10px;
      font-weight: 600;
      background: #d4d4d4;
      border-radius: 5px;
    }
  }

  .bookmarkNoData {
    min-height: calc(100vh - 320px);
    line-height: calc(100vh - 320px);
    text-align: center;
  }
`;
