import { Component } from "react/cjs/react.production.min";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBaundaries from "../errorBaundaries/ErrorBaundaries";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = id => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                <ErrorBaundaries>
                    <RandomChar/>
                    </ErrorBaundaries>
                    <div className="char__content">
                        <ErrorBaundaries>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBaundaries>
                        <ErrorBaundaries>
                            <CharInfo charId={this.state.selectedChar}/>
                        </ErrorBaundaries>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;