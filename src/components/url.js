import React from "react";

class Url extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1 class={"pt-3 " + this.props.visible}><a href={this.props.url} target="blank">{this.props.url}</a></h1>
        )
    }
} export default Url;