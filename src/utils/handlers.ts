import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const BadRequest = (message: string) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 400,
  })
}

export const Unauthorized = (message: string) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 401,
  })
}

export const Forbidden = (message: string) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 403,
  })
}

export const NotFound = (message: string) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 404,
  })
}

export const InternalServerError = (message: string) => {
  return new Response(JSON.stringify({ error: message }), {
    headers: {
      'content-type': 'application/json',
    },
    status: 500,
  })
}

export const errorResponseHandler = (error: unknown) => {
  let errorMessage = 'An unknown error occurred'

  if (error instanceof SyntaxError) {
    errorMessage = 'Invalid JSON'
  }

  if (error instanceof Error) {
    errorMessage = error.message
  }

  if (error instanceof z.ZodError) {
    errorMessage = error.errors.map((e) => e.message).join(', ')
    return BadRequest(errorMessage)
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    errorMessage =
      (error?.meta?.cause as string) ||
      JSON.stringify(error.meta) ||
      error.message
  }

  return InternalServerError(errorMessage)
}
