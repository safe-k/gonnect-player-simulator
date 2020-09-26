# Gonnect Player Simulator

A script I used to simulate multiple player connections to the [Gonnect](https://github.com/seifkamal/gonnect) player server.

## Installation

```shell script
git clone git@github.com:seifkamal/gonnect-player-simulator.git
cd gonnect-player-simulator
npm i
```

## Usage

```shell script
> node client.js -c 5
Client Connected
# ... x5
127.0.0.1: {"id":3,"state":"ready","created_at":"2020-03-16T13:43:52Z","updated_at":"2020-03-16T13:43:52Z"}

Connection Closed
# ... x5
```
