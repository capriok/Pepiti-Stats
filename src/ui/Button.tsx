import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import cn from "~/utils/cn"

const buttonVariants = cva(
  "active:scale-95 inline-flex whitespace-nowrap items-center text-[15px] justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-base-200 text-base-200-content shadow hover:bg-base-300",
        primary: "bg-primary text-white shadow-sm hover:bg-primary/80 ",
        warning: "bg-warning text-white shadow-sm hover:bg-warning/80",
        info: "bg-info text-white shadow-sm hover:bg-info/80",
        error: "bg-error text-white shadow-sm hover:bg-error/80",
        outline:
          "border border-accent bg-background shadow-sm hover:bg-base-200 hover:text-accent-foreground",
        ghost: "hover:bg-base-200 hover:text-accent-foreground",
        link: "text-accent underline-offset-4 hover:text-primary",
      },
      size: {
        sm: "h-7 px-4 py-1",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-6 py-3",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
