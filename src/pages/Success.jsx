import { useLocation } from "preact-iso"

export default function Success() {
  const location = useLocation()
  const password = location.query.password;
  const redirect = location.query.redirect;

  return (
    <main className="min-h-screen min-w-screen bg-beige-mosifra flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-md text-center max-w-xl">
        <h1 className="text-4xl font-bold text-vert-mosifra mb-6">Création de compte effectuée</h1>

        <p className="mb-4 text-gray-700">Le mot de passe généré pour ce compte est :</p>

        <p className="text-2xl font-mono font-bold mb-8 text-vert-mosifra">
          {password}
        </p>

        <button
          onClick={() => location.route(redirect)}
          className="px-6 py-3 bg-vert-mosifra text-white rounded-lg font-semibold"
        >
          Retourner à la liste
        </button>
      </div>
    </main>
  )
}
