variable "service_port" {
  type = number
}

variable "wakatime_key" {
  type      = string
  sensitive = true
}

variable "wakatime_secret" {
  type      = string
  sensitive = true
}

variable "github_app_id" {
  type      = string
  sensitive = true
}

variable "github_client_id" {
  type      = string
  sensitive = true
}

variable "github_client_secret" {
  type      = string
  sensitive = true
}

variable "github_pem" {
  type      = string
  sensitive = true
}

variable "image" {
  type = string
}

