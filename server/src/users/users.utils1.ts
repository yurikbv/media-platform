import jwt from "jsonwebtoken";
import prisma from "../client";
import {Context, Resolver} from "../types";

export const getUser = async(token?: any) => {
  try {
    
    if (!token) return null;
    
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY)
    if ("id" in verifiedToken) {
      const user = await prisma.user.findUnique({where: {id: verifiedToken["id"]}});
      if (user) {
        return user
      }
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function protectResolver(ourResolver: Resolver) {
  return function (root: any, args: any, context: Context, info: any) {
    if (!context.loggedInUser) return { ok: false, error: "Please log in to perform this action." }
    return ourResolver(root, args, context, info);
  }
}