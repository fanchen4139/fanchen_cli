import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../stores"

const Auth: React.FC<React.PropsWithChildren> = React.memo(({ children }) => {
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth)
  const [loading, setLoading] = useState(true)
  console.log(999)
  useEffect(() => {
    const checkAuth = () => {
      if (!auth.isAuthenticated) {
        navigate('/login')
      }
      setLoading(false)
    }

    checkAuth()
  }, [auth.isAuthenticated, navigate])

  if (loading) {
    return (<h1>Loading...</h1>) // 或者你可以使用其他的加载指示器
  }

  return (<>{children}</>)
})

export default Auth
