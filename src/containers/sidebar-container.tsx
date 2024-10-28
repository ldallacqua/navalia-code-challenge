import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { AppSidebar } from '@/components/app-sidebar'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { toast } from '@/hooks/use-toast'
import api from '@/utils/axios-instance'

const SidebarContainer = ({ children }: { children: JSX.Element }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: () => {
      return api.delete('/users')
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User deleted!',
      })
      localStorage.removeItem('userId')
      queryClient.removeQueries()
      router.replace('/')
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      })
    },
  })

  const handleDeleteUser = () => {
    deleteUser()
  }

  return (
    <>
      <SidebarInset>
        <header className="flex items-center justify-between gap-2 border-b p-3">
          <div className="scroll-m-20 text-2xl font-bold tracking-tight">
            Navalia Cart
          </div>
          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <LogOut />
                  <span className="sr-only">Log Out</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to log out?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete this user account, feel free to create
                    another one.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPending}
                    onClick={handleDeleteUser}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <SidebarTrigger className="-mr-1 ml-auto" />
          </div>
        </header>
        {children}
      </SidebarInset>
      <AppSidebar />
    </>
  )
}

export default SidebarContainer
