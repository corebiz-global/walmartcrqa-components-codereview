import axios from 'axios'

const apptividad = async (ctx: any) => {
  let result = ''
  const urlMasterData =
      'https://walmartcrqa.vtexcommercestable.com.br/api/dataentities/AP/search?_fields=datos&_where=id%3Dc0eb263e-daf2-11ec-835d-1287591d61df',
    configMasterData = {
      headers: {
        VtexIdclientAutCookie: ctx.vtex.authToken,
        'Cache-Control': 'no-cache',
        'X-Vtex-Use-Https': true,
      },
    }

  await Promise.resolve(axios.get(urlMasterData, configMasterData)).then(
    ({ data }) => {
      result = data
    }
  )

  let preDecoded: any = result[0]
  let decoded: any = preDecoded.datos
  const decodedRequestBodyString = Buffer.from(decoded, 'base64').toString(
    'binary'
  )
  const decodedRequestBodyArray = decodedRequestBodyString.split(':')

  let response = ''
  const urlGetEmail =
      'https://walmartcaserviciosqa.timetoyes.com/TTYCR/Apptividad.Ozono.Business.Api/BusinessApi.svc/json/GetSSOT',
    config = {
      headers: {
        'content-type': 'application/json',
        Username: decodedRequestBodyArray[0],
        Password: decodedRequestBodyArray[1],
      },
    },
    data = {
      data: {
        ApplicationID: 2147483647,
        DomainHost: 'WALMART',
      },
    }

  await Promise.resolve(axios.post(urlGetEmail, data, config)).then(
    ({ data }) => {
      response = data
    }
  )

  return response
}

export default apptividad
