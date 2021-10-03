import { BASE_URL } from '@/constants/api'
import { useEffect, useState } from 'react'

export interface ErrorResponse {
  statusCode: number
  message: string
}

export interface FetchResponse<R> {
  data?: R
  loading: boolean
  error?: ErrorResponse
}

function request(
  url: string,
  options: RequestInit,
  timeout = 10000
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    // eslint-disable-next-line promise/param-names
    new Promise<Response>((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), timeout)
    }),
  ])
}

function useFetch<R, P = void>(
  method: 'GET' | 'POST',
  path: string,
  body?: P,
  isReady = true
): FetchResponse<R> {
  const [data, setData] = useState<R>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ErrorResponse>()

  useEffect(() => {
    if (isReady) {
      const headers = new Headers({
        'Content-Type': 'application/json',
      })
      const requestOptions: RequestInit = { method, headers }
      if (body) {
        requestOptions.body = JSON.stringify(body)
      }
      request(`${BASE_URL}/${path}`, requestOptions)
        .then((response) =>
          response.status && response.status >= 200 && response.status < 300
            ? Promise.resolve(response)
            : Promise.reject(response)
        )
        .then((result) => result.json())
        .then((result) => {
          setData(result)
          setLoading(false)
        })
        .catch((responseError) => {
          setLoading(false)
          setError({
            message: responseError.statusText,
            statusCode: responseError.status,
          })
        })
    }
  }, [isReady])
  return { data, loading, error }
}

export default useFetch
