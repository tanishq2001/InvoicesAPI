const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const schema1 = require('./schema1.js');

const cors = require('cors');

const app = express();

// enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to Invoice Api");
})

app.use('/storeshop', expressGraphQL({
    schema:schema,
    graphiql:true
}));
app.use('/invoicedetails:', expressGraphQL({
    schema:schema1,
    graphiql:true
}));


app.listen(4000, () => {
    console.log('Server is running on port 4000..');
});
