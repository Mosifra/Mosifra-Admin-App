import { useEffect, useState } from "preact/hooks"
import { useLocation } from "preact-iso"

export default function UniversityList() {
  const location = useLocation()
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")
    if (!jwt) location.route("/login")

    //api fetch
  }, [])

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-vert-mosifra">Universités</h1>


        </div>
        <div className="flex-1 flex gap-4 mb-5">
          <button
            onClick={() => location.route("/universities/create")}
            className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold"
          >
            Ajouter un compte université
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
              {universities.map((u) => (
                <tr className="border-b">
                  <td className="p-4">{u.login}</td>
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.mail}</td>
                  <td className="p-4 text-right">
                    <button
                      // api delete
                      className="text-red-600 font-semibold"
                    >
                      Bouter hors
                    </button>
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
