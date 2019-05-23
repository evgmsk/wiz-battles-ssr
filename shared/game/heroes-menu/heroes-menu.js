import React from 'react';
import {connect} from 'react-redux';

import Heroes from '../../common/constants/heroes';
import {updateHero} from '../../store/actions/heroActions';
import {updateGame} from '../../store/actions/gameActions';
import Hero from './hero';
import Spinner from '../../common/spinner/spinner';
import SmartForm, {SmartInput} from '../../common/form';

const HeroesMenu = props => {
    const values = {
        name: '',
        difficulty: 'easy'
    }
    const validationSchema = {
        name: {
            validator: value => {
                if (value && !value.trim()) {
                    return {msg: "Enter correct name"}
                }
            },
            require: false
        },
        difficulty: {
            require: false,
        } 
    }
    return (
        <SmartForm 
            validationschema={validationSchema}
            values={values}
            className={props.className}
            submit
        >
            <SmartInput/>
            <SmartInput/>
        </SmartForm>
    )
}

import './heroes-menu.scss';

class HeroesHall extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.state = {
            showSpinner: true,
            chosen: 1,
            active: 1,
            difficulty: 'легкие',
        };
        this.onSelect = this.onSelect.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onSave = this.onSave.bind(this);
        this.defineDifficulty = this.defineDifficulty.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }
    onSelect(e, ind) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ chosen: ind });
    }
    onMouseOver(e, ind) {
        e.stopPropagation();
        this.setState({ active: ind });
    }
    onMouseOut(e) {
        e.stopPropagation();
        this.setState({ active: this.state.chosen });
    }
    defineDifficulty(e) {
        e.preventDefault();
        e.stopPropagation();
        const difficulty = this.state.difficulty === 'легкие' ? 'сложные' : 'легкие';
        this.setState({ difficulty });
    }
    onSave(e) {
        e.preventDefault();
        e.stopPropagation();
        const { setHeroName, setHeroImage, setDifficulty, resetHero } = this.props;
        const { active, difficulty } = this.state;
        const diff = difficulty === 'легкие' ? 'easy' : 'normal';
        const heroImage = Object.keys(Heroes)[active];
        const nickName = this.heroName.current.value || this.props.nickName;
        if (!nickName)
            return;
        setHeroName(nickName);
        setDifficulty(diff);
        setHeroImage(heroImage);
        resetHero(false);
    }
    onLoadImage(num = 3) {
        return () => {
            if (!num)
                this.setState({ showSpinner: false });
            return num -= 1;
        };
    }
    render() {
        const heroes = Object.keys(Heroes);
        const { active, difficulty, chosen, showSpinner } = this.state;
        const onLoad = this.onLoadImage(heroes.length - 1);
        return (
            <div className="heroes-menu-wrapper" ref={this.container}>
                {showSpinner ? <Spinner /> : <div className="display-none" />}
                <h2>Выберите героя</h2>
                <div className="heroes-wrapper">
                    {heroes.map((hero, i) => {
                        const activeHero = i === active || i === chosen;
                        const className = activeHero ? 'hero-wrapper active' : 'hero-wrapper';
                        return (
                            <Hero
                                className={className}
                                heroName={hero}
                                key={i}
                                onMouseEnter={e => this.onMouseOver(e, i)}
                                onMouseLeave={this.onMouseOut}
                                onFocus={e => this.onMouseOver(e, i)}
                                onClick={e => this.onSelect(e, i)}
                                onLoad={onLoad}
                            />
                        );
                    })}
                </div>
                
            </div>
        );
    }
}

export default connect(state => 
    ({hero: state.hero, game: state.game}), {updateGame, updateHero})(HeroesHall);

    // <form className="heroes-menu-menu">
    //                 <div className="hero-input-wrapper">
    //                     <label htmlFor="heroName">Имя героя</label>
    //                     <input
    //                         type="text"5
    //                         id="heroName5"
    //                         ref={this.he5roName}
    //                         placeholder=5{this.props.nickName}
    //                     />
    //                 </div>
    //                 <div className="hero-input-wrapper">
    //                     <label htmlFor="task-diff">Задачи</label>
    //                     <input
    //                         type="button"
    //                         ref={this.difficulty}
    //                         id="task-diff"
    //                         value={difficulty}
    //                         onClick={this.defineDifficulty}
    //                     />
    //                 </div>
    //                 <input type="submit" value="Сохpaнить" onClick={this.onSave} />
    //             </form>