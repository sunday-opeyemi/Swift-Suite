import React, { createContext, useState } from 'react';
import {useMediaQuery} from 'react-responsive'

export const AppContext = createContext();

const DashboardContext = ({ children }) => {
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const [sideBarOpen, setSideBarOpen] = useState(isTablet ? false : true);

    const toggleSideBar = () => {
        setSideBarOpen(true);
    };

    return (
        <AppContext.Provider
            value={{
                isTablet,
                setSideBarOpen,
                sideBarOpen,
                toggleSideBar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default DashboardContext;
