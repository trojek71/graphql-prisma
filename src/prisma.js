import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

//prisma.query.users(null, '{id name email posts { id title }  }').then((data) =>{
//    console.log(JSON.stringify(data, undefined,2))
//})

//prisma.query.comments(null, '{id text author{ id name }}').then((data) => {
//   console.log(JSON.stringify(data, undefined , 2))
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
prisma.mutation.updatePost({
    where:{
        id: "cklglur1u00130a52efhx46ii"
    },
    data : {
        body:"po updacie...... ",
        published: true
    }
}, '{ id }').then((data) => {
    return prisma.query.posts(null, '{id title body published}')
}).then((data) => {
    console.log(data)
})