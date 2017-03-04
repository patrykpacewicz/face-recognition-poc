package pl.ppac.face.config.env.local

import javax.annotation.{PostConstruct, PreDestroy}

import com.github.tomakehurst.wiremock.WireMockServer
import com.github.tomakehurst.wiremock.core.WireMockConfiguration
import com.typesafe.scalalogging.slf4j.LazyLogging
import org.springframework.context.annotation.{Configuration, Profile}

@Configuration
@Profile(Array("local"))
class WireMockConfig extends LazyLogging {
  private val configuration = WireMockConfiguration.options().port(8099).usingFilesUnderClasspath("local-wiremock")
  private val wireMockServer = new WireMockServer(configuration)

  @PostConstruct
  private def startWireMock(): Unit = wireMockServer.start()

  @PreDestroy
  private def stop(): Unit = wireMockServer.stop()
}