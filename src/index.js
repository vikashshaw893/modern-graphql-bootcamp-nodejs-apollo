import { GraphQLServer} from "graphql-yoga";

//type definitions (schema)
const typeDefs = `
    type Query{
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`;

//resolver
const resolvers = {
    Query: {
        hello(){
            return "Hello GraphQL"
        },
        name(){
            return "Vikash Shaw"
        },
        location(){
            return "Kolkata"
        },
        bio(){
            return "I'm a software developer"
        }
    }
};


//define graphql server
const server = new GraphQLServer({
    typeDefs,
    resolvers
});


//start graphql server
server.start(()=>{
    console.log("Server started with default port 4000 !!!");
});
