terraform {
  backend "remote" {
    organization = "o0th"

    workspaces {
      name = "tilde"
    }
  }

  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "2.8.0"
    }
  }
}

provider "digitalocean" {
  token = var.digitalocean_token
}

