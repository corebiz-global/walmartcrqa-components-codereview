import React, { useEffect, useState } from 'react'

import { useDevice } from 'vtex.device-detector'
import { Button, Modal, Spinner } from 'vtex.styleguide'
import { IconArrowBack } from 'vtex.store-icons'

import './global.css'

const CrediWalmart = props => {
  const [showTyC, setShowTyC] = useState(false)

  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [SSOT, setSSOT] = useState(false)
  const [showIframe, setShowIframe] = useState(false)
  const [showError, setShowError] = useState(false)

  //const [fakeLoading, setFakeLoading] = useState(true)
  //const [fakeLoadingBtn, setFakeLoadingBtn] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loadingStore, setLoadingStore] = useState(true)

  const { isMobile } = useDevice()

  useEffect(() => {
    setLoadingStore(false)
  }, [])

  /*useEffect(() => {
    fetch("/apptividad", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setSSOT(result.SSOT);
        runIframeFix();
      })
      .catch((error) => {
        console.warn("error", error);
        setSSOT("error");
      })
      .finally(() => {
        setFakeLoading(false);
        setFakeLoadingBtn(false);
      });
  }, []);*/

  useEffect(() => {
    let loop = setInterval(checkEchoUrl, 45000)

    let contador = 0

    function checkEchoUrl() {
      if (contador < 4) {
        var requestOptions = {
          method: 'GET',
        }

        fetch(
          'https://walmartcaserviciosqa.timetoyes.com/TTYCR/Apptividad.TimeToYes.WebProxy/ServiceProxyJsonP.svc/echo',
          requestOptions
        )
          .then(response => {
            if (!response.ok) {
              contador++
            }
          })
          .catch(error => {
            contador++

            console.log('error', error)
          })
      } else {
        setShowError(true)
        clearInterval(loop)
      }
    }
  }, showError)

  /*useEffect(() => {
    const time = setTimeout(() => {
      setFakeLoadingBtn(false);
    }, 3000);
    return () => clearTimeout(time);
  }, []);*/

  function showIframeF() {
    setShowIframe(!showIframe)
    setOpenModal(!openModal)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function runIframeFix() {
    window.addEventListener('message', captureEvent)

    function captureEvent(pEvent) {
      const IFrame = window.document.getElementById('iframeTTY')

      try {
        switch (pEvent.data.event) {
          case 'onNext':
            setTimeout(() => {
              window.scrollTo({ top: 100, behavior: 'smooth' })
            }, 500)
            setTimeout(() => {
              IFrame.scrollTo({ top: 0, behavior: 'smooth' })
            }, 500)
            break
          case 'onPreview':
            setTimeout(() => {
              window.scrollTo({ top: 100, behavior: 'smooth' })
            }, 500)
            setTimeout(() => {
              IFrame.scrollTo({ top: 0, behavior: 'smooth' })
            }, 500)
            break
        }
      } catch (vEx) {
        console.error('Ocurrio un error en captureEvent:', vEx.message)
      }
    }
  }

  function handleClick() {
    setLoading(true)
    setLoadingStore(true)
    fetch('/apptividad', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result)
        setSSOT(result.SSOT)
        setLoadingStore(false)
        runIframeFix()
        setLoading(false)
      })
      .catch(error => {
        setLoadingStore(false)
        setSSOT('error')
      })
      .finally(() => {
        setOpenModal(!openModal)
        setLoadingStore(false)
      })
  }

  return (
    <div className="crediwalmart-container">
      <div
        className={!showIframe ? 'crediwalmart-info' : 'crediwalmart-info-hide'}
      >
        <div className={isMobile ? 'hide' : 'show'}>
          <img
            src="https://walmartcrqa.vteximg.com.br/arquivos/crediwalmart-banner.jpg"
            alt=""
            className="crediwalmart-banner"
            crossorigin="anonymous"
          />
        </div>

        <div className={isMobile ? 'show' : 'hide'}>
          <img
            src="https://walmartcrqa.vteximg.com.br/arquivos/crediwalmart-banner-mobile.jpg"
            alt=""
            className="crediwalmart-banner"
            crossorigin="anonymous"
          />
        </div>

        <div>
          <p className="crediwalmart-banner-title">Financiamiento</p>
          <p className="crediwalmart-banner-description">
            Ahora podés solicitar tu crédito de forma rapida, segura y desde la
            comodidad de tu hogar o cualquier otro lugar para adquirir lo que
            necesitas en Walmart.
          </p>
        </div>

        {!loadingStore && (
          <div className="crediwalmart-button-container">
            <button
              className={'crediwalmart-button'}
              onClick={() => {
                handleClick()
              }}
            >
              Solicitalo aquí
            </button>
          </div>
        )}

        {loadingStore && (
          <div className="crediwalmart-button-container">
            <button className="crediwalmart-button-disabled">
              <Spinner size={20} />
            </button>
          </div>
        )}

        {loadingStore && (
          <div className="crediwalmart-button-container">Espere un momento</div>
        )}

        <div
          className={isMobile ? 'crediwalmart-grid-1' : 'crediwalmart-grid-2'}
        >
          <div className="crediwalmart-grid-item">
            <div className="crediwalmart-grid-title">
              <div>
                <img
                  src="https://walmartcrqa.vtexassets.com/assets/vtex/assets-builder/walmartcrqa.store-theme/1.0.125/tarjeta-de-credito/icon_requisitos___c44e1b33b61c7b01acf1d2d0d67219e2.svg"
                  alt=""
                  class="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--financiamiento-item-icono"
                  crossorigin="anonymous"
                />
              </div>
              <div>
                <p className="crediwalmart-grid-paragraph">Requisitos</p>
              </div>
            </div>
            <div>
              <p className="crediwalmart-grid-p">• Mayor a 18 años</p>
              <p className="crediwalmart-grid-p">• Plazo: hasta 60 meses</p>
              <p className="crediwalmart-grid-p">• Tasa regulada BCCR</p>
              <p className="crediwalmart-grid-p">
                • Comprobante de ingresos (salarial o independiente)
              </p>
            </div>
          </div>
          <div className="crediwalmart-grid-item">
            <div className="crediwalmart-grid-title">
              <div>
                <img
                  src="https://walmartcrqa.vtexassets.com/assets/vtex/assets-builder/walmartcrqa.store-theme/1.0.125/Financiamiento/icon_articulos___870ebfea2fa103d287483765ddc5e277.svg"
                  alt=""
                  class="vtex-store-components-3-x-imageElement vtex-store-components-3-x-imageElement--financiamiento-item-icono"
                  crossorigin="anonymous"
                />
              </div>
              <div>
                <p className="crediwalmart-grid-paragraph">
                  ¿Qué artículos puedo adquirir?
                </p>
              </div>
            </div>
            <div>
              <p className="crediwalmart-grid-p">
                Podés adquirir desde Pantallas, Computadoras e Impresoras,
                Equipos de Sonido, Video, Celulares, Línea Blanca,
                Electrodomésticos, Muebles, Camas, Colchones, Bicicletas,
                Llantas entre otros.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p
            className="crediwalmart-banner-title"
            style={{ marginBottom: '20px' }}
          >
            Reglamento
          </p>
        </div>

        <div
          className="crediwalmart-tyc-header"
          onClick={() => {
            setShowTyC(!showTyC)
          }}
        >
          <div>
            <p className="crediwalmart-tyc-title">Términos y Condiciones</p>
          </div>
          <div>
            <svg
              fill="none"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              class=" vtex-store-icons-0-x-caretIcon"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#nav-caret--down"></use>
            </svg>
          </div>
          <div
            className={
              showTyC
                ? 'crediwalmart-tyc-content crediwalmart-tyc-content-show'
                : 'crediwalmart-tyc-content'
            }
          >
            <p className="crediwalmart-tyc-p">
              • El cliente acepta que en caso de ingresar a la opción de
              CrediWalmart compartirá la información brindada con entidades
              financieras tercerizadas con el fin de poder analizar y poder
              brindar el crédito al cliente.
            </p>
            <p className="crediwalmart-tyc-p">
              • Time to yes (Apptividad) es el responsable directo y garantizará
              el cumplimiento de las obligaciones que se encuentran previstas en
              la Ley establecidas en cada país para las gestiones de
              financiamiento y será el único responsable por los permisos,
              autorizaciones, licencias o demás requisitos necesarios en cada
              país donde aplique para la prestación de este servicio. Time to
              yes (Apptividad) releva a Walmart de cualquier responsabilidad
              civil, comercial, penal, laboral o de cualquier otra índole que
              pudiese surgir con ocasión de la prestación del servicio de
              financiamiento contratado, asumiendo Time to yes (Apptividad)
              totalmente la responsabilidad, incluyendo la pecuniaria, derivada
              de todos los actos relacionados con la prestación del servicio,
              respecto de cualquier queja, demanda, acción, multa o
              procedimiento que se pudiere intentar en su contra con motivo de
              lo anterior. Time to yes (Apptividad) acepta y reconoce que
              Walmart únicamente pone a disposición una plataforma de acceso a
              sus clientes para optar por el servicio de auto financiamiento.
            </p>
          </div>
        </div>
      </div>

      {openModal && (
        <div
          className="modal-container"
          onClick={() => setOpenModal(!openModal)}
        >
          <div className="modal-body">
            <>
              <div className="flex justify-content relative pv5 pv6-ns pl6 pr8 pl8-ns vtex-styleguide-9-x-shadowTransition">
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenModal(!openModal)}
                >
                  <IconArrowBack size={20} />
                </span>
              </div>

              <div className="ph6 ph8-ns overflow-auto flex-shrink-1 flex-grow-1 pb8  vtex-styleguide-9-x-scrollBar modal">
                <p className="modalText">
                  Serás redirigido a una plataforma externa segura propiedad de
                  Time to yes (Apptividad), la cuál recolectará los datos que
                  suministres para gestionar el trámite de micrócreditos.
                </p>
                <div style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => {
                      showIframeF()
                    }}
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </>
          </div>
        </div>
      )}

      {SSOT && (
        <div className="iFrameContainer">
          <>
            {SSOT && (
              <div>
                {SSOT == 'error' && (
                  <div>
                    <h1 className="tc">
                      Estamos teniendo un problema de comunicación, inténtalo de
                      nuevo.
                    </h1>
                  </div>
                )}

                {SSOT != 'error' && (
                  <div
                    style={{ margin: 'auto' }}
                    className={showIframe ? 'show-iframe' : 'hidde-iframe'}
                  >
                    <div
                      className={
                        showError
                          ? 'iframe-error-window iframe-error-window-show'
                          : 'iframe-error-window'
                      }
                    >
                      <div className="iframe-error-window-body">
                        <img src="https://frqa--walmartcr.vtexassets.com/arquivos/conexion_rota.png" />
                        <p>Vuelve a intentarlo más tarde.</p>
                        <Button
                          variation="primary"
                          onClick={() => {
                            location.reload()
                          }}
                        >
                          Aceptar
                        </Button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src="/arquivos/logo-CrediwalmartArtboard-15@2x.png"
                        style={{ maxWidth: '300px' }}
                      />
                    </div>
                    <iframe
                      style={{ width: '100%', height: '700px' }}
                      id="iframeTTY"
                      allowFullScreen="true"
                      frameBorder="0"
                      allow="camera"
                      src={`https://walmartcaqa.timetoyes.com/?showHeader=true&showWhatsAPP=true&pSSOT=${SSOT}`}
                      width="100%"
                    />
                  </div>
                )}
              </div>
            )}
            {!SSOT && (
              <div>
                {showIframe && !showError && (
                  <div class="flex items-center justify-center w-100 pv4">
                    <svg
                      className="vtex-styleguide-9-x-rotate vtex__icon-spinner tc"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="xMidYMid"
                      height="20"
                      width="20"
                    >
                      <circle
                        className="vtex-spinner_circle"
                        cx="50"
                        cy="50"
                        fill="none"
                        r="40"
                        stroke="#1a75cf"
                        strokeWidth="10"
                        strokeDasharray="0 0 163.36281798666926 251.32741228718345"
                        strokeLinecap="round"
                        strokeDashoffset="1"
                      ></circle>
                    </svg>
                  </div>
                )}
                {showIframe && showError && (
                  <div className="iframe-error-window iframe-error-window-show">
                    <div className="iframe-error-window-body">
                      <img src="https://frqa--walmartcrqa.vtexassets.com/arquivos/conexion_rota.png" />
                      <p>Vuelve a intentarlo más tarde.</p>
                      <Button
                        variation="primary"
                        onClick={() => {
                          location.reload()
                        }}
                      >
                        Aceptar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      )}
    </div>
  )
}

export default CrediWalmart
