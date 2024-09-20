import { Type } from "@prisma/client";
import { prisma } from ".";

export const helpers = {
    async getContentByKey (key: string) {
        return await prisma.content.findFirst({
            where: {
                key,
            }});
    },

    async getContentByType (type: Type) {
        return await prisma.content.findMany({
            where: {
              type
            },
          });
    }
};