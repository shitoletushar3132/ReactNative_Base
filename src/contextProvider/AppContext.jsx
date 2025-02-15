import React, {createContext, useState} from 'react';

// Create Context
export const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [videos, setVideos] = useState([]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        refreshData,
        setRefreshData,
        categories,
        setCategories,
        banners,
        setBanners,
        products,
        setProducts,
        videos,
        setVideos,
      }}>
      {children}
    </AppContext.Provider>
  );
};
