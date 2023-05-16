const toFixedIfNecessary = (v) => +parseFloat(v).toFixed(1)
export const renderWithPlusPrefix = (v: number) => {
   return v > 0 ? '+' + toFixedIfNecessary(v) : toFixedIfNecessary(v)
}
