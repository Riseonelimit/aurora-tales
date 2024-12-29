import { db } from "@/db/connection";
import { usersTable } from "@/db/schema";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

// Define your schema
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }
`;

// Define your resolvers
const resolvers = {
    Query: {
        users: async () => {
            const data = await db.select().from(usersTable);
            console.log(data);
            return data;
        },
        user: (_: unknown, args: { id: string }) => {
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
