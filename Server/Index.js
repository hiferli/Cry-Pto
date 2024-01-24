import express from 'express'
import cors from 'cors'

import customDataRoutes from './Routes/CustomDataRoute.js'

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/data' , customDataRoutes)

let count = 0;
app.get('/' , (request , response) => {
    count++;
    return response.status(200).json({
        "Message": "Hello World",
        "Count": count
    })
})

app.listen(3000, () => {
    console.log("Listening on PORT: 3000")
})
