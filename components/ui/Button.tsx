import Link from "next/link"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentPropsWithoutRef, ReactNode } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap tracking-[0.08em] transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-gold/25 bg-gold text-primary shadow-[0_10px_30px_rgba(212,175,55,0.18)] hover:bg-soft-gold hover:border-gold/40",
        outline:
          "border-gold/20 bg-transparent text-text-light hover:border-gold/40 hover:bg-gold/10 hover:text-gold aria-expanded:border-gold/40 aria-expanded:bg-gold/10 aria-expanded:text-gold dark:border-gold/20 dark:bg-transparent dark:hover:bg-gold/10",
        secondary:
          "border border-white/10 bg-white/5 text-text-light hover:border-white/15 hover:bg-white/8 hover:text-gold aria-expanded:border-white/15 aria-expanded:bg-white/8 aria-expanded:text-gold",
        ghost:
          "text-text-muted hover:bg-white/5 hover:text-gold aria-expanded:bg-white/5 aria-expanded:text-gold dark:hover:bg-white/5",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-gold underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-8 gap-1 rounded-lg px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-9 gap-1.5 rounded-lg px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-lg in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-lg in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = ComponentPropsWithoutRef<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants> & {
    children?: ReactNode
    href?: string
    target?: string
    rel?: string
  }

function Button({
  children,
  className,
  variant = "default",
  size = "default",
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }))

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={classes}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
