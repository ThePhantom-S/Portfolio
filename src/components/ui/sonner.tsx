
import React from 'react';
import { Toaster as SonnerPrimitive, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerPrimitive>;

// Renamed internal component to avoid confusion, but export name remains Toaster
const InternalSonnerToaster = ({ ...props }: ToasterProps) => {
  // Removed: const { theme = "system" } = useTheme() from "next-themes"

  return (
    <SonnerPrimitive
      // Removed: theme={theme as ToasterProps["theme"]}
      // Sonner will now use its default theme detection (e.g., system preference)
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { InternalSonnerToaster as Toaster, toast };

