import React, {Component} from "react";
import {map} from 'underscore'
import {Link} from "react-router-dom"


const SECTIONS = [
    {title: 'Пользователи', href: '/users'},
    {title: 'Города', href: '/cities'},
    {title: 'Улицы', href: '/streets'}
]

class Home extends Component {
    render() {
        return (
            <div className='home'>
                <div className='home-Body'>
                    <div className='nav'>
                        {map(SECTIONS, ({title, href}) => (
                            <Link className='nav-item' to={href}>
                                <span className='nav-title'><h2>{title}</h2></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home