import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';

import { useTheme, themeStatus } from 'hooks/useTheme';
import { light } from 'styles/theme';

const Header = () => {
  const { handleChangeTheme } = useTheme();

  const themeMode = useRecoilValue(themeStatus);

  return (
    <HeaderContainer>
      <Link to='/'>
        <h1 className='header_title'>Movie Search</h1>
      </Link>

      <ModeBtn type='button' onClick={handleChangeTheme} aria-label={themeMode === light ? 'Light Mode' : 'Dark Mode'}>
        {themeMode === light ? <MdOutlineLightMode /> : <MdDarkMode />}
      </ModeBtn>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  background: ${(props) => props.theme?.colors?.bgColor};

  .header_title {
    font-size: 20px;
    font-weight: bold;
    color: ${(props) => props.theme?.colors?.titleColor};
  }
`;

interface IModeBtnProps {
  onClick?: () => void;
}

const ModeBtn = styled.button<IModeBtnProps>`
  min-width: 75.06px;
  height: 100%;
  color: ${(props) => props.theme.colors?.titleColor};

  & svg {
    width: 19px;
    height: 19px;
    margin: 16px 0;
  }
`;
