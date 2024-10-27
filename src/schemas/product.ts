import { z } from 'zod'

const productId = z
  .string({
    required_error: 'productId is required',
    invalid_type_error: 'productId must be a string',
  })
  .min(1, 'productId is required')
  .uuid('Invalid productId')

const name = z
  .string({
    required_error: 'name is required',
    invalid_type_error: 'name must be a string',
  })
  .min(1, 'name is required')

const price = z
  .number({
    required_error: 'price is required',
    invalid_type_error: 'price must be a number',
  })
  .min(0, 'price must be greater than 0')

const description = z
  .string({
    required_error: 'description is required',
    invalid_type_error: 'description must be a string',
  })
  .min(1, 'description is required')

const imagePath = z
  .string({
    required_error: 'imagePath is required',
    invalid_type_error: 'imagePath must be a string',
  })
  .min(1, 'imagePath is required')

export const PatchProductSchema = z.object({
  productId,
  name,
  price,
  description,
  imagePath,
})
