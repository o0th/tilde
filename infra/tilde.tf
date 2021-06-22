resource "digitalocean_app" "tilde" {
  spec {
    name   = "tilde"
    region = "fra"

    env {
      key   = "WAKATIME_KEY"
      scope = "RUN_TIME"
      value = var.wakatime_key
    }

    env {
      key   = "WAKATIME_SECRET"
      scope = "RUN_TIME"
      value = var.wakatime_secret
    }

    env {
      key   = "GITHUB_SECRET"
      scope = "RUN_TIME"
      value = var.github_secret
    }

    env {
      key   = "GITHUB_PEM"
      scope = "RUN_TIME"
      value = var.github_pem
    }

    service {
      name               = "tilde"
      environment_slug   = "node-js"
      instance_size_slug = "basic-xxs"
      run_command        = "npm start"
      http_port          = 3000

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

