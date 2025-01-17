import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser =mutation({
    args:{
        name:v.string(),
        email:v.string(),
        photo:v.string(),
        uid:v.string()
    },
    handler:async(ctx,args)=>{
        //if user already exits
        const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect()
        console.log(user)

        //if user does not exists
        if(user.length==0){
            const result=await ctx.db.insert('users',{
                name:args.name,
                email:args.email,
                photo:args.photo,
                uid:args.uid
            })
            return result
        }else{
            return user[0]
        }
    }
})

export const GetUser=query({
    args:{
        email:v.string()
    },
    handler:async (ctx, args) => {
        const user=await ctx.db.query('users').filter((q)=>q.eq(q.field('email'),args.email)).collect();
        return user.length > 0 ? user[0] : null; 
    },
})