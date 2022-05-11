import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors?: {
      titleColor?: string;
      bgColor?: string;
      boxColor?: string;
      tabBorderColor?: string;
      dimmedColor?: string;
      editorBgColor?: string;
      editorTitleColor?: string;
    };
  }
}
