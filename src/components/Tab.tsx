import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TABS = [
  { key: 0, value: '검색', link: '/' },
  { key: 1, value: '즐겨찾기', link: '/bookmark' },
];

const Tab = () => {
  return (
    <UlContainer>
      {TABS.map((tab) => {
        return (
          <li key={`tab_item_${tab.key}`} className='tab_item'>
            <Link to={tab.link} className='tab_link'>
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
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  height: 80px;
  box-shadow: 0px -10px 5px rgba(0, 0, 0, 0.8);

  .tab_item {
    min-width: 50%;
    height: 100%;

    .tab_link {
      background: #fff;
      width: 100%;
      height: 100%;
      line-height: 80px;
      font-size: 20px;
      background: ${(props) => props.theme.colors?.bgColor};
      color: ${(props) => props.theme.colors?.titleColor};
    }
  }
`;
