import jwt from "jsonwebtoken";
import prisma from "../client";

export const getUser = async(token) => {
  try {
    
    if (!token) return null;
    
    const { id } = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await prisma.user.findUnique({where: {id}});
    if (user) {
      return user
    } else return null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export function protectResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) return { ok: false, error: "Please log in to perform this action." }
    return ourResolver(root, args, context, info);
  }
}