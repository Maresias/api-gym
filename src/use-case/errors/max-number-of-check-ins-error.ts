export class MaxCheckInsError extends Error {
  constructor() {
    super('Maximum check ins reached')
  }
}
