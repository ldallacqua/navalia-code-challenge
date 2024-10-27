'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { CreateUserFormSchema, CreateUserSchema } from '@/schemas/users'

export function LoginForm() {
  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      email: '',
      name: '',
      vip: false,
    },
  })

  // Create a user in DB
  const { mutate: createUser, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof CreateUserSchema>) => {
      return axios.post('/api/users', data)
    },
    onSuccess: ({ data }) => {
      toast({
        title: 'Success',
        description: 'User created!',
      })
      localStorage.setItem('userId', data?.id)
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      })
    },
  })

  const onSubmit = (data: z.infer<typeof CreateUserFormSchema>) => {
    createUser({
      email: data.email,
      name: data.name,
      userType: data.vip ? 'VIP' : 'COMMON',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Create a User</CardTitle>
            <CardDescription>
              Let&apos;s create a sample user to interact with our cart
              experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="jhondoe@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jhon Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="vip"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>VIP User</FormLabel>
                      <FormDescription>
                        Switch this option to simulate a VIP user
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button disabled={isPending} type="submit" className="w-full">
                Create
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
