import dotenv from 'dotenv';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

dotenv.config();

export const app = express();

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: process.env.NODE_ENV === 'development' ? true : false,
	})
);
