// import React, { createContext, useContext, useState, useEffect } from 'react';

// const BannerContext = createContext();

// export const useBanner = () => {
//   const context = useContext(BannerContext);
//   if (!context) {
//     throw new Error('useBanner must be used within a BannerProvider');
//   }
//   return context;
// };

// export const BannerProvider = ({ children }) => {
//   const [banners, setBanners] = useState([]);
//   const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use the correct API URL for development
//   const API_BASE = 'http://localhost:3000';

//   // Fetch banners from backend
//   const fetchBanners = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       console.log('🔄 Fetching banners from:', `${API_BASE}/api/banners`);
      
//       const response = await fetch(`${API_BASE}/api/banners`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
//       console.log('📥 Banner API response:', result);
      
//       if (result.success) {
//         // If no banners, use default
//         if (result.data.length === 0) {
//           const defaultBanner = [{
//             _id: 'default',
//             imageUrl: "/assets/banner1.jpg",
//             title: "Your Health is Our Priority",
//             subtitle: "Get genuine medicines delivered to your doorstep from verified vendors",
//             isActive: true
//           }];
//           setBanners(defaultBanner);
//           console.log('ℹ️ Using default banner');
//         } else {
//           setBanners(result.data);
//           console.log(`✅ Loaded ${result.data.length} banners from database`);
//         }
//       } else {
//         throw new Error(result.message || 'Failed to fetch banners');
//       }
//     } catch (error) {
//       console.error('❌ Error fetching banners:', error);
//       setError(error.message);
//       // Fallback to default banner
//       const defaultBanner = [{
//         _id: 'default',
//         imageUrl: "/assets/banner1.jpg",
//         title: "Your Health is Our Priority",
//         subtitle: "Get genuine medicines delivered to your doorstep from verified vendors",
//         isActive: true
//       }];
//       setBanners(defaultBanner);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   // Rotate banners every 3 seconds
//   useEffect(() => {
//     const activeBanners = banners.filter(banner => banner.isActive);
//     if (activeBanners.length <= 1) return;

//     const interval = setInterval(() => {
//       setCurrentBannerIndex((prevIndex) => 
//         (prevIndex + 1) % activeBanners.length
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [banners]);

//   const getCurrentBanner = () => {
//     const activeBanners = banners.filter(banner => banner.isActive);
//     return activeBanners[currentBannerIndex] || activeBanners[0] || banners[0] || {
//       _id: 'default',
//       imageUrl: "/assets/banner1.jpg",
//       title: "Your Health is Our Priority",
//       subtitle: "Get genuine medicines delivered to your doorstep from verified vendors",
//       isActive: true
//     };
//   };

//   const value = {
//     banners,
//     currentBanner: getCurrentBanner(),
//     currentBannerIndex,
//     loading,
//     error,
//     refreshBanners: fetchBanners
//   };

//   return (
//     <BannerContext.Provider value={value}>
//       {children}
//     </BannerContext.Provider>
//   );
// };



import React, { createContext, useContext, useState, useEffect } from 'react';

const BannerContext = createContext();

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};

export const BannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch banners from backend
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await fetch('/api/banners');
      const result = await response.json();
      
      if (result.success) {
        // If no banners, use default
        if (result.data.length === 0) {
          setBanners([{
            _id: 'default',
            imageUrl: "/assets/banner1.jpg",
            title: "Your Health is Our Priority",
            subtitle: "Get genuine medicines delivered to your doorstep from verified vendors",
            isActive: true
          }]);
        } else {
          setBanners(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      // Fallback to default banner
      setBanners([{
        _id: 'default',
        imageUrl: "/assets/banner1.jpg",
        title: "Your Health is Our Priority",
        subtitle: "Get genuine medicines delivered to your doorstep from verified vendors",
        isActive: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Rotate banners every 3 seconds
  useEffect(() => {
    const activeBanners = banners.filter(banner => banner.isActive);
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % activeBanners.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  const getCurrentBanner = () => {
    const activeBanners = banners.filter(banner => banner.isActive);
    return activeBanners[currentBannerIndex] || activeBanners[0] || banners[0];
  };

  const value = {
    banners,
    currentBanner: getCurrentBanner(),
    currentBannerIndex,
    loading,
    refreshBanners: fetchBanners
  };

  return (
    <BannerContext.Provider value={value}>
      {children}
    </BannerContext.Provider>
  );
};