import React from 'react';
import { Link } from "react-router-dom"

const Navbar = (props) => {
	return (
		<div className='navBar color1'>
			<Link to='/'>Options</Link>
			<Link to='/about'>About</Link>
		</div>
	)
}

export default Navbar;
