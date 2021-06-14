import React from 'react'; 
import '../css/NavbarButton.css';

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const NavbarButton = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) =>{
    // Check if the button already has styling added, if it doesn't it goes to the first element in the array(for the size of the button also). 
    const checkButtonStyle = 
    STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize :SIZES[0]

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
            {children}
        </button>
    )
};

export default NavbarButton;