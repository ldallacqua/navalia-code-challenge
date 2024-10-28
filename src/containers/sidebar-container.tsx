import { LogOut } from 'lucide-react'
import React from 'react'

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
import { CartSidebar } from '@/containers/cart-sidebar'
import { useDeleteUser } from '@/hooks/use-delete-user'

const SidebarContainer = ({ children }: { children: JSX.Element }) => {
  const { mutate: deleteUser, isPending } = useDeleteUser()

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
      <CartSidebar />
    </>
  )
}

export default SidebarContainer
