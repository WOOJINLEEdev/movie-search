import * as styled from 'styled-components';
import reset from 'styled-reset';

export default styled.createGlobalStyle`
  ${reset}

  body {
    position: relative;
    margin: 0;
    font-family: source-code-pro;
    background: #efefef;
  }

  a {
    display: block;
    text-decoration: none;
    text-align: center;
    color: #333;
  }

  button {
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  .visually_hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    border: 0;
  }
`;
