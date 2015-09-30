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
	resolver
} from "graphql-sequelize";

import {
	User
} from "./models";

let userType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLInt)
		}
	})
});

let queryType = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		user: {
			type: userType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: resolver(User)
		},
		users: {
			type: userType,
			args: {
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
