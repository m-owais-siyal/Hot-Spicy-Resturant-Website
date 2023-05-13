import React from 'react'
import './footer.css'

export default function footer() {
    //object of footerstyle
    // let footerStyle = {
    //     position: "absolute",
    //     width: "100%",
    //     top: "800px"
    // }

  return (
    // <footer className='bg-dark text-light py-3' style={footerStyle}>
    <footer className='text-dark py-3' id="footerstyle">
    {/* <footer id="footerstyle"> */}
        <p className='footertext'>
            Copyright &copy; Hot&Grill.com
            <br />
            Email Address: info.hotandgrill.com
        </p>
        {/* <p className='footertext'>
            Email Address: info.hotandgrill.com
        </p>       */}
    </footer>
  )
}
