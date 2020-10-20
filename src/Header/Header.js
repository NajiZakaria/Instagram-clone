import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core'
import { auth } from '../firebase'

function Header({user,setOpen,setOpenSignIn}) {
    return (
        
        <div className="header">
            <img 
                className="header__image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png" 
                alt="dd"
            />
            {user?(
                <Button onClick={()=>auth.signOut()}>Log Out</Button>) 
            :(
            <div className="app__loginContainer">
                <Button 
                    onClick={()=>setOpenSignIn(true)}
                >
                Sign In
                </Button> 
                <Button 
                    onClick={()=>setOpen(true)}
                >
                    Sign Up
                </Button> 
            </div>
            )}
              
        </div>
       
    )
}

export default Header
