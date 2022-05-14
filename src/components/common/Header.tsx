import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';

import { useTheme } from 'hooks/useTheme';
import { light } from 'styles/theme';

import { themeStatus } from 'state';

interface IModeBtnProps {
  onClick?: () => void;
}

const Header = () => {
  const { handleChangeTheme } = useTheme();

  const themeMode = useRecoilValue(themeStatus);

  const isLightTheme = themeMode === light;

  return (
    <HeaderContainer>
      <Link to='/'>
        <h1 className='headerTitle'>Movie Search</h1>
      </Link>

      <ModeBtn type='button' onClick={handleChangeTheme} aria-label={isLightTheme ? 'Light Mode' : 'Dark Mode'}>
        {isLightTheme ? <MdOutlineLightMode /> : <MdDarkMode />}
      </ModeBtn>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  line-height: 50px;
  background: ${(props) => props.theme?.colors?.bgColor};

  .headerTitle {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme?.colors?.titleColor};
  }
`;

const ModeBtn = styled.button<IModeBtnProps>`
  min-width: 50px;
  height: 100%;
  padding: 0;
  color: ${(props) => props.theme.colors?.titleColor};
  text-align: right;

  & svg {
    width: 19px;
    height: 19px;
    margin: 16px 0;
  }
`;
