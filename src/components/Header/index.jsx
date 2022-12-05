import React from 'react'
import Logo from '../../assets/img/logo-justo.png'


const Header = () => {
    return(     
        <img className='text-2xl mb-10'
        sx={{
            width: 200,
            padding: 2,
        }}
        alt="Justo"
        src={Logo}/>
    )
}

export default Header;
