/**
 * project WizBattle
 */
import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(e) {
        e.stopPropagation();
        const { text } = this.props;
        this.onSound(text);
    }

    render() {
        const { text } = this.props;
        return (
            <div className="task-description-wrapper">
                <div className="task-description">
                    <p className="task-title">{text.split('.')[0]}</p>
                    <p className="task-comment">{text.split('.')[1]}</p>
                </div>
            </div>
        );
    }
}

export default Description;
