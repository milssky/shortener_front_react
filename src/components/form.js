import React from "react";
import Url from "./url";

class UrlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { "slug": "", },
            visible: "d-none"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "full_url": event.target.full_url.value,
            "slug": event.target.slug.value,
            "secret": "hey"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/v1/urls/", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    data: result,
                    visible: ""
                });

            })
            .catch(error => console.log('error', error));
        event.preventDefault();
    }


    render() {
        return (
            <div class="bg-light px-5 py-5">
                <h1>Сокращатель ссылок</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="url" name="full_url" maxLength="200" class="form-control py-2 mb-2" required id="id_full_url"></input>
                        <div class="form-text pb-3">Вставь ссылку</div>
                        <input type="text" name="slug" maxLength="200" class="form-control py-2 mb-2" id="id_slug"></input>
                        <div class="form-text pb-3">Вставь короткую ссылку</div>
                        <button type="submit" class="btn btn-primary">Сократить</button>
                    </form>
                </div>
                <Url url={"http://localhost:8000/go/" + this.state.data.slug} visible={this.state.visible} />
            </div>
        )
    }
} export default UrlForm;
