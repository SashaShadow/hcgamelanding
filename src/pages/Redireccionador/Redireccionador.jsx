import { useEffect } from "react";


const Redireccionador = ({ sitio }) => {

  useEffect(() => {
    let url;

    switch (sitio) {
      case "discord":
        url = "https://discord.gg/eGyrF3TgY8";
        break;
      case "steam":
        url = "https://store.steampowered.com/app/4603230/HEADCUTTER/";
        break;
      default:
        url = "";
    }

    window.location.href = url;
  }, [sitio])

  return (
    <>
    <section id="center">
        <h1 className="rosebud">Redirecting to {sitio}...</h1>
    </section>
  </>
  )
}

export default Redireccionador ;