export const handleScroll = (footerClass, setDisplayCount) => {
    const footer = document.querySelector(footerClass);
    const footerTop = footer.getBoundingClientRect().top + window.scrollY;
    const scrollPosition = window.scrollY + window.innerHeight;
  
    if (scrollPosition >= footerTop) {
      setDisplayCount((prev) => prev + 10);
    }
  };