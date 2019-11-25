import React, {useState} from 'react';
import {connect} from 'react-redux';

import Heroes from '../../assets/data/heroes';
import {updateHero} from '../../store/actions/heroActions';
import {updateGame} from '../../store/actions/gameActions';
import Hero from './hero';
import T from '../../translator';
import Spinner from '../../common/spinner/spinner';
import SmartForm, {SmartInput} from '../../common/form';
SmartForm.prototype.handleOnClick = function({target:{type, value}}) {
    if (type === 'button') {
        const Value = value !== 'easy' ? 'easy' : 'hard';
        this.setState(({values}) => ({values: {...values, difficulty: Value}}));
    }
}

import './heroes-menu.scss';

export const HeroMenu = props => {
    const {submitHandler, ...restProps} = props;
    const values = {
        name: '',
        difficulty: 'easy'
    };
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
    };
  
    return (
        <SmartForm 
            className={props.className || 'hero-menu__form'}
            validationschema={validationSchema}
            values={values}
            {...restProps}
            submit={submitHandler}
        >
            {
                props => {
                    const { errors, values, ...restProps} = props;
                    return (
                    <React.Fragment>
                        <SmartInput
                            type="text"
                            name="name"
                            inputStyle="outlined"
                            labelStyle="like-placeholder"
                            placeholder="Hero name"
                            labelText="Name"
                            value={values.name}
                            error={errors.name}
                            {...restProps}
                        />
                        <SmartInput
                            type="button"
                            name="difficulty"
                            value={values.difficulty}
                            {...restProps}
                        />
                        <button type="submit"><T keys="hero_menu.submit" /></button>
                    </React.Fragment>
                    )
                }
            }
        </SmartForm>
    )
};

const HeroesHall = props => {
    const [active, setActive] = useState(1);
    const [chosen, setChosen] = useState(1);

    const handleOnClick = (i, hero) => {
        props.onClick(hero)
        setChosen(i)
    }
    
    const heroes = Object.keys(props.heroes);
    let imagesNumber = heroes.length;
   
    return (
        <div className={props.className || 'heroes-wrapper'}>
            {heroes.map((hero, i) => {
                const activeHero = i === active || i === chosen;
                return (
                    <Hero
                       className={activeHero ? 'hero-wrapper active-hero' : 'hero-wrapper'}
                        heroName={hero}
                        key={i}
                        onMouseEnter={() => setActive(i)}
                        onMouseLeave={() => setActive(chosen)}
                        onFocus={() => setActive(i)}
                        onClick={() => handleOnClick(i, hero)}
                        onLoad={props.onLoad}
                    />
                );
            })}
        </div>
    )
};

const HeroesPage = props => {
    const {heroes = Heroes, activeHero = 1, updateGame, updateHero, hero, game, close} = props;
    const heroesArray = Object.keys(heroes);
    const [spinner, setSpinner] = useState(true);
    const [heroName, setHeroName] = useState(heroesArray[activeHero]);
    let heroesQuantity = heroes.length
    const onLoadImage = (() => {
        return () => {
            heroesQuantity -= 1;
            if (!heroesQuantity)
                setSpinner(false);
        };
    })();
    
    const handleClick = heroName => {
        console.log(heroName)
        setHeroName(heroName);
    }

    const submitHandler = {
        fetch: ({name, difficulty}) => {
            updateHero({...hero, imageName: heroName, nickName: name});
            updateGame({...game, difficulty});
            close();
            return true;
        },
        onResponse: f => f,
    }
    return (
        <div className={props.className || "heroes-menu-wrapper"}>
            <button className="heroes-menu__close" onClick={close}>&times;</button>
            {spinner && <Spinner />}
            <h2><T keys="hero_menu.title" /></h2>
            <HeroesHall onLoad={onLoadImage} onClick={handleClick} heroes={Heroes} />
            <HeroMenu submitHandler={submitHandler} />
        </div>
    )
}


export default connect(state => 
    ({hero: state.hero, game: state.game}), {updateGame, updateHero})(HeroesPage);

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


//
// class HeroesHall extends React.Component {
//     constructor(props) {
//         super(props);
//         this.container = React.createRef();
//         this.state = {
//             showSpinner: true,
//             chosen: 1,
//             active: 1,
//             difficulty: 'легкие',
//         };
//         this.onSelect = this.onSelect.bind(this);
//         this.onMouseOver = this.onMouseOver.bind(this);
//         this.onSave = this.onSave.bind(this);
//         this.defineDifficulty = this.defineDifficulty.bind(this);
//         this.onMouseOut = this.onMouseOut.bind(this);
//     }
//     onSelect(e, ind) {
//         e.stopPropagation();
//         e.preventDefault();
//         this.setState({ chosen: ind });
//     }
//     onMouseOver(e, ind) {
//         e.stopPropagation();
//         this.setState({ active: ind });
//     }
//     onMouseOut(e) {
//         e.stopPropagation();
//         this.setState({ active: this.state.chosen });
//     }
//     defineDifficulty(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const difficulty = this.state.difficulty === 'легкие' ? 'сложные' : 'легкие';
//         this.setState({ difficulty });
//     }
//     onSave(e) {
//         e.preventDefault();
//         e.stopPropagation();
//         const { setHeroName, setHeroImage, setDifficulty, resetHero } = this.props;
//         const { active, difficulty } = this.state;
//         const diff = difficulty === 'легкие' ? 'easy' : 'normal';
//         const heroImage = Object.keys(Heroes)[active];
//         const nickName = this.heroName.current.value || this.props.nickName;
//         if (!nickName)
//             return;
//         setHeroName(nickName);
//         setDifficulty(diff);
//         setHeroImage(heroImage);
//         resetHero(false);
//     }
//     
//     render() {
//         const heroes = Object.keys(Heroes);
//         const { active, difficulty, chosen, showSpinner } = this.state;
//         const onLoad = this.onLoadImage(heroes.length - 1);
//         return (
//             <div className="heroes-menu-wrapper" ref={this.container}>
//                 {showSpinner ? <Spinner /> : <div className="display-none" />}
//                 <h2>Выберите героя</h2>
//                 <div className="heroes-wrapper">
//                     {heroes.map((hero, i) => {
//                         const activeHero = i === active || i === chosen;
//                         const className = activeHero ? 'hero-wrapper active' : 'hero-wrapper';
//                         return (
//                             <Hero
//                                 className={className}
//                                 heroName={hero}
//                                 key={i}
//                                 onMouseEnter={e => this.onMouseOver(e, i)}
//                                 onMouseLeave={this.onMouseOut}
//                                 onFocus={e => this.onMouseOver(e, i)}
//                                 onClick={e => this.onSelect(e, i)}
//                                 onLoad={onLoad}
//                             />
//                         );
//                     })}
//                 </div>
//                 <HeroesMenu/>
//             </div>
//         );
//     }
// }