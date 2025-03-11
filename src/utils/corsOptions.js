const whiteList = ['http://localhost:4000'];

const corsOptions = {
    origin: (origin, cb) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            cb(null, true);
        }else{
            cb(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;