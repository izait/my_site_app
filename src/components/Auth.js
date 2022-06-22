import React, {Component} from "react";
import Modal from "./Modal";
import {auth} from "./Query";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            isLoaded: false,
            errorMessage:'',
            items: [],
            token: false,
            role: false,
            success: false,
            userLogin: "",
            userPass: ""
        };
        this.handleChangeUserLogin = this.handleChangeUserLogin.bind(this)
        this.handleChangeUserPass = this.handleChangeUserPass.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
    }

    handleChangeUserLogin(event) {
        this.setState({userLogin: event.target.value});
    }

    handleChangeUserPass(event) {
        this.setState({userPass: event.target.value});
    }

    handleSubmitLogin(event) {
        let userLogin = this.state.userLogin
        let userPass = this.state.userPass
        event.preventDefault();

        auth(userLogin,userPass)
            .then(authAttempt=>{
                if(authAttempt.success){
                    this.setState({
                        isLoaded:true,
                        success:true,
                    },this.props.onAuthSuccess)
                }else{
                    this.setState({
                        isLoaded:true,
                        success:false,
                        errorMessage:authAttempt.message
                    })
                }
            })
    }

    render() {
        return (
            <div className="modal">
                <div className="header">
                    <h2>Введите пользователя</h2>
                    <form onSubmit={this.handleSubmitLogin}>
                        <input placeholder="   Логин" type="text" value={this.state.userLogin}
                               onChange={this.handleChangeUserLogin}/>
                        <input placeholder="   Пароль" type="text" value={this.state.userPass}
                               onChange={this.handleChangeUserPass}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    {
                        this.state.isLoaded && !this.state.success &&
                        <Modal message={this.state.errorMessage}/>
                    }
                </div>
            </div>

        )
    }
}

export default Auth