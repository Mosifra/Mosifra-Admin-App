
import { invoke } from "@tauri-apps/api/core"
import { useState } from "preact/hooks"
import { useLocation } from "preact-iso"

export default function CreateUniversity() {
  const location = useLocation()
  const [login, setLogin] = useState("")
  const [mail, setMail] = useState("")
  const [name, setName] = useState("")
  const [generatedPassword, setGeneratedPassword] = useState("")

  const jwt = sessionStorage.getItem("jwt")
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const password = await invoke("create_university", {
        login,
        mail,
        name,
        jwt,
      })

      setGeneratedPassword(password)

      location.route(`/success?password=${password}&redirect=/universities`)
    } catch {
      setGeneratedPassword("Erreur lors de la récupération du mot de passe")
    }
  }


  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-vert-mosifra mb-10">Ajouter un compte université</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block text-sm font-semibold text-vert-mosifra mb-2">
              Login
            </label>
            <input
              type="text"
              value={login}
              onInput={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vert-mosifra"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-vert-mosifra mb-2">
              Adresse mail
            </label>
            <input
              type="email"
              value={mail}
              onInput={(e) => setMail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vert-mosifra"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-vert-mosifra mb-2">
              Nom de l’université
            </label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vert-mosifra"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => location.route("/universities")}
              className="px-6 py-3 rounded-lg border font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
            >Valider</button>
          </div>
        </form>
      </div>
    </main>
  )
}
