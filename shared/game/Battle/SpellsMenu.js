/**
 * project WizBattle
 */
import React from 'react';
import {TiLeaf as Life, TiWeatherSnow as Ice, TiWeatherShower as Water } from 'react-icons/ti';
import {FaFire as Fire} from 'react-icons/fa';
// import Ice from 'react-icons/lib/ti/weather-snow';
// import Water from 'react-icons/lib/ti/weather-shower';
import { Spells } from '../../../ConstsData/constants';
import onSound from '../../../HelperFunctions/speaker';
import './spellsMenu.scss';

class SpellSelector extends React.Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.onClick = this.onClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.state = {
            spell: '',
        };
    }
    componentDidMount() {
        this.onSound('Выбирите заклинание');
        // this.onSound('Выбирите заклинание');
    }
    onClick(e, data) {
        e.stopPropagation();
        e.preventDefault();
        const spellCase = data === 'life' ? 'Эта магия исцеляет' : 'Эта магия наносит урон';
        const sound = `Вы выбрали магию ${Spells[data]}. ${spellCase}`;
        this.setState({ spell: data });
        this.onSound(sound);
    }
    onConfirm(e) {
        e.stopPropagation();
        e.preventDefault();
        const { spell } = this.state;
        if (spell)
            this.props.onSelectSpell(this.state.spell);
        else
            this.onSound('вы не выбрали заклинание');
    }
    onSound(text, volume = 1) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const voice = voices.filter(x => x.lang === 'ru-RU')[0];
        console.log(text, voice);
        const speak = () => {
            if (text !== '') {
                const utterThis = new SpeechSynthesisUtterance(text);
                utterThis.voice = voices.length === 20 ? voices[16] : voices[voice];
                utterThis.rate = 1;
                utterThis.pitch = 1;
                utterThis.volume = volume;
                synth.speak(utterThis);
            }
        };
        speak();
    }
    render() {
        const selectSpell = this.onClick;
        return (
            <div className="spell-menu-wrapper">
                <div className="spell-header">Заклинание</div>
                <div className="spell-select-wrapper" ref={this.ref}>
                    <button className="ice-button spell-button" onClick={e => selectSpell(e, 'ice')}>
                        <Ice />
                    </button>
                    <button className="fire-button spell-button" onClick={e => selectSpell(e, 'fire')}>
                        <Fire />
                    </button>
                    <button className="life-button spell-button" onClick={e => selectSpell(e, 'life')}>
                        <Life />
                    </button>
                    <button className="water-button spell-button" onClick={e => selectSpell(e, 'water')}>
                        <Water />
                    </button>
                </div>
                <button className="spell-confirm" onClick={this.onConfirm}>Применить</button>
            </div>

        );
    }
}

SpellSelector.defaultProps = {
    onSelectSpell: f => f,
};

export default SpellSelector;
