import React, {Component} from "react";
import query from "./Query";

class Cities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: null,
            isLoaded: false,
            items: [],
            foundCity: false,
            success: false,
            cityAddValue: "",
            citySearchValue: "",
            cityDeleteValue: "",
            cityRenameId: "",
            cityRenameNewName: ""
        };

        this.handleChangeCityAdd = this.handleChangeCityAdd.bind(this)
        this.handleSubmitAddCity = this.handleSubmitAddCity.bind(this)

        this.handleSubmitSearchCity = this.handleSubmitSearchCity.bind(this)
        this.handleChangeCitySearch = this.handleChangeCitySearch.bind(this)

        this.handleSubmitDeleteCity = this.handleSubmitDeleteCity.bind(this)
        this.handleChangeCityDelete = this.handleChangeCityDelete.bind(this)

        this.handleChangeCityRenameNewName = this.handleChangeCityRenameNewName.bind(this)
        this.handleChangeCityRenameId = this.handleChangeCityRenameId.bind(this)
        this.handleSubmitRenameCity = this.handleSubmitRenameCity.bind(this)


    }

    handleChangeCitySearch(event) {
        this.setState({citySearchValue: event.target.value});
    }

    handleChangeCityAdd(event) {
        this.setState({cityAddValue: event.target.value});
    }

    handleChangeCityDelete(event) {
        this.setState({cityDeleteValue: event.target.value});
    }

    handleChangeCityRenameId(event) {
        this.setState({cityRenameId: event.target.value});
    }

    handleChangeCityRenameNewName(event) {
        this.setState({cityRenameNewName: event.target.value});
    }

    handleSubmitSearchCity(event) {
        let cityId = this.state.citySearchValue
        event.preventDefault();

        let url = "http://mysite.local:90/city_find";

        let searchParams = new URLSearchParams();
        searchParams.append("find_city_id", cityId);

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
                                foundCity: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitAddCity(event) {
        let cityName = this.state.cityAddValue
        event.preventDefault();

        let url = "http://mysite.local:90/city_add/";

        let searchParams = new URLSearchParams();
        searchParams.append("new_name", cityName);

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
                                foundCity: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitDeleteCity(event) {

        let cityId = this.state.cityDeleteValue
        event.preventDefault();

        let url = "http://mysite.local:90/city_delete";

        let searchParams = new URLSearchParams();
        searchParams.append("city_id", cityId);

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
                                foundCity: data.message
                            })
                        })
                }
                return response;
            })
    }

    handleSubmitRenameCity(event) {
        let cityId = this.state.cityRenameId
        let cityNewName = this.state.cityRenameNewName
        event.preventDefault();
        let url = "http://mysite.local:90/city_rename";

        let searchParams = new URLSearchParams();
        searchParams.append("new_name", cityNewName);
        searchParams.append("id", cityId);

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
                                foundCity: data.message
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
                    <h2>Города</h2>
                </div>
                <div className="nav">
                    <form onSubmit={this.handleSubmitSearchCity}>
                        <h2>Найти город по ID </h2>
                        <input type="number" value={this.state.citySearchValue} onChange={this.handleChangeCitySearch}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitAddCity}>
                        <h2>Добавить город</h2>
                        <input value={this.state.cityAddValue} onChange={this.handleChangeCityAdd}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitDeleteCity}>
                        <h2>Удалить город по ID</h2>
                        <input type="number" value={this.state.cityDeleteValue} onChange={this.handleChangeCityDelete}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                    <form onSubmit={this.handleSubmitRenameCity}>
                        <h2>Переименовать город</h2>
                        <input placeholder="   ID" type="number" value={this.state.cityRenameId}
                               onChange={this.handleChangeCityRenameId}/>
                        <input placeholder="   новое имя" type="text" value={this.state.cityRenameNewName}
                               onChange={this.handleChangeCityRenameNewName}/>
                        <input type="submit" value="Отправить"/>
                    </form>
                </div>
                <div className="result">
                    {
                        this.state.success &&
                        <h2>
                            {this.state.foundCity}
                        </h2>
                    }
                </div>
            </div>
        )
    }
}

export default Cities;