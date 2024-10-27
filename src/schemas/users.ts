import { z } from 'zod'

const name = z
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
    message: 'Name is required',
  })
  .min(1)

const email = z
  .string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
    message: 'Email is required',
  })
  .email({
    message: 'Invalid email',
  })

const userType = z.enum(['COMMON', 'VIP'], { message: 'Invalid user type' })

const vip = z.boolean()

export const CreateUserSchema = z.object({
  name,
  email,
  userType,
})

export const CreateUserFormSchema = z.object({
  name,
  email,
  vip,
})
