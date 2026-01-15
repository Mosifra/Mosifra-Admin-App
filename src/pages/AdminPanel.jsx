import { useEffect } from "preact/hooks"
import { useLocation } from "preact-iso"
import { Building2, Building } from "lucide-preact"

export default function AdminPanel() {
  const location = useLocation()

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt")

    if (!jwt) {
      location.route("/admin/login")
    }
  }, [])

  const goToCreateUniversity = () => {
    location.route("/create/university")
  }

  const goToCreateCompany = () => {
    location.route("/create/company")
  }

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-vert-mosifra mb-12">
          Mosifra – Panel d’administration
        </h1>

        <h2 className="text-3xl font-bold text-vert-mosifra mb-12">
          Créer un compte
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4 text-white">
                <Building2 />
              </div>
              <h2 className="text-2xl font-bold text-vert-mosifra mb-2">
                Créer une université
              </h2>
              <p className="text-gray-600">Créer un compte université</p>
            </div>

            <button
              onClick={goToCreateUniversity}
              className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
            >
              Accéder
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border-l-4 border-vert-mosifra hover:shadow-lg transition-all duration-300">
            <div className="mb-6">
              <div className="w-12 h-12 bg-vert-mosifra rounded-lg flex items-center justify-center mb-4 text-white">
                <Building />
              </div>
              <h2 className="text-2xl font-bold text-vert-mosifra mb-2">
                Créer une entreprise
              </h2>
              <p className="text-gray-600">Créer un compte entreprise</p>
            </div>

            <button
              onClick={goToCreateCompany}
              className="w-full px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
            >
              Accéder
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
