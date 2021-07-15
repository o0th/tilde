provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_namespace" "this" {
  metadata {
    name = "tilde"
  }
}

resource "kubernetes_secret" "docker" {
  metadata {
    name      = "docker"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = file("${path.module}/secrets/docker-registry.json")
  }
}

resource "kubernetes_deployment" "this" {
  metadata {
    name      = "tilde"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        "app" = "tilde"
      }
    }

    template {
      metadata {
        labels = {
          "app" = "tilde"
        }
      }

      spec {
        container {
          name  = "tilde"
          image = var.image

          image_pull_policy = "Always"

          env {
            name  = "SERVICE_PORT"
            value = var.service_port
          }

          env {
            name  = "WAKATIME_KEY"
            value = var.wakatime_key
          }

          env {
            name  = "WAKATIME_SECRET"
            value = var.wakatime_secret
          }

          env {
            name  = "GITHUB_APP_ID"
            value = var.github_app_id
          }

          env {
            name  = "GITHUB_CLIENT_ID"
            value = var.github_client_id
          }

          env {
            name  = "GITHUB_CLIENT_SECRET"
            value = var.github_client_secret
          }

          env {
            name  = "GITHUB_PEM"
            value = var.github_pem
          }

          port {
            name           = "https"
            container_port = var.service_port
          }
        }

        image_pull_secrets {
          name = kubernetes_secret.docker.metadata[0].name
        }
      }
    }
  }
}

resource "kubernetes_service" "this" {
  metadata {
    name      = "tilde"
    namespace = kubernetes_namespace.this.metadata[0].name

    labels = {
      "app" = "tilde"
    }
  }

  spec {
    selector = {
      "app" = "tilde"
    }

    port {
      name = "https"
      port = var.service_port
    }
  }
}

resource "kubernetes_secret" "cert" {
  metadata {
    name      = "cert"
    namespace = kubernetes_namespace.this.metadata[0].name
  }

  type = "kubernetes.io/tls"

  data = {
    "tls.crt" = file("${path.module}/secrets/tls.crt")
    "tls.key" = file("${path.module}/secrets/tls.key")
  }
}

resource "kubernetes_ingress" "this" {
  wait_for_load_balancer = true

  metadata {
    name      = "tilde"
    namespace = kubernetes_namespace.this.metadata[0].name
    annotations = {
      "kubernetes.io/ingress.class"                 = "public"
      "nginx.ingress.kubernetes.io/proxy-body-size" = "1024m"
    }
  }

  spec {
    tls {
      hosts       = ["tilde.o0th.io"]
      secret_name = kubernetes_secret.cert.metadata[0].name
    }

    rule {
      host = "tilde.o0th.io"
      http {
        path {
          path = "/"
          backend {
            service_name = "tilde"
            service_port = var.service_port
          }
        }
      }
    }
  }
}

