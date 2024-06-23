import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signupInput, signinInput } from "@priyanshudevsingh/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// signup route
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token });
  } catch (err) {
    console.log(err);
  }
});

// signin route
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (err) {
    console.log(err);
  }
});

// get user route
userRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

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

    const res = await prisma.user.findUnique({
      where: {
        id: String(user.id),
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    return c.json(res);
  } catch (err) {
    console.log(err);
  }
});

// userRouter.delete("/delete", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());

//   try {
//     await prisma.user.deleteMany({});

//     return c.json({ success: true });
//   } catch (err) {
//     console.log(err);
//   }
// });
