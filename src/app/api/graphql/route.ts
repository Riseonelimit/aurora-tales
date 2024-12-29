import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

// Define your schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }
`;

// Define your resolvers
const resolvers = {
    Query: {
        users: () => {
            return [
                {
                    id: "1",
                    name: "John Doe",
                    email: "sample@gmail.com",
                },
                {
                    id: "2",
                    name: "John Doe 2",
                    email: "sample@gmail.com",
                },
                {
                    id: "3",
                    name: "John Doe 3",
                    email: "sample@gmail.com",
                },
                {
                    id: "4",
                    name: "John Doe 4",
                    email: "sample@gmail.com",
                },
            ];
        },
        user: (_: any, args: { id: string }) => {
            if (args.id === "1") {
                return {
                    id: "1",
                    name: "John Doe",
                    email: "some@gmail.com",
                };
            }
        },
    },
};

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export const handler = startServerAndCreateNextHandler(server);
export const GET = handler;
export const POST = handler;
