import React from "react";
import http from "./http";
import "./App.css";
var QRCode = require("qrcode.react");

class App extends React.Component {
    state = {
        ip: "",
    };
    componentDidMount() {
        http({ url: "http://localhost:3000/ip" }).then((res: any) => {
            this.setState({
                ip: res.data,
            });
        });
    }

    render() {
        const { ip } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <QRCode size={300} value={`http://${ip}:3000/`} />
                </header>
            </div>
        );
    }
}

export default App;
