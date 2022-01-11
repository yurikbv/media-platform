import { User } from '@prisma/client';
import {Request, Response, NextFunction}  from'express';

type ContextBody = {
  req?: Request
  res?: Response
  next?: NextFunction
}

type Context = {
  loggedInUser?: User
  prisma: PrismaClient
}

export type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver
  }
}