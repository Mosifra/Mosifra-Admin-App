import { useEffect, useState } from "preact/hooks"
import { useLocation } from "preact-iso"
import { invoke } from "@tauri-apps/api/core"

export default function CompaniesList() {
  const location = useLocation()
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if (!jwt) location.route("/login")
    const fetchCompanies = async () => {
      await invoke("get_companies", { jwt }).then((companies) => setCompanies(companies))
    }
    fetchCompanies()
  }, [])

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-vert-mosifra">Entreprises</h1>

        </div>
        <div className="flex-1 flex gap-4 mb-5">
          <button
            onClick={() => location.route("/companies/create")}
            className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold"
          >
            Ajouter un compte entreprise
          </button>
          <button
            onClick={() => location.route("/")}
            className="px-6 py-3 bg-beige-mosifra text-vert-mosifra border border-vert-mosifra rounded-lg font-semibold"
          >
            Retour
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-vert-mosifra text-white">
              <tr>
                <th className="p-4 text-left">Login</th>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Courriel</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {companies.map((u) => (
                <tr className="border-b">
                  <td className="p-4">{u.login}</td>
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.mail}</td>
                  <td className="p-4 text-right">
                    <button
                      className="text-red-600 rounded-lg p-2 font-semibold hover:bg-red-600 hover:text-white transition-all"
                    >Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
