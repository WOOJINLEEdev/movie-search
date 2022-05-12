import * as styled from 'styled-components';
import reset from 'styled-reset';

export default styled.createGlobalStyle`
  ${reset}

  body {
    position: relative;
    margin: 0;
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
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

  input {
    outline: 0;
  }

  input:focus {
    outline: 3px solid #aaa;
  }

  input:focus:not(:focus-visible) {
    outline: 0;
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

  @keyframes loading {
    0% {
      transform: translateX(0);
    }
    50%,
    100% {
      transform: translateX(800px);
    }
  }

  .skeleton_item {
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 150px;
    background: #f2f2f2;
    border-radius: 5px;
    margin-top: 20px;
  }

  .skeleton_item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 30%;
    height: 150px;
    background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
    animation: loading 2s infinite linear;
  }

  @media only screen and (min-width: 320px) and (max-width: 500px) {
    .tob_btn {
      width: 36px;
      height: 36px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`;
