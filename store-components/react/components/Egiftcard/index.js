import React, { useCallback, useEffect, useState } from "react";
import Iframe from "react-iframe";
import { EmptyState, Spinner, Button } from "vtex.styleguide";

import { useRenderSession } from "vtex.session-client";

import "./global.css";

const Egiftcard = () => {
  const [sessionCookie, setSessionCookie] = useState(null);
  const [healthIframe, setHealthIframe] = useState(false);
  const [loadingIframe, setloadingIframe] = useState(false);

  const { loading, session } = useRenderSession();

  // const getCookie = useCallback(cookieName => {
  //   console.log(document.cookie,"lista")
  //   let cookie = {}
  //   document.cookie.split(';').forEach(function (el) {
  //     let [key, value] = el.split('=')
  //     cookie[key.trim()] = value
  //   })
  //   return cookie[cookieName]
  // }, [])

  const getCookie = (name) => {
    console.log(document.cookie, "lista");
    function escape(s) {
      return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
    }
    var match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
    return match ? match[1] : null;
  };

  useEffect(() => {
    console.log("message");
    window.addEventListener("message", (event) => {
      console.log(event.data.isScroll, "message");
      console.log(event.origin, "message");
      if (event.data.isScroll) {
        //isScroll(event.data.isScroll)
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    return () => {
      window.removeEventListener("message");
    };
  }, []);

  useEffect(() => {
    if (session && session?.namespaces?.profile?.isAuthenticated?.value === "false") {
      location.href = "/login?returnUrl=/e-giftcard";
    }
  }, [session]);

  useEffect(() => {
    if (session && session?.namespaces?.profile?.isAuthenticated?.value === "true") {
      const myCookie = getCookie("_ga_M0GBJYGMZ0");
      console.log(myCookie, "cookie out condition");
      if (myCookie !== undefined) {
        console.log(myCookie, "cookie");
        fetch("https://api.egiftcards.qa.walmart.com/health", {
          method: "GET",
          // mode: 'no-cors',
          headers: new Headers({
            "Content-Type": "application/json",
            // "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
          }),
        })
          .then((resp) => resp.json())
          .then((resp) => {
            console.log("health->>", resp);
            if (resp) {
              setSessionCookie(myCookie);
              setHealthIframe(true);
            }
          })
          .catch((error) => {
            console.log("health->>", error);
            setHealthIframe(false);
            setSessionCookie(null);
          })
          .finally(() => setloadingIframe(true));
      } else {
        setHealthIframe(false);
        console.log(myCookie, "cookie else condition");
        console.log(healthIframe, "healthIframe");
      }
    }
  }, [getCookie, session, healthIframe]);

  if (!loadingIframe || loading) {
    return (
      <EmptyState>
        <div className="mv9">
          <span className="t-heading-4">e-giftcard...</span>
          <p>
            <Spinner size={24} />
          </p>
        </div>
      </EmptyState>
    );
  }

  console.log({ healthIframe });

  return (
    <>
      {!healthIframe ? (
        <EmptyState>
          <div className="mv9 felx flex-column">
            <div className="w-100 pa3">
              <img src="/arquivos/conexion_rota.png" />
            </div>
            <div className="w-100 pa3" style={{ color: "black" }}>
              <span className="t-heading-4">Vuelve a intentarlo más tarde.</span>
            </div>
            <div class="w-40 pa3 center">
              <Button href="/tarjetas-de-regalo">Aceptar</Button>
            </div>
          </div>
        </EmptyState>
      ) : (
        <div id="iframeContainer" className="flex flex-column">
          <>
            <a className="flex items-center back-div-landings" href="/tarjetas-de-regalo">
              <span className="mr3">
                <img src="https://walmartcrqa.vtexassets.com/assets/vtex/assets-builder/walmartcrqa.store-theme/1.0.78/tarjeta-de-regalo/arrow_button___bbe975aefcdcdc9f3d441c478d0e2f5c.svg" alt="arrow" className="" crossorigin="anonymous" width="18" />
              </span>
              <p className="back-landings">Regresar</p>
            </a>
          </>

          <Iframe url={`https://customer.egiftcards.qa.walmart.com/egcb2c?_ga_M0GBJYGMZ0=${sessionCookie}&country=CR`} height="720px" id="iframe-consulta-saldo" className="iframe-consulta-saldo" display="initial" position="relative" />
        </div>
      )}
    </>
  );
};

export default Egiftcard;
