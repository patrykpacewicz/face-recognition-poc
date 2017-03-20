package pl.ppac.test.module

import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.client.WireMock._
import org.scalatest.Suite

trait WireMockSpec { this: Suite =>
  private val port = 8099
  private val mock = new WireMockServer(port)

  def wireMock = mock

  protected def beforeEachWireMock(): Unit = {
    mock.resetMappings()
    mock.resetRequests()
    mock.resetScenarios()
  }

  protected def beforeAllWireMock(): Unit = {
    mock.start()
    configureFor("localhost", port)
  }

  protected def afterAllWireMock(): Unit = {
    mock.stop()
  }
}
