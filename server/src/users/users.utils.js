import jwt from "jsonwebtoken";
import prisma from "../client";

export const getUser = async(token) => {
  try {
    if (!token) return null;
    const verifiedToken = await jwt.verify(token, process.env.SECRET_KEY)
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

export function protectResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === 'query';
      if (query) {
        return null;
      } else return {ok: false, error: "Please log in to perform this action."}
    }
    return ourResolver(root, args, context, info);
  }
}