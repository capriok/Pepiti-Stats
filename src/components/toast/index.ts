import React from "react"
import { dispatch, listeners, memoryState, State, popToast } from "./toast"

type Toast = {
  title: string
  description: string
  variant: "default" | "success" | "warning" | "error"
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

    const incomingToast = !action ? actions.error() : action(args)
    popToast(incomingToast)
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
  default: () => ({
    title: "Uh oh!",
    description: "Something went wrong, try again later",
    variant: "default",
  }),
  error: () => ({
    title: "Oh no!",
    description: "There was an error, please submit a report or contact an admin",
    variant: "error",
  }),
  postRiderReport: () => ({
    title: "Rider Report",
    description: "You have successfully sent a rider report for admins to review",
    variant: "success",
  }),
  dismissRiderReport: () => ({
    title: "Rider Report",
    description: "You have successfully dismissed a rider report",
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
  joinLeague: () => ({
    title: "Join League",
    description: "You have successfully joined this league",
    variant: "success",
  }),
  leaveLeague: () => ({
    title: "Left League",
    description: "You have successfully left this league",
    variant: "warning",
  }),
  joinLeagueRace: () => ({
    title: "Joined League Race",
    description: "You have successfully joined the league race",
    variant: "success",
  }),
  leaveLeagueRace: () => ({
    title: "Left League Race",
    description: "You have successfully left the league race",
    variant: "warning",
  }),
}

export { useToast, actions }
