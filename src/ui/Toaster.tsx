"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastData,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./Toast"
import { useToast } from "../components/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, data, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
              {data && <ToastData>{data}</ToastData>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
