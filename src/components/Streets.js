import React, {Component} from "react";
import query from "./Query";

class Streets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            isLoaded: false,
            items: [],
            foundStreet: false,
            success: false,
            streetAddValue: "",
            streetSearchValue: "",
            streetDeleteValue: "",
            streetRenameId: "",
            streetRenameNewName: ""
        };

        this.handleChangeStreetAdd = this.handleChangeStreetAdd.bind(this)
        this.handleSubmitAddStreet = this.handleSubmitAddStreet.bind(this)

        this.handleSubmitSearchStreet = this.handleSubmitSearchStreet.bind(this)
        this.handleChangeStreetSearch = this.handleChangeStreetSearch.bind(this)

        this.handleSubmitDeleteStreet = this.handleSubmitDeleteStreet.bind(this)
        this.handleChangeStreetDelete = this.handleChangeStreetDelete.bind(this)

        this.handleChangeStreetRenameNewName = this.handleChangeStreetRenameNewName.bind(this)
        this.handleChangeStreetRenameId = this.handleChangeStreetRenameId.bind(this)
        this.handleSubmitRenameStreet = this.handleSubmitRenameStreet.bind(this)


    }

    handleChangeStreetSearch(event) {
        this.setState({streetSearchValue: event.target.value});
    }

    handleChangeStreetAdd(event) {
        this.setState({streetAddValue: event.target.value});
    }

    handleChangeStreetDelete(event) {
        this.setState({streetDeleteValue: event.target.value});
    }

    handleChangeStreetRenameId(event) {
        this.setState({streetRenameId: event.target.value});
    }

    handleChangeStreetRenameNewName(event) {
        this.setState({streetRenameNewName: event.target.value});
    }

    handleSubmitSearchStreet(event) {
        let streetId = this.state.streetSearchValue
        event.preventDefault();

        let url = "http://mysite.local:90/street_find";

        let searchParams = new URLSearchParams();
        searchParams.append("id", streetId);

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
                                foundStreet: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitAddStreet(event) {
        let streetName = this.state.streetAddValue
        event.preventDefault();

        let url = "http://mysite.local:90/street_add/";

        let searchParams = new URLSearchParams();
        searchParams.append("name_street", streetName);

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
                                foundStreet: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitDeleteStreet(event) {

        let streetId = this.state.streetDeleteValue
        event.preventDefault();

        let url = "http://mysite.local:90/street_delete";

        let searchParams = new URLSearchParams();
        searchParams.append("street_id", streetId);

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
                                foundStreet: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitRenameStreet(event) {
        let streetId = this.state.streetRenameId
        let streetNewName = this.state.streetRenameNewName
        event.preventDefault();
        let url = "http://mysite.local:90/street_rename";

        let searchParams = new URLSearchParams();

        searchParams.append("street_id", streetId);
        searchParams.append("name", streetNewName);

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
                                foundStreet: data.message
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
                    <h2>Улицы</h2>
                </div>
                <div className="nav">
                    <form onSubmit={this.handleSubmitSearchStreet}>
                        <h2>Найти улицу по ID </h2>
                        <input type="number" value={this.state.streetSearchValue} onChange={this.handleChangeStreetSearch}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitAddStreet}>
                        <h2>Добавить улицу</h2>
                        <input value={this.state.streetAddValue} onChange={this.handleChangeStreetAdd}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitDeleteStreet}>
                        <h2>Удалить улицу по ID</h2>
                        <input type="number" value={this.state.streetDeleteValue} onChange={this.handleChangeStreetDelete}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitRenameStreet}>
                        <h2>Переименовать улицу</h2>
                        <input placeholder="   ID" type="number" value={this.state.streetRenameId} onChange={this.handleChangeStreetRenameId}/>
                        <input placeholder="   новое имя" type="text" value={this.state.streetRenameNewName} onChange={this.handleChangeStreetRenameNewName}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                </div>
                <div className="result">
                    {
                        this.state.success &&
                        <h2>
                            {this.state.foundStreet}
                        </h2>
                    }
                </div>
            </div>
        )
    }
}

export default Streets