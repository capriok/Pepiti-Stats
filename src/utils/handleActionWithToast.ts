export type ToastMessages = {
    title: string
    msg: string
}

export function handleActionWithToast(actionPromise, messages: ToastMessages, toast) {
    const {title, msg} = messages
    return actionPromise
      .then(() => {
        toast({
          title: title,
          description: msg,
          variant: 'success',
        });
      })
      .catch(() => {
        toast({
          title: 'Uh-oh!',
          description: "There was an error, try again later.",
          variant: 'error',
        });
      });
  }