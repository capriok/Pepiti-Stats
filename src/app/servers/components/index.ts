export const processMXBServers = (servers: any) => {
  return Object.keys(servers.servers).map((s) => ({
    ...servers.servers[s],
    serverType: determineServerType(servers.servers[s].name.toLowerCase()),
  }))
}

export const determineServerType = (name: string) => {
  if (name.includes("low sr")) return "pepiti sr"
  if (name.includes("pepiti")) return "pepiti"

  return "global"
}
