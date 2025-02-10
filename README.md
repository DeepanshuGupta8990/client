<h1 align="center">
    <img align="left" width="100" height="100" src="https://zetafence.com/images/logo.png" alt="Zetafence"/>
    <br />
    <p style="color: #808080; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);">
    Zetafence vFeed UI Server
    </p>
</h1>

<br/>

## vFeed UI Server

Zetafence vFeed is a large dataset of correlated vulnerability and threat intelligence feeds. vFeed API server serves a list of vulnerability URIs (such as `/v1/vuln`) and is implemented using gRPC ORM Protobuf services and Python Flask REST APIs.

## vFeed UI Server Usage

To start UI service on default port using HTTPS, use the following commands:

```
$ yarn install
$ HTTPS=true REACT_APP_SERVER=localhost:7778 yarn dev
```

<br/>Copyright (C)
    <a href="https://zetafence.com">
    <img align="center" width="85" src="https://img.shields.io/badge/Zetafence-8A2BE2" alt="Zetafence"/></a>
2025.
