type Ok<T> = { ok: true, data: T }
type Error_ = { ok: false, error: unknown }
type Result<T> = Ok<T> | Error_

export async function tryCatch<T>(operation: () => Promise<T>): Promise<Result<T>> {
  try {
    const data = await operation()
    return { ok: true, data }
  }
  catch (error) {
    return { ok: false, error }
  }
}
