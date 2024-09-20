This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Notes

I used [this Prisma blog](https://www.prisma.io/blog/fullstack-nextjs-graphql-prisma-oklidw1rhw) for the seeding script. The content that I seeded the db 
with is in `_components/content-data.ts` and is just my books and publications. 

When I make a change to the database, I need to migrate the db:
```
% npx prisma migrate dev --name someName
``

Sample query:
```
SELECT * FROM "Content" WHERE "type" = 'BOOK'
```


