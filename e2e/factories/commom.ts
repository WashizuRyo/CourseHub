const _sequence: Record<string, number> = {}

export const sequence = (name: string) => {
  if (!_sequence[name]) {
    _sequence[name] = 0
  }
  return _sequence[name]++
}
