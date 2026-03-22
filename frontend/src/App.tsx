import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [city, setCity] = useState('')
 
  useEffect(() => {
      if(!city) return

      setLoading(true)
      if (city) {
        setLoading(false)
        // Renderizar el clima
      } else {
        if (error){
          setError('No se pudo obtener el clima para la ciudad ingresada')
        }
      }
  }, [city])
  

  return (
    <>
      
    </>
  )
}

export default App
