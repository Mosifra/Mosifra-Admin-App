import { useState } from "preact/hooks"
import { useLocation } from "preact-iso"
import { invoke } from '@tauri-apps/api/core';

export default function AdminLogin() {
  const location = useLocation()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await invoke("login", { attempt: password })

      if (response.success && response.jwt) {
        sessionStorage.setItem("jwt", response.jwt)
        location.route("/")
      } else {
        setError("Mot de passe incorrect")
      }
    } catch (err) {
      setError("Erreur")
      console.error(err)
    }
  }

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-10 border-l-4 border-vert-mosifra">
        <h1 className="text-4xl font-bold text-vert-mosifra mb-8 text-center">
          Mosifra – Authentification Admin
        </h1>

        {error && (
          <p className="text-red-600 mb-4 font-semibold text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onInput={(e) => setPassword((e.target).value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vert-mosifra"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  )
}
