
import { useState } from "preact/hooks"
import { useLocation } from "preact-iso"

export default function CreateCompany() {
  const location = useLocation()

  const [login, setLogin] = useState("")
  const [mail, setMail] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await (
        invoke('create_company', { login: login, mail: mail, name: name })
      )
    } catch (err) {
      console.log(err)
    }
    location.route("/admin")
  }

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-vert-mosifra mb-10">
          Création d’une entreprise
        </h1>

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
              Nom de l'entreprise
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
              onClick={() => location.route("/")}
              className="px-6 py-3 rounded-lg border font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
