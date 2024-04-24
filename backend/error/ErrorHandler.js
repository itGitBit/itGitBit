import AppError from './AppError.js';
import ErrorTypes from '../consts/ErrorTypes.js';


const ErrorHandler = (err, req, res, next) => {


    if (err instanceof AppError) {

        if (err.errorType == ErrorTypes.VALIDATION_ERROR) {
            return res.status(400).send({
                errorCode: err.errorType,
                details: err.message,
            });
        }


        return res.status(err.statusCode).json({ errorCode: err.errorCode, details: err.message });
    }


    console.error(err);
    res.status(500).send('Something went wrong');

};

export default ErrorHandler;