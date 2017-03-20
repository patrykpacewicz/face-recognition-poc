package pl.ppac.test.module

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import org.scalatest.Suite
import org.springframework.http.{HttpEntity, HttpHeaders, HttpMethod, ResponseEntity}
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestTemplate

import scala.collection.JavaConverters._

trait RestTemplateSpec { this: Suite =>
  private val restTemplate = restTemplateBuilder()

  def GET[T](url: String, responseClass: Class[T], headers: Map[String, String] = Map()): ResponseEntity[T] = {
    val entity = new HttpEntity[String](new LinkedMultiValueMap(headers.mapValues(List(_).asJava).asJava))
    restTemplate.exchange(url, HttpMethod.GET, entity, responseClass)
  }

  def POST[T, M](url: String, request: M, responseClass: Class[T], headers: Map[String, String] = Map()) = {
    val entity = new HttpEntity[M](request, new LinkedMultiValueMap(headers.mapValues(List(_).asJava).asJava))
    restTemplate.exchange(url, HttpMethod.POST, entity, responseClass)
  }

  private def restTemplateBuilder() = {
    val rest: RestTemplate = new RestTemplate()

    rest.getMessageConverters.asScala
      .find(a => a.isInstanceOf[MappingJackson2HttpMessageConverter])
      .map(a => a.asInstanceOf[MappingJackson2HttpMessageConverter])
      .foreach(a => a.setObjectMapper(objectMapper()))

    rest
  }

  private def objectMapper() = {
    new ObjectMapper().registerModule(DefaultScalaModule)
  }
}
