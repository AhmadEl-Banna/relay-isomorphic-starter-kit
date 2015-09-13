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
	connectionArgs,
	connectionDefinitions,
	connectionFromArray,
	connectionFromPromisedArray,
	mutationWithClientMutationId,
	nodeDefinitions,
	fromGlobalId,
	toGlobalId,
	globalIdField
} from "graphql-relay";

import {
	User,
	getUser
} from "./database";

let {nodeInterface, nodeField} = nodeDefinitions(
	(globalId) => {
		let {type, id} = fromGlobalId(globalId);
		if(type === "User") {
			return getUser(id);
		} else {
			return null;
		}
	},
	(obj) => {
		if(obj instanceof User) {
			return userType;
		} else {
			return null;
		}
	}
);

let userType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: globalIdField("User")
	}),
	interfaces: [
		nodeInterface
	]
});

let queryType = new GraphQLObjectType({
	name: "Query",
	fields: () => ({
		node: nodeField,
		user: {
			type: userType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: (root, {id}) => getUser(id) 
		}
	})
});

let mutationType = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({

	})
});

export default new GraphQLSchema({
	query: queryType,
	mutation: mutationType
});
