export function forceRefresh() {
  // ? This is a hack to refresh the page at some pages after the action
  // ? The server action works but wont revalidatePath..?
  setTimeout(() => {
    if (typeof window !== "undefined") window.location.reload()
  }, 250)
}
