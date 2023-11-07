import { GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { projects, clients } from '../sampleData';

// client type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	description: 'Client Type',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Root Query',
	fields: {
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				return clients.find((client) => client.id === args.id);
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
});
