import util from "util";
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
	resolver
} from "graphql-sequelize";

import {
	User
} from "./models";

let userType = new GraphQLObjectType({
	name: "User",
	fields: () => _.assign(attributeFields(User), {
		id: {
			type: new GraphQLNonNull(GraphQLID),
			resolve: (user) => {console.log("TEST: " + typeof user.id.toString()); return user.id.toString();}
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
