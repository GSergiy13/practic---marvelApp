import img from './error.gif';

const ErrorMasega = () => {
    return (
        <img src={img} style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0px auto' }} alt="Error" />
    )
}


export default ErrorMasega;