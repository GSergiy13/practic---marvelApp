import { Component } from 'react/cjs/react.production.min';

import './randomChar.scss';
import Spinner from '../spinner/Spinner'
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMasega from '../errorMasega/ErrorMasega';

class RandomChar extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();


    componentDidMount() {
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000)  + 1011000);
        this.onCharLoading();

        this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
    }

    render() {
        const {char, loading, error} = this.state;

        const errorMasega = error ? <ErrorMasega/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ?  <View char={char} /> : null

        return (
            <div className="randomchar">

                {errorMasega}
                {spinner}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wikil} = char;
    
    let imgStyle = {objectFit: 'cover'};

    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'unset'};
    }

    // http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg

    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" style={imgStyle} className="randomchar__img"/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wikil} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    );
}

export default RandomChar;