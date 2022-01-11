import {User} from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      DATABASE_URL: string
      DATABASE_URL_SHADOW: string
      SECRET_KEY: string
    }
  }
  namespace Express {
    interface Request {
      loggedInUser: User
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}