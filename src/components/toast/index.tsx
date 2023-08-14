import React from "react"
import { dispatch, listeners, memoryState, State, popToast } from "./toast"

type Toast = {
  title: string
  description: any
  variant: "default" | "success" | "warning" | "error" | "info"
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  const pushToast = (action: (args?: any) => Toast, args?: any) => {
    console.log("%cToast", "color: steelblue", { action, args })

    const cookedToast = !action
      ? actions.default()
      : typeof action !== "function"
      ? actions.error(action)
      : action(args)
    popToast(cookedToast)
  }

  return {
    ...state,
    pushToast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

const actions: {
  [key: string]: (arg?: any) => Toast
} = {
  comingSoon: () => ({
    title: "Unsupported",
    description: "This feature may come soon ™",
    variant: "default",
  }),
  default: () => ({
    title: "Uh oh!",
    description: "Something went wrong, try again later",
    variant: "default",
  }),
  error: (err) => ({
    title: "Oh no!",
    description: "There was an error, more information below",
    data: err.message,
    variant: "error",
  }),
  signedOut: () => ({
    title: "User",
    description: "You have been signed out",
    variant: "info",
  }),
  postRiderReport: () => ({
    title: "Rider Report",
    description: "You have sent a rider report for admins to review",
    variant: "info",
  }),
  dismissRiderReport: () => ({
    title: "Rider Report",
    description: "You have dismissed a rider report",
    variant: "warning",
  }),
  banRider: (name) => ({
    title: "Banned Rider",
    description: `You have banned ${name}`,
    variant: "success",
  }),
  unbanRider: (name) => ({
    title: "Unbanned Rider",
    description: `You have unbanned ${name}`,
    variant: "warning",
  }),
  joinLeague: (name) => ({
    title: "Joined the League",
    description: `You have joined ${name}`,
    variant: "success",
  }),
  leaveLeague: (name) => ({
    title: "Left the League",
    description: `You have left ${name}`,
    variant: "warning",
  }),
  joinLeagueRace: (name) => ({
    title: "Registered for League Race",
    description: `You have joined the race at ${name}`,
    variant: "success",
  }),
  leaveLeagueRace: (name) => ({
    title: "Unregistered for League Race",
    description: `You have left the race at ${name}`,
    variant: "warning",
  }),
}

export { useToast, actions }
