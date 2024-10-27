import { z } from 'zod'

const productId = z
  .string({
    required_error: 'productId is required',
    invalid_type_error: 'productId must be a string',
  })
  .min(1, 'productId is required')
  .uuid('Invalid productId')

const quantity = z
  .number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number',
  })
  .int()
  .positive('quantity must be a positive integer')

export const createCartItemSchema = z.object({
  productId,
  quantity,
})

export const patchCartItemSchema = z.object({
  productId,
  quantity,
})

export const deleteCartItemSchema = z.object({
  productId,
})
