import { Component } from "react/cjs/react.production.min";
import ErrorMasega from "../errorMasega/ErrorMasega";
class ErrorBaundaries extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({error: true});
    }

    render() {
       if(this.state.error) {
        return <ErrorMasega />
       }

       return this.props.children;
    }
 }

 export default ErrorBaundaries;