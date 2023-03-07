import React, { useEffect, useState } from "react";

import "./global.css";

const IframeElectronicCard = () => {
  const [url, setUrl] = useState(true);
  const baseUrl = "https://customer.egiftcards.qa.walmart.com/egcb2c";

  if (baseUrl !== baseUrl) {
    setUrl(false);
  }

  return (
    <div className="content-electronic-card">
      {(baseUrl && url && <iframe className="electronic-card" src={baseUrl}></iframe>) ||
        (!url && (
          <div className="content-electronic-card">
            <img className="img-sin-conexion" src="/arquivos/iframe-sin-conexion.png" />
            <p>Vueva a intentarlo mas tarde</p>
            <a className="landing-btn" href="#">
              Aceptar
            </a>
          </div>
        ))}
    </div>
  );
};

export default IframeElectronicCard;
