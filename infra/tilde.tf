resource "digitalocean_app" "tilde" {
  spec {
    name   = "tilde"
    region = "fra"

    service {
      name               = "tilde"
      environment_slug   = "node-js"
      instance_size_slug = "basic-xxs"
      run_command        = "npm start"
      http_port          = 3000

      env {
        key   = "WAKATIME_KEY"
        scope = "RUN_TIME"
        value = "$${tilde.WAKATIME_KEY}"
      }

      env {
        key   = "WAKATIME_SECRET"
        scope = "RUN_TIME"
        value = "$${tilde.WAKATIME_SECRET}"
      }

      github {
        repo           = "o0th/tilde"
        branch         = "master"
        deploy_on_push = true
      }

      health_check {
        failure_threshold     = 0
        initial_delay_seconds = 0
        period_seconds        = 0
        success_threshold     = 0
        timeout_seconds       = 0
      }
    }
  }
}
