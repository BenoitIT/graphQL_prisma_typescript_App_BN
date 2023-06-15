import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import qraphQlSchema from './schema/graphQLschema';
const app:express.Application = express();



app.use('/graphql', graphqlHTTP({
 schema:qraphQlSchema,
 graphiql:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=>console.log(`listening to port ${PORT}`));

