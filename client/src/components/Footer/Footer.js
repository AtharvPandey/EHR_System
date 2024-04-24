import React from 'react'
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className='bg-info-subtle text-info-emphasis p-3'>
            <h4 className='text-center'> All Right Reserve &copy; <b className='text-success-emphasis'>MediGuard</b> </h4>
            <div align="center">
                <Link to="#" className="nav-link active" aria-current="page" >About</Link>
                <Link to="#" className="nav-link active" aria-current="page" >Contact</Link>
                <Link to="#" className="nav-link active" aria-current="page" >Private Policy</Link>
            </div>
        </div>
    )
}
export default Footer