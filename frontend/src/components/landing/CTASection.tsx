import Button from "../Button"

export default function CTASection() {
  return (
    <section className="bg-accent text-snow py-16 px-6 text-center">
      
      <h2 className="text-3xl font-bold mb-4">
        Pronto para explorar?
      </h2>

      <p className="mb-6 text-snow/80">
        Comece agora e descubra tesouros ao seu redor.
      </p>

      <Button 
        text="Explorar mapa"
        route="/map"
        className="bg-dark"
      />

    </section>
  )
}