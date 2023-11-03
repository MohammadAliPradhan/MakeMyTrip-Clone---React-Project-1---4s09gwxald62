import React, { useState, useEffect } from 'react';

function ScrollNavBar() {
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        // Add scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollTop = window.scrollY;

        // Determine if the user is scrolling down or up
        if (currentScrollTop > lastScrollTop) {
            setIsScrolling(true); // Scrolling down
        } else {
            setIsScrolling(false); // Scrolling up
        }

        setLastScrollTop(currentScrollTop);
    };

    return (
        <div className={`navbar ${isScrolling ? 'hidden' : ''}`}>
            {/* Your navbar content */}
        </div>
    );
}

export default ScrollNavBar;
