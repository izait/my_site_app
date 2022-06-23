import React, {Component} from "react";
import query from "./Query";

import Auth from "./Auth";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized:false,
            login:''
        };
        this.logout = this.logout.bind(this);
    }

    logout() {
        if(this.state.authorized){
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            this.setState({
                authorized:false
            })
        }
    }

    componentDidMount() {
        this.setState({
            authorized:localStorage.getItem('token') !== null && localStorage.getItem('role') !== null
        })
        query('http://mysite.local:90/login')
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        authorized:false
                    })
                } else {
                    response.json()
                        .then(data => {
                            this.setState({
                                authorized:true,
                                login:data.login
                            })
                        })
                }
                return response;
            })
    }

    render() {
            return (
                    <div className="header">
                        {
                            !this.state.authorized &&
                            <Auth onAuthSuccess={()=>this.setState({authorized:true})} />
                        }
                        <a href="/"><h2> На главную. </h2></a>
                        <div className="quit" onClick={this.logout}>
                            <h2>{this.state.authorized ? 'Выход' : ' '}</h2>
                        </div>
                        <div className="userName">
                            {
                                this.state.authorized &&
                                <h2>
                                    {this.state.login}
                                </h2>
                            }
                        </div>
                    </div>
            );
    }
}


export default Header;

