"use client"

import { createContext, useContext, useState } from "react"
import { Card } from "~/ui/Card"
import { Button } from "~/ui/Button"
import { X } from "lucide-react"

const OverlayContext = createContext({} as any)
export const useOverlayContext = () => useContext(OverlayContext)

export default function OverlayProvider({ children }) {
  const initialState = {
    open: false,
    render: <></>,
  }
  const [overlay, setOverlay] = useState(initialState)

  const open = (render) => setOverlay({ open: true, render })
  const close = () => setOverlay(initialState)

  return (
    <OverlayContext.Provider value={{ open }}>
      {overlay.open && (
        <div className="fixed left-0 top-0 z-50 hidden lg:flex">
          <div className="bg-black/60" onClick={close}>
            <div className="grid h-[100vh] w-[100vw] place-items-center">
              <Card>
                <div className="my-2 flex justify-end">
                  <Button onClick={close}>
                    <X />
                  </Button>
                </div>
                {overlay.render}
              </Card>
            </div>
          </div>
        </div>
      )}
      {children}
    </OverlayContext.Provider>
  )
}
