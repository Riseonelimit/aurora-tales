"use client";

import { gql, useQuery } from "@apollo/client";

const GET_HELLO = gql`
    query GetHello {
        hello
    }
`;
const GET_USERS = gql`
    query GetUsers {
        users {
            id
            name
        }
    }
`;
const GET_UNIQUE_USERS = gql`
    query GetUsers($id: ID!) {
        user(id: $id) {
            email
            name
        }
    }
`;
export default function Page() {
    const { loading, error, data } = useQuery(GET_UNIQUE_USERS, {
        variables: { id: "1" },
    });
    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // return <p>{data.users.map((e) => e.name)}</p>;
    return <p>{data.user.name}</p>;
}
