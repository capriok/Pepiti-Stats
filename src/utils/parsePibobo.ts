export const parsePiboboBlacklistRetardation = (data: any) => {
  function parseEntries(input) {
    const entryRegex = /\[entry(\d+)\]\s+guid = (\S+)\s+until = (\S+)/g
    const matches = input.matchAll(entryRegex)
    const entries: any[] = []

    for (const match of matches) {
      const [_, entry, guid, until] = match
      entries.push({ entry, guid, until })
    }

    return entries
  }

  try {
    return parseEntries(data)
  } catch (error) {}
}
