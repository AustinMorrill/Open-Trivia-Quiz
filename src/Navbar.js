import React from 'react';
import { Link } from "react-router-dom"

const Navbar = (props) => {
	return (
		<div className='navBar color1'>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
			<Link to='/contact'>Contact</Link>
		</div>
	)
}

export default Navbar;
