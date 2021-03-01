const Query = {
    
        users(parent, args, { prisma }, info){
            const opArgs ={}

            if (args.query) {
                    opArgs.where = {
                        OR:[{
                            name_contains: args.query
                        },{
                            email_contains: args.query
                        }]
                    }
            }

            return prisma.query.users(opArgs, info)

            // if (!args.query) {
            //     return db.users
            // }
            // return db.users.filter((user) =>{
            //     return user.name.toLowerCase().includes(args.query.toLowerCase())
            // })
        },
        posts(parent, args, { prisma },info){
            const opArgs ={}
            if (args.query) {
                opArgs.where = {
                    OR:[{
                        title_contains: args.query
                    },{
                        body_contains: args.query
                    }]
                }
        }




            return prisma.query.posts(opArgs, info)
            // if (!args.query){
            //     return db.posts
            // }
            // return db.posts.filter((post) => {
            //     const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            //     const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLowerCase())
            //     return isBodyMatch || isTitleMatch
            // })
        },
        comments(parent, args, { prisma }, info){
                    return prisma.query.comments(null, info)
        },
        me() {
            return {
                id: '123498',
                name: 'Tomek',
                email: 'tomek@mail.com',                     
            }
        },      
    }
export {Query as default}