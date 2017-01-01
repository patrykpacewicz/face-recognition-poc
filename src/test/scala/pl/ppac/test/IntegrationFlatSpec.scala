package pl.ppac.test

import org.scalatest._
import org.scalatest.concurrent.Eventually
import org.springframework.boot.test._
import org.springframework.test.context.{ActiveProfiles, ContextConfiguration, TestExecutionListeners}
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener
import org.springframework.test.context.web.WebAppConfiguration
import pl.ppac.face.Application
import pl.ppac.test.module._

@IntegrationTest
@ActiveProfiles(Array("integration"))
@WebAppConfiguration
@ContextConfiguration(
  classes = Array(classOf[Application]),
  loader = classOf[SpringApplicationContextLoader]
)
@TestExecutionListeners(Array(
  classOf[DependencyInjectionTestExecutionListener]
))
abstract class IntegrationFlatSpec
  extends FlatSpec
    with BeforeAndAfter
    with BeforeAndAfterAll
    with BeforeAndAfterEach
    with Matchers
    with SpringSpec
    with WireMockSpec
    with RestTemplateSpec
    with Eventually {
  override protected def beforeEach(): Unit = {
    super.beforeEach()
    beforeEachWireMock()
  }

  override protected def beforeAll(): Unit = {
    super.beforeAll()
    beforeAllSpring()
    beforeAllWireMock()
  }

  override protected def afterAll(): Unit = {
    super.afterAll()
    afterAllWireMock()
    afterAllSpring()
  }
}