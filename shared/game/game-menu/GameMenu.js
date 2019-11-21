import React from 'react';
import { FaMusic as Music } from 'react-icons/fa';
import { TiVolume as Sounds } from 'react-icons/ti';
import {connect} from 'react-redux';
import {startBattle} from '../../store/actions/gameActions';

import './gameMenu.scss';

class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showControls: false,
        };
        this.onChange = this.onChange.bind(this);
        this.showControls = this.showControls.bind(this);
    }
    onChange(e) {
        e.stopPropagation();
        const { id, value } = e.target;
        const { setMusicVolume, setSoundsVolume } = this.props;
        if (id === 'music')
            setMusicVolume(value);
        else if (id === 'sounds')
            setSoundsVolume(value);
    }
    onStartBattle(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.startBattle();
    }
    showControls(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ showControls: !this.state.showControls });
    }
    render() {
        const { startBattle, showStats } = this.props;
        const { showControls } = this.state;
        const controlsClass = showControls ? 'drop-game-menu' : 'drop-game-menu hidden';
        return (
            <div className="game-menu">
                <button className="game-menu-button new-battle" onClick={() => startBattle(true)}>Новая битва</button>
                <button className="game-menu-button show-stats" onClick={showStats}>Статистика Героя</button>
                <button className="game-menu-button show-contrls" onClick={this.showControls}>Настройки</button>
                <div className={controlsClass}>
                    <div className="drop-game-menu-wrapper ">
                        <Music />
                        <input
                            id="music"
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            className="drop-game-menu-music"
                            defaultValue={0.3}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="drop-game-menu-wrapper">
                        <Sounds />
                        <input
                            id="sounds"
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            defaultValue={0.3}
                            className="drop-game-menu-sounds"
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GameMenu;
