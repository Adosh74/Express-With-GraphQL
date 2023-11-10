import {
	GraphQLID,
	GraphQLList,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql';
import { projects, clients } from '../sampleData';

// project type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	description: 'Project Type',
	fields: () => ({
		id: { type: GraphQLID },
		// clientId: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return clients.find((client) => client.id === parent.clientId);
			},
		},
	}),
});

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
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return clients;
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				return clients.find((client) => client.id === args.id);
			},
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return projects;
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db / other source
				return projects.find((project) => project.id === args.id);
			},
		},
	},
});

export default new GraphQLSchema({
	query: RootQuery,
});
