import React from 'react';
import Navbar from './Navbar/Navbar';


// We tell TS that this component can recieve children 
interface LayoutProps {
    children: React.ReactNode;
    // other props here
  }
// React.FC represents a Function Component
// Layout allows us to reuse certain templates across pages
const Layout:React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
        <Navbar />
        <main>{children}</main>
        </>
    )
};

export default Layout;