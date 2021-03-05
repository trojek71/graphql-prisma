//import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'


const Mutation = {

    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(args.data.password, 10)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }
    },

    async deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
            
    }, 

    async login(parent, args, { prisma }, info){

        const user = await prisma.query.user({
            where:{
                email: args.data.email
            }
        })

        if (!user){
            throw new Error('Nie można się zalogować')
        }
            const isMatch = await bcrypt.compare(args.data.password, user.password)

            if (!isMatch){
                throw new Error(' Nie można się zalogować')
            }
            return {
                user,
                token: jwt.sign({ userId: user.id }, 'thisisasecret')
            }

    },

    //     const emailTaken = db.users.some((user) => user.email === args.data.email)
    //    if (emailTaken) {
    //        throw new Error('Email taken')
    //    }
    //     const user ={
    //         id: uuid(),
    //         ...args.data
    //     }
    //     db.users.push(user)
        
    //     return user
    
    // async deleteUser(parent, args, { prisma }, info){
            
    //         const userExists = await prisma.exists.User({id: args.id})
                
    //             if (!userExists) {
    //                 throw new Error('User not found')
    //             }
    //             return prisma.mutation.deleteUser({
    //                 where: {
    //                     id: args.id
    //                 }
    //             }, info)

        // const userIndex = db.users.findIndex((user) => user.id === args.id)
        //     if(userIndex === -1){
        //         throw new Error ('User not found')
        //     }
        //         const deletedUsers = db.users.splice(userIndex, 1)
        //             db.posts = db.posts.filter((post) => {
        //                 const match = post.author === args.id
                        
        //                 if (match) {
                            
        //                     db.comments = db.comments.filter((comment) => comment.post !== post.id )
        //                 }
        //                     return !match
        //             })
                    
        //                 db.comments = db.comments.filter((comment) => comment.author !== args.id)



        //         return deletedUsers[0]

//    },
   async updateUser(parent, args, { prisma }, info) {
         return prisma.mutation.updateUser({
            where:{
                id: args.id
            },
            data: args.data
        }, info)    
    
    // const { id, data } = args
        // const user = db.users.find((user) => user.id === args.id)

        // if (!user){
        //     throw new Error('User not found')
        // }

        // if (typeof data.email === 'string'){
        //     const emailTaken = db.users.some((user) => user.email === data.email)
            
        //     if (emailTaken) {
        //         throw new Error('Email taken')
        //     }
        //     user.email = data.email
        // }

        // if (typeof data.name === 'string'){
        //     user.name = data.name
        // }

        // if (typeof data.age !== 'undefine'){
        //     user.age = data.age

        // }

        // return user

    },

    createPost(parent, args, { prisma, pubsub, request }, info){
            const userId = getUserId(request)

            return prisma.mutation.createPost({
                data:{
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                    author: {
                        connect: {
                            id: userId
                        }
                    }
                }
            },info)



        // const userExist =db.users.some((user) => user.id === args.data.author)
        //     if (!userExist) {
        //         throw new Error('User not found')
        //     }
        //     const post = {
        //         id: uuid(),
        //         ...args.data
        //     }
        //     db.posts.push(post)

        //     if(args.data.published) {
        //         pubsub.publish(`post`, 
        //         { post:{
        //             mutation: 'CREATED',
        //             data:post
        //         } 
        //     })
        //     }

        //     return post
    },
    async deletePost(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id: args.id,
            where:{
                id: userId
            }
        })

            if (!postExists) {
                throw new Error('Nie mogę znaleźć postu do skasowania')
            }

        return prisma.mutation.deletePost({
            where: {
                id: args.id
            }
        }, info)

    },
        // const postIndex = db.posts.findIndex((post) => post.id = args.id)
        //     if (postIndex === -1){
        //         throw new Error ('Post not found')
        //     }

        //     const [post] = db.posts.splice(postIndex, 1)
            
        //     db.comments = db.comments.filter((comment) => comment.post !== args.id)

        //     if(post.published){
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'DELETED',
        //                 data: post
        //             }
        //         })
        //     }
            
        //       return post 
       

    updatePost (paret,args, { prisma }, info){

            return prisma.mutation.updatePost({
                where: {
                    id: args.id
                },
                data: args.data
            }, info)
        },
        // const {id, data} = args
        // const post = db.posts.find((post) => post.id === id)
        // const orginalPost = {...post}

        // if (!post) {
        //     throw new Error('Post not found')
        // }

        // if (typeof data.title === 'string'){
        //     post.title = data.title
        // }
        // if (typeof data.body === 'string') {
        //     post.body = data.body
        // }

        // if (typeof data.published === 'boolean'){
        //     post.published = data.published
        // }

        //     if (orginalPost.published && !post.published){

        //         pubsub.publish('post' , {
        //             post : {
        //                 mutation: 'DELETED',
        //                 data: orginalPost
        //             }
        //         })

        //     } else if (!orginalPost.published && post.published){

        //         pubsub.publish('post', {
        //            post:{
        //             mutation: 'CREATED',
        //             data: post
        //            }
        //         })

        //     } else if (post.published) {
        //         pubsub.publish('post', {
        //             post: {
        //                 mutation: 'UPDATED',
        //                 data: post
        //             }
        //         })
        //     } 

        // return post

    

    createComment(parent, args, { prisma }, info){

            return prisma.mutation.createComment({
                data:{
                    text : args.data.text,
                    author:{
                        connect:{
                            id: args.data.author
                        }
                    },
                    post:{
                        connect:{
                            id: args.data.post
                        }
                    }
                }
            },info)
        },


        // const userExist = db.users.some((user) => user.id === args.data.author)
        // const postExist = db.posts.some((post) => post.id === args.data.post && post.published)

        // if (!userExist || !postExist){
        //     throw new Error('Unable to find user and post!!!')
        // }
        // const comment ={
        //     id: uuid(),
        //     ...args.data
        // }

        // db.comments.push(comment)
        //     pubsub.publish(`comment ${ args.data.post }`, { 
        //         comment: {
        //             mutation : 'CREATED',
        //             data: comment
        //         }

        //     })

        // return comment

    

    deleteComment(parent, args, { prisma }, info){

        return prisma.mutation.deleteComment({
            where:{
                id: args.id
            }
        },info)
        

    },
        // const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        //     if(commentIndex === -1){
        //         throw new Error ('Comment not found')
        //     }

        //     const [deletedComment] = db.comments.splice(commentIndex, 1)
        //         pubsub.publish(`comment ${deletedComment.post}`, {
        //             comment:{
        //                 mutation : 'DELETED',
        //                 data: deletedComment
        //             }
        //         })

        //     return deletedComment
        // },        

    updateComment(parent, args, { prisma }, info){
        
            return prisma.mutation.updateComment({
                where:{
                    id: args.id
                },
                data: args.data
            },info)
        }

    //     const {id, data} = args
    //     const comment = db.comments.find((comment) => comment.id === id)

    //     if (!comment){
    //         throw new Error('Comment not found')
    //     }

    //     if (typeof data.text === 'string'){
    //         comment.text = data.text
    //     }

    //     pubsub.publish(`comment ${comment.post}`, {
    //         comment :{
    //             mutation : 'UPDATED',
    //             data: comment
    //         }
    //     })


    //     return comment

    // }
}
export {Mutation as default}