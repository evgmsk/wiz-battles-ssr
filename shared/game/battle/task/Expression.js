/**
 * project WizBattle
 */
import React from 'react';
import { TiVolumeUp } from 'react-icons/ti';
import onSound from '../../../HelperFunctions/speaker';
import { Langs } from '../../../ConstsData/constants';

class Expression extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speechRate: 0.5,
        };
        this.onClick = this.onClick.bind(this);
    }
    componentDidMount() {
        // onSound('', Langs.en);
    }
    onClick(e) {
        e.stopPropagation();
        const { text } = this.props;
        let { speechRate } = this.state;
        onSound(text, Langs.en, speechRate, this.props.soundsVolume);
        speechRate = speechRate === 1 ? 0.5 : 1;
        this.setState({ speechRate });
    }
    render() {
        const { showAnswer, sound, text, possibleAnswers, difficulty } = this.props;
        const taskText = sound && difficulty === 'normal' ? '*****' : text;
        return (
            <div className="task-expression">
                <p>{
                    showAnswer ? possibleAnswers.map((x, i) => {
                        const innerText = i === possibleAnswers.length - 1 ? x : `${x},`;
                        return <span className="possible-answers" key={i}>{innerText} </span>;
                    }) : taskText}
                </p>
                {sound
                    ? <button
                        className="sound-expression"
                        onClick={this.onClick}
                    >
                        <Speaker />
                      </button>
                    : <span />
                }
            </div>
        );
    }
}

export default Expression;
