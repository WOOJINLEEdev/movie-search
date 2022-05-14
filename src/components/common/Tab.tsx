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
          <li key={`tab_item_${tab.key}`} className='tab_item'>
            <Link to={tab.link} className={`tab_link ${location.pathname === tab.link ? 'isActive' : ''}`}>
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
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.colors?.tabBgColor};

  .tab_item {
    min-width: 49.9%;
    height: 100%;

    .tab_link {
      background: #fff;
      width: 100%;
      height: 100%;
      line-height: 80px;
      font-size: 20px;
      background: ${(props) => props.theme.colors?.bgColor};
      color: ${(props) => props.theme.colors?.titleColor};

      + .tab_link {
        border: 1px solid #efefef;
      }

      &.isActive {
        font-weight: bold;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
    }
  }
`;
