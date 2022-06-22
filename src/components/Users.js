import React, {Component} from "react";
import query from "./Query";

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            isLoaded: false,
            items: [],
            foundUser: false,
            success: false,
            userName: "",
            userAge:"",
            userRole:"",
            userAddValue: "",
            userSearchValue: "",
            userDeleteValue: "",
            userRenameId: "",
            userRenameNewName: ""
        };

        this.handleChangeUserName = this.handleChangeUserName.bind(this)
        this.handleChangeUserAge = this.handleChangeUserAge.bind(this)
        this.handleChangeUserRole = this.handleChangeUserRole.bind(this)
        this.handleSubmitAddUser = this.handleSubmitAddUser.bind(this)

        this.handleChangeUserSearch = this.handleChangeUserSearch.bind(this)
        this.handleSubmitSearchUser = this.handleSubmitSearchUser.bind(this)

        this.handleChangeUserDelete = this.handleChangeUserDelete.bind(this)
        this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this)

        this.handleChangeUserRenameNewName = this.handleChangeUserRenameNewName.bind(this)
        this.handleChangeUserRenameId = this.handleChangeUserRenameId.bind(this)
        this.handleSubmitRenameUser = this.handleSubmitRenameUser.bind(this)


    }

    handleChangeUserSearch(event) {
        this.setState({userSearchValue: event.target.value});
    }

    handleChangeUserName(event) {
        this.setState({userName: event.target.value});
    }

    handleChangeUserAge(event) {
        this.setState({userAge: event.target.value});
    }

    handleChangeUserRole(event) {
        this.setState({userRole: event.target.value});
    }


    handleChangeUserDelete(event) {
        this.setState({userDeleteValue: event.target.value});
    }

    handleChangeUserRenameId(event) {
        this.setState({userRenameId: event.target.value});
    }

    handleChangeUserRenameNewName(event) {
        this.setState({userRenameNewName: event.target.value});
    }

    handleSubmitSearchUser(event) {
        let userId = this.state.userSearchValue
        event.preventDefault();

        let url = "http://mysite.local:90/user_find";

        let searchParams = new URLSearchParams();
        searchParams.append("id", userId);

        query(url + "?" + searchParams.toString())
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        success: false
                    })
                    response.json()
                        .then(data => {
                            alert(data.message)
                        })
                } else {
                    response.json()
                        .then(data => {
                            this.setState({
                                success: true,
                                foundUser: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitAddUser(event) {
        let userName = this.state.userName
        let userAge = this.state.userAge
        let userRole = this.state.userRole

        event.preventDefault();

        let url = "http://mysite.local:90/user_add";

        let searchParams = new URLSearchParams();
        searchParams.append("name", userName);
        searchParams.append("age", userAge);
        searchParams.append("role", userRole);

        query(url + "?" + searchParams.toString())
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        success: false
                    })
                    response.json()
                        .then(data => {
                            alert(data.message)
                        })
                } else {
                    response.json()
                        .then(data => {
                            this.setState({
                                success: true,
                                foundUser: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitDeleteUser(event) {

        let userID = this.state.userDeleteValue
        event.preventDefault();

        let url = "http://mysite.local:90/user_delete";

        let searchParams = new URLSearchParams();
        searchParams.append("user_id", userID);

        query(url + "?" + searchParams.toString())
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        success: false
                    })
                    response.json()
                        .then(data => {
                            alert(data.message)
                        })
                } else {
                    response.json()
                        .then(data => {
                            this.setState({
                                success: true,
                                foundUser: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitRenameUser(event) {
        let userId = this.state.userRenameId
        let userNewName = this.state.userRenameNewName
        event.preventDefault();
        let url = "http://mysite.local:90/user_rename/";

        let searchParams = new URLSearchParams();
        searchParams.append("new_name", userNewName);
        searchParams.append("user_id", userId);

        query(url + "?" + searchParams.toString())
            .then(response => {
                if (!response.ok) {
                    this.setState({
                        success: false
                    })
                    response.json()
                        .then(data => {
                            alert(data.message)
                        })
                } else {
                    response.json()
                        .then(data => {
                            this.setState({
                                success: true,
                                foundUser: data.message
                            })
                        })
                }
                return response;
            })
    }

    render() {
        return (
            <div className="home">
                <div className="nav-item">
                    <h2>Пользователя</h2>
                </div>
                <div className="nav">
                    <form onSubmit={this.handleSubmitSearchUser}>
                        <h2>Найти пользователя по ID</h2>
                        <input type="number" value={this.state.userSearchValue} onChange={this.handleChangeUserSearch}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitAddUser}>
                        <h2>Добавить пользователя</h2>
                        <input placeholder="   Имя" value={this.state.userName} onChange={this.handleChangeUserName}/>
                        <input placeholder="   Возраст" value={this.state.userAge} onChange={this.handleChangeUserAge}/>
                        <input placeholder="   Роль" value={this.state.userRole} onChange={this.handleChangeUserRole}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitDeleteUser}>
                        <h2>Удалить пользователя по ID</h2>
                        <input type="number" value={this.state.userDeleteValue} onChange={this.handleChangeUserDelete}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitRenameUser}>
                        <h2>Переименовать пользователя</h2>
                        <input placeholder="   ID" type="number" value={this.state.userRenameId} onChange={this.handleChangeUserRenameId}/>
                        <input placeholder="   Новое имя" type="text" value={this.state.userRenameNewName} onChange={this.handleChangeUserRenameNewName}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                </div>
                <div className="result">
                    {
                        this.state.success &&
                        <h2>
                            {this.state.foundUser}
                        </h2>
                    }
                </div>
            </div>
        )
    }
}

export default Users