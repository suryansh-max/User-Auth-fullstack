const notFound = (req , res , next) => {
    const error  = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const  handleError = (err , req, res, next) =>{
    let code = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CasteError' && err.kind === 'ObjectId'){
        code = 400;
        message = 'Resource not found';
    }

    res.status(code).json({
        message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

export {handleError , notFound};
 