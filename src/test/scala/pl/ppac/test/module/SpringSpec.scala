package pl.ppac.test.module

import org.scalatest.Suite
import org.springframework.test.context.TestContextManager

trait SpringSpec { this: Suite =>

  private val testContextManager: TestContextManager = new TestContextManager(this.getClass)

  protected def beforeAllSpring(): Unit = {
    testContextManager.beforeTestClass()
    testContextManager.prepareTestInstance(this)
  }

  protected def afterAllSpring(): Unit = {
    testContextManager.afterTestClass()
  }
}
