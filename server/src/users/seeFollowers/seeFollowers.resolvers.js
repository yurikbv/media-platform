import prisma from "../../client";

export default {
  Query: {
    seeFollowers: async (_, {username, page}) => {
      const ok = await prisma.user.findUnique({where: { username }, select: { id: true }});
      if (!ok) return { ok: false, error: 'User not found' }
      const followers = await prisma.user.findUnique({where: {username}}).followers({ take: 5, skip: (page - 1) * 5 });
      const totalFollowers = await prisma.user.count({ where: { following: { some: { username } } }})
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5)
      }
    }
  }
}