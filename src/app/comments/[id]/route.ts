import { redirect } from "next/navigation";

import { NextRequest } from "next/server";
import { comments } from "../data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (parseInt(params.id) > comments.length) {
    redirect("/comments");
  }

  const comment = comments.find((comment) => {
    return comment.id === parseInt(params.id);
  });
  return Response.json(comment);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = comments.findIndex((comment) => {
    return comment.id === parseInt(params.id);
  });

  const deletedComment = comments[index];
  comments.splice(index, 1);

  return Response.json(deletedComment);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const newText = await request.json();

  const comment = comments.find((comment) => {
    return comment.id === parseInt(params.id);
  });

  comment!.text = newText.text;

  return new Response(JSON.stringify(comment), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201,
  });
}
