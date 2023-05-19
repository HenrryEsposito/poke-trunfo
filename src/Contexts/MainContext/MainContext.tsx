import React from 'react';
import { IMainContextData } from './types';

const MainContext = React.createContext<IMainContextData>(
    {} as IMainContextData
);

export default MainContext;