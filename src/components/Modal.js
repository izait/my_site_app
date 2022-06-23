import React, {Component} from 'react';


class Modal extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        // const newMessage = this.props.message;
        console.log(this.props.message)
        return (
            <div className="modal_header">
                <div className="modal_message">
                   <h2> {this.props.message}</h2>
                </div>
            </div>
        )
    }
}

export default Modal;
