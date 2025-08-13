import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const validatedData = formSchema.parse(req.body);
    const response = await fetch(`${process.env.API_URL}/note`, {
      method: "POST",

      body: JSON.stringify(validatedData),
    }).then((res) => res.json());

    if (response.successfully) {
      res.status(201).json(response);
    }

    return res
      .status(200)
      .json({ message: "Form submitted successfully", data: validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors as Record<
        string,
        string[]
      >;
      const errors = Object.keys(fieldErrors)?.reduce((acc, key) => {
        acc[key] = fieldErrors[key]?.[0] || "Unknown error";
        return acc;
      }, {} as Record<string, string>);
      return res.status(400).json({ errors });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
