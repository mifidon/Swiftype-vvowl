# Swiftype-vvowl

Webseite die mit einem authentication token (API-Key) die Bearbeitung von Suchergebnisse ermöglicht.

## 1. Live-Demo

http://35.184.202.150:8080/

### 1.1 Woher bekomme ich einen authentication token bzw. API-Key?

https://app.swiftype.com/settings/account


![API-Key](https://user-images.githubusercontent.com/19534956/50832114-7f42bb00-134d-11e9-9914-abf26a21f4b8.png)



## 2. Installation

### 2.1 Vorraussetzungen

* [Node.js und Node Package Manager](https://www.npmjs.com/get-npm)
* [Die Versionsverwaltung Git](https://git-scm.com/downloads)

### 2.2 Herunterladen und Installation

Das Repository herunterladen und in das Verzeichnis wechseln:

```sh
$ git clone https://github.com/mifidon/Swiftype-vvowl.git
$ cd Swiftype-vvowl
```

Dann können die npm Module heruntergeladen und installiert werden:

```sh
$ npm install
```
Das request package muss zusätzlich installiert werden
```sh
$ npm install request
```
und das express package muss ebenfalls zusätzlich installiert werden.
```sh
$ npm install express
```

### 2.3 Server ausführen

Die Node-Anwendung bauen und einen Server starten

```sh
$ npm run server
```

Danach ist die Anwendung verfügbar unter localhost:8080


## 3. Deploying






