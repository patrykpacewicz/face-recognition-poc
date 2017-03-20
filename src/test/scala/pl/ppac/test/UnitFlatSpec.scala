package pl.ppac.test

import org.scalatest._

abstract class UnitFlatSpec
  extends FlatSpec
    with BeforeAndAfter
    with BeforeAndAfterAll
    with BeforeAndAfterEach
    with Matchers