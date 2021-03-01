import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

export  { prisma as default }

// const createPostForUser = async (authorId, data) => {
//     const userExists= await prisma.exists.User({id: authorId})
//         if (!userExists) {
//             throw new Error('user not found')
//         }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }')
    
//     return post.author
// }

//createPostForUser('cklaxj0g7037p0952fpqvw5p3', {
//    title: 'Nowy kurs o node js',
//    body: 'nowy kurs o back endzie  mongodb nodejs',
//    published: true
//}).then((user) =>{
//   console.log(JSON.stringify(user, undefined, 2)) 
//}).catch((error) => {
//    console.log(error.message)
//})

//prisma.query.users(null, '{id name email posts { id title }  }').then((data) =>{
//    console.log(JSON.stringify(data, undefined,2))
//})

//prisma.query.comments(null, '{id text author{ id name }}').then((data) => {
//   console.log(JSON.stringify(data, undefined , 2))
//})


// const updatePostForUser = async (postId,data) => {
//     const postExists = await prisma.exists.Post({ id: postId })
//         if (!postExists) {
//             throw new Error('post not found')
//         } 
//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id name email posts {id title published} } }')
//     const user = await prisma.query.user({
//         where:{
//             id: post.author.id
//         }
//     }, '{ id name email posts { id title published}}')
//     return post.author
// }

//updatePostForUser("cklaxp1l403fd0952bwb5bopj", { published: false}).then((user) =>{
//    console.log(JSON.stringify(user, undefined, 2))
//}).catch((error) => {
//    console.log(error.message)
//})

//prisma.mutation.createPost({
//    data: {
//             title: "GraphQL 102",
//         body: "",
//         published: false,
//             author: {
//                 connect: {
//                     id: "cklbzymyz010k0b52482yaixo"
//                 }
//             }
//         }
//     }, '{ id title body published }').then((data) => {
//         console.log(data)
//         return prisma.query.users(null, '{ id name posts { id title } }')
//     }).then((data) => {
//         console.log(JSON.stringify(data, undefined, 2))
//
//     })
//prisma.mutation.updatePost({
//    where:{
//        id: "cklglur1u00130a52efhx46ii"
//    },
//    data : {
//        body:"po updacie...... ",
//        published: true
//    }
//}, '{ id }').then((data) => {
//    return prisma.query.posts(null, '{id title body published}')
//}).then((data) => {
//    console.log(data)
//})
