package pl.ppac.face.filter

import com.netflix.zuul.ZuulFilter
import com.netflix.zuul.context.RequestContext
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class ProjectOxfordAuthFilter extends ZuulFilter {
  @Value("${projectOxford.subscriptionKey}")
  private val subscriptionKey: String = null

  override def filterType(): String = "route"

  override def filterOrder(): Int = 0

  override def shouldFilter(): Boolean = true

  override def run(): AnyRef = {
    RequestContext.getCurrentContext.addZuulRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey)
    null
  }
}