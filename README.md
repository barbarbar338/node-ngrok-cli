# ✨ NGROK CLI made with NodeJS

NGROK CLI app made with NodeJS, easy to download and use.

# 📦 Installation

Run `npm i -g node-ngrok-cli` or `yarn global add node-ngrok-cli`. After running this command, you will be able to use `ngrok` command.

# 🐮 Usage

Run `ngrok` command to see all available commands.

To get help about a command, run:

```bash
$ ngrok <command> --help

# example
$ ngrok serve --help
```

Authenticating:

```bash
$ ngrok auth <auth_token>
```

Starting tunnel:

```bash
$ ngrok serve <port> [...options]
```

# 🔑 `serve` Command Options

| Name      | Type   | Required | Default | Description                                       |
| --------- | ------ | -------- | ------- | ------------------------------------------------- |
| port      | number | ✔️       | -       | port or network address                           |
| proto     | string | ❌       | http    | http, tcp, tls                                    |
| auth      | string | ❌       | -       | http basic authentication for tunnel              |
| subdomain | string | ❌       | -       | reserved tunnel name https://example.ngrok.io     |
| authtoken | string | ❌       | -       | your authtoken from ngrok.com                     |
| region    | string | ❌       | us      | one of ngrok regions (us, eu, au, ap, sa, jp, in) |

Example:

```bash
$ ngrok serve 3000 --region eu --subdomain example
```

# 🧦 Contributing

Fell free to use GitHub's features.
