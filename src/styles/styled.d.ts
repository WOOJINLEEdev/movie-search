import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors?: {
      titleColor?: string;
      bgColor?: string;
      boxColor?: string;
      borderColor?: string;
      tabBorderColor?: string;
      tabBgColor?: string;
      activeColor?: string;
    };
  }
}
