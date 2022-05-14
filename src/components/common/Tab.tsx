import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const TABS = [
  { key: 0, value: '검색', link: '/' },
  { key: 1, value: '즐겨찾기', link: '/bookmark' },
];

const Tab = () => {
  const location = useLocation();

  return (
    <UlContainer>
      {TABS.map((tab) => {
        return (
          <li key={`tab_item_${tab.key}`} className='tabItem'>
            <Link to={tab.link} className={`tabLink ${location.pathname === tab.link ? 'isActive' : ''}`}>
              {tab.value}
            </Link>
          </li>
        );
      })}
    </UlContainer>
  );
};

export default Tab;

const UlContainer = styled.ul`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  height: 80px;
  margin: 0 auto;
  background: ${(props) => props.theme.colors?.tabBgColor};
  border-top: 1px solid rgba(0, 0, 0, 10%);

  .tabItem {
    min-width: 49.9%;
    height: 100%;

    .tabLink {
      width: 100%;
      height: 100%;
      font-size: 20px;
      line-height: 80px;
      color: ${(props) => props.theme.colors?.titleColor};
      background: ${(props) => props.theme.colors?.bgColor};

      + .tabLink {
        border: 1px solid #efefef;
      }

      &.isActive {
        font-weight: bold;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 20%);
      }
    }
  }
`;
