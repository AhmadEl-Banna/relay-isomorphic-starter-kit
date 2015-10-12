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
	resolver
} from "graphql-sequelize";

import {
	User
} from "./models";

import util from "util";

let userType = new GraphQLObjectType({
	name: "User",
	fields: () => attributeFields(User)
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
			type: new GraphQLList(userType),
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
