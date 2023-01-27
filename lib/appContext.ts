import { createContext } from 'react';

const appContext = createContext({
  secondaryLayout: false,
  setSecondaryLayout: (layout:boolean) => {},
  titleText: '',
  setTitleText: (title:string) => {}
});

export default appContext;