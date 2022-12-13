package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.User;

import java.io.Serializable;

public abstract class UserTO implements Serializable {

    int userID;
    String name;
    String vorname;
    String email;
    String passwort;

    public UserTO (int userID, String name, String vorname, String email, String passwort) {
        this.userID = userID;
        this.name = name;
        this.vorname = vorname;
        this.email = email;
        this.passwort = passwort;
    }

    public abstract User toUser();

    public int getUserID() { return userID; }

    public void setUserID(int userID) { this.userID = userID; }

    public String getName() { return  name; }

    public void setName(String name) { this.name = name; }

    public String getVorname() { return  vorname; }

    public void setVorname(String vorname) { this.vorname = vorname; }

    public String getEmail() { return  email; }

    public void setEmail(String email) { this.email = email; }

    public String getPasswort() { return passwort; }

    public void setPasswort(String passwort) { this.passwort = passwort; }


}
