export const handleMMRColor = (mmr: number) => {
   if (mmr > 0) return 'green'
   else if (mmr === 0) return 'orange'
   else return 'red'
}
