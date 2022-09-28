
import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMasega from '../errorMasega/ErrorMasega';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    state = {
        charsList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnd: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLOading();
        this.marvelService.getAllCharacters(offset)
        .then(this.setStateData)
        .catch(this.onError)
    } 


    onCharListLOading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    setStateData = (newCharsList) => {
        let ended = false;
        if(newCharsList.length < 9) {
            ended = true
        }

        this.setState(({offset, charsList}) => ({
                charsList: [...charsList, ...newCharsList], 
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnd: ended
        }))
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
        const {charsList, error, loading, newItemLoading, offset, charEnd} = this.state;

        const items = this.creactCharItem(charsList);
        
        const errorMessage = error ? <ErrorMasega/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button 
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnd?'none':'block'}}
                className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}

CharList.propType = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;