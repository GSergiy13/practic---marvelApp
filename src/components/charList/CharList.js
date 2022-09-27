import './charList.scss';

import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import ErrorMasega from '../errorMasega/ErrorMasega';
import Spinner from '../spinner/Spinner';


class CharList extends Component {

    state = {
        charsList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
        .getAllCharacters()
        .then(this.setStateData)
    }

    setStateData = (charsList) => {
        this.setState({charsList, loading: false})
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    creactCharItem(arr) {

        const listItem =  arr.map((item) => {

            let imgStyle = {objectFit: 'cover'};

            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'};
            }

         
            return(
                <li className="char__item" key={item.id} onClick={() => { this.props.onCharSelected(item.id)}}>
                    <img src={item.thumbnail} style={imgStyle} alt="abyss"/>
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
            

        return (
            <ul className="char__grid">
                {listItem}
            </ul>
        )
    }


    render() {
        const {charsList, error, loading} = this.state;

        const items = this.creactCharItem(charsList);
        
        const errorMessage = error ? <ErrorMasega/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}

export default CharList;