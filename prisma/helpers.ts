import { Type } from "@prisma/client";
import { prisma } from ".";

export const helpers = {
    async getContentByKey (key: string) {
        return await prisma.content.findFirst({
            where: {
                key: key
            }});
    },

    async getContentByType (type: Type) {
        return await prisma.content.findMany({
            where: {
              type: type
            },
          });
    },

    async getBooks () {
        return await prisma.content.findMany({
            where: {
              type: Type.BOOK
            },
          });
    },

    async getPubs () {
        return await prisma.content.findMany({
            where: {
              type: Type.PUB
            },
          });
    },
};