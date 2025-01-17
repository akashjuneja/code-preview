import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const CreateWorkspace=mutation({
    args:{
        message:v.any(),
        user:v.id('users')
    },handler:async (ctx,args)=>{
        const workspaceId=await ctx.db.insert('workspaces',{
            message:args.message,
            user:args.user
        })
        return workspaceId
    }
})

export const GetMessage=mutation({
    args:{
        id:v.any()
    },
    handler:async (ctx,args)=>{
        const workspace = await ctx.db.query('workspaces').filter(q => q.eq(q.field('_id'), args.id)).collect();
        return workspace[0] // Return the first workspace or null
    }
})