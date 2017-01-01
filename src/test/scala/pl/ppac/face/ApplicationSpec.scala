package pl.ppac.face

import com.github.tomakehurst.wiremock.client.WireMock._
import pl.ppac.test.IntegrationFlatSpec

class ApplicationSpec extends IntegrationFlatSpec {
  it should "run spring application" in {}

  it should "correctly configure Face API proxy" in {
    // given
    val url = s"face/v1.0/detect?param=false&param2=true"
    val absoluteUrl = s"http://localhost:8080/proxy/$url"
    val headers = Map("Content-Type" -> "application/octet-stream")

    // when
    wireMock.stubFor(post(urlMatching("/face/.*"))
      .willReturn(aResponse().withStatus(200)))

    POST(absoluteUrl, "{}", classOf[String], headers)

    // then
    wireMock.verify(postRequestedFor(urlEqualTo("/" + url))
      .withRequestBody(equalTo("{}"))
      .withHeader("Content-Type", equalTo("application/octet-stream"))
      .withHeader("ocp-apim-subscription-key", equalTo("key-key-key-key"))
      .withQueryParam("param", equalTo("false"))
      .withQueryParam("param2", equalTo("true"))
    )
  }
}
