import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { app } from './app';

dotenv.config();

const { PORT } = process.env || 3001;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
