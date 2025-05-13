export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-4 text-center text-white text-sm">
      <div className="container mx-auto px-4">TYMUR ROSTORHUIEV ©{currentYear}</div>
    </footer>
  )
}
