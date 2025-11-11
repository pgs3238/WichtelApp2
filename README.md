# Wichtel App 2.0

>Lore Ipsum yada yada...

---

### Screenshot

---

## 🧭 Goal

bla bla

---

## ⚙️ Features

- 🔐 User-Account Creation
- Event creation and management
- Invite people to join your event
- Set who people can or can not give presents
- Set Event properties
- On day set for partner choosing, partners are automatically set
- Information both in App as well as informed via email. 


---

## 🧰 Technology-Stack

| Area                 | Technology / Version              |
|:---------------------|:----------------------------------|
| **Backend**          | Quarkus `2.13.4`, Gradle `7.5.1`  |
| **Frontend / Build** | React `18.2.0`, Node.js `18.12.1` |
| **Databank**         | PostgreSQL (Docker)               |
| **Language**         | Java `17`, JavaScript             |

**Implemented Quarkus-Addons:**
```gradle
    implementation 'io.quarkus:quarkus-hibernate-orm'
    implementation 'io.quarkus:quarkus-hibernate-validator'
    implementation 'io.quarkus:quarkus-resteasy-reactive-jsonb'
    implementation 'io.quarkus:quarkus-smallrye-openapi'
    implementation 'io.quarkus:quarkus-resteasy-reactive'
    //implementation 'io.quarkus:quarkus-resteasy-mutiny'
    implementation 'io.quarkus:quarkus-security-jpa'
    implementation 'io.quarkus:quarkus-jdbc-postgresql'
    implementation 'io.quarkus:quarkus-arc'
    implementation 'io.quarkus:quarkus-mailer'
```
> 🧪 While folders for test und native-test are present, no tests are implemented at this time.

---

## 🛠️ Installation & Setup
Requirements

- Docker is installed and running
- PostgreSQL is running in a Container
- Java 17, Gradle, Node.js are installed (or are installed via the Build-Script)

Steps
```shell script
#Clone repository
git clone https://github.com/pgs3238/WichtelApp2.git
cd WichtelApp

# Run build (installs Node, npm-dependencies und builds the application)
./gradlew build

# Run the application in dev mode
./gradlew quarkusDev
```
---

## 🚀 Nutzung

1. Anwendung starten
2. Im Browser die Login-Seite öffnen
3. Benutzerkonto anlegen
4. Benutzer anmelden → Cookie wird gesetzt
5. Zugriff auf geschützte Seiten möglich
6. Logout → Cookie wird gelöscht

## ⚠️ Hinweise

> 🔒 Dieses Projekt dient ausschließlich zu Lern- und Demonstrationszwecken.
Die Cookie-basierte Speicherung von Nutzerdaten ist nicht für produktive Umgebungen geeignet.

---

## 🧑‍💻 Author & Contact
| Name                | Contact                                                                                                                                                                |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Paul-Gerhard Siegel | [GitHub](https://github.com/pgs3238) · [LinkedIn](https://www.linkedin.com/in/paul-gerhard-siegel-719a4512/) · [Xing](https://www.xing.com/profile/PaulGerhard_Siegel) |
| Contributers        |                                                                                                                                                                        |


