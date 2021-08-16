import { GraphQLServer} from "graphql-yoga";

//type definitions (schema)

const users = [
    {
        id: 1,
        name: "Vikash",
        age: 32
    },
    {
        id: 2,
        name: "Sam",
        age: 31
    }
];

const posts = [
    {
        id: 1,
        title: "Post1",
        body: "Post Body1",
        published: true,
        author: 1
    },
    {
        id: 2,
        title: "Post2",
        body: "Post Body2",
        published: true,
        author: 2
    }
    ,
    {
        id: 3,
        title: "Post3",
        body: "Post Body3",
        published: true,
        author: 2
    }
];

const comments = [
    {
        id: 1,
        comment: "comment 1",
        author: 1,
        post: 1
    },
    {
        id: 2,
        comment: "comment 2",
        author: 1,
        post: 2
    },
    {
        id: 3,
        comment: "comment 3",
        author: 2,
        post: 3
    },
    {
        id: 4,
        comment: "comment 4",
        author: 2,
        post: 1
    },
    {
        id: 5,
        comment: "comment 5",
        author: 1,
        post: 2
    },
    {
        id: 6,
        comment: "comment 6",
        author: 2,
        post: 1
    },
];

const typeDefs = `
    type Query{
        users(key:String): [User!]!
        posts(key:String): [Post!]!
        comments:[Comment]
        me: User!
        post: Post!
    }

    type User{
        id: ID!,
        name: String!
        age: Int,
        posts: [Post]
        comments: [Comment]
    }

    type Post{
        id: ID!
        title: String!
        body: String
        published: Boolean!
        author: User!
        comments: [Comment]
    }

    type Comment{
        id: ID!
        comment: String!
        author: User!
        post: Post!
    }
`;

//resolver
const resolvers = {
    Query: {
        users(parent, args, ctx, info){
            if (!args.key) {
                return users;
            }
            
            return users.filter((user)=>{
               return user.name.toLowerCase().includes(args.key.toLowerCase());
            })  
        },

        posts(parent, args, ctx, info){
            if (!args.key) {
                return posts;
            }
            
            return posts.filter((post)=>{
                const isTitleMatch = post.title.toLowerCase().includes(args.key.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.key.toLowerCase());
                return isTitleMatch || isBodyMatch;
            })  
        },

        comments(parent, args, ctx, info){
            return comments;
        },

        me(){
            return {
                id: 1,
                name: "Vikash",
                age: 36,
            };            
        },

        post(){
            return {
                id: "Post_001",
                title: "Post Title 1",
                body: "Post Body Content 1",
                published: true
            };      
        }        
    },
    Post:{
        author(parent, args, ctx, info){
            return users.find((user)=>{
                return user.id === parent.author;
            })
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=>{
                return comment.post === parent.id;
            });
        }
    },
    User:{
        posts(parent, args, ctx, info){
            return posts.filter((post)=>{
                return post.author === parent.id;
            });
        },
        comments(parent, args, ctx, info){
            return comments.filter((comment)=>{
                return comment.author === parent.id;
            });
        }
    },
    Comment:{
        author(parent, args, ctx, info){            
            return users.find((user)=>{
                return user.id === parent.author;
            });
        },
        post(parent, args, ctx, info){
            return posts.find((post)=>{
                return post.id === parent.post;
            });
        },
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
