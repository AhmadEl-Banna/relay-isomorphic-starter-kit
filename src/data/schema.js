import _ from "lodash";

import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLInterfaceType,
	GraphQLEnumType,
	GraphQLList,
	GraphQLNonNull,
	GraphQLBoolean,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLID
} from "graphql";

import {
	attributeFields,
	resolver,
	relay
} from "graphql-sequelize";

import {
	fromGlobalId
} from "graphql-relay";

import database from "./database";

import {
	User
} from "./models";

const {
	nodeInterface,
	nodeField,
	nodeTypeMapper
} = relay.sequelizeNodeInterface(database);

let userType = new GraphQLObjectType({
	name: "User",
	fields: () => _.assign(attributeFields(User, {
		globalId: true
	}), {
		_id: {
			type: new GraphQLNonNull(GraphQLInt),
			resolve: (user) => user.id
		}
	}),
	interfaces: [nodeInterface]
});

nodeTypeMapper.mapTypes({
	[User.name]: userType
});

let queryType = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		node: nodeField,
		user: {
			type: userType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: resolver(User)
		},
		users: {
			type: new GraphQLList(userType),
			args: {
				offset: {
					type: GraphQLInt
				},
				limit: {
					type: GraphQLInt
				},
				order: {
					type: GraphQLString
				}
			},
			resolve: resolver(User)
		}
	})
});

let mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({

	})
});

let schema = new GraphQLSchema({
	query: queryType,
	// mutation: mutationType
});

export default schema;
