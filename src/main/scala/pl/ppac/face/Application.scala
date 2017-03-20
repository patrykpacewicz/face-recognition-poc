package pl.ppac.face

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.netflix.zuul.EnableZuulProxy

@SpringBootApplication
@EnableZuulProxy
class Application

object Application extends App {
  SpringApplication.run(classOf[Application], args: _*)
}