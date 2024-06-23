import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  createBlogInput,
  updateBlogInput,
} from "@priyanshudevsingh/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// auth middleware
blogRouter.use("/*", async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }

    c.set("userId", String(user.id));
    await next();
  } catch (err) {
    console.log(err);
  }
});

// create new blog route
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    return c.json({ id: blog.id });
  } catch (err) {
    console.log(err);
  }
});

// update blog route
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    const blog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (err) {
    console.log(err);
  }
});

// get all blogs route
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(blogs);
  } catch (err) {
    console.log(err);
  }
});

// get a particular blog route
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: { id },
      select:{
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        author:{
          select:{
            name: true,
          },
        }
      }
    });

    return c.json(blog);
  } catch (err) {
    console.log(err);
  }
});

// blogRouter.delete("/delete", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     await prisma.post.deleteMany({});

//     return c.json({ success: true });
//   } catch (err) {
//     console.log(err);
//   }
// });
