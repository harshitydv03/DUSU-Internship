import { useEffect, useState } from 'react'
import apiClient from './apiClient.js'

// Reads a CMS-managed collection for a public page.
// The bundled sample content is used as the initial value and kept if the API
// is unreachable or the collection is empty, so pages never render blank.
export default function useContent(resource, fallback = []) {
  const [items, setItems] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    apiClient
      .get(`/${resource}`)
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) setItems(data)
      })
      .catch(() => {
        // Backend down or errored — keep the bundled fallback.
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [resource])

  return { items, loading }
}
