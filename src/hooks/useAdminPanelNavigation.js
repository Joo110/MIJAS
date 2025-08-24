import { useState } from 'react';

export function useAdminPanelNavigation(initialPage = 'view') {
  const [activePage, setActivePage] = useState(initialPage);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => setIsNavbarOpen((prev) => !prev);
  const closeNavbar = () => setIsNavbarOpen(false);

  const goToPage = (page) => {
    setActivePage(page);
    closeNavbar();
  };

  return {
    activePage,
    isNavbarOpen,
    toggleNavbar,
    closeNavbar,
    goToPage,
  };
}