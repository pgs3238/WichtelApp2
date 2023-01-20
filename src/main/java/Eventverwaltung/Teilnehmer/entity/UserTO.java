package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.User;

import javax.ws.rs.FormParam;
import java.io.Serializable;

public class UserTO implements Serializable {

    @FormParam("userId")
    Integer userID;
    @FormParam("name")
    String name;
    @FormParam("vorname")
    String vorname;
    @FormParam("email")
    String email;
    @FormParam("passwort")
    String passwort;

    public UserTO (Integer userID, String name, String vorname, String email, String passwort) {
        this.userID = userID;
        this.name = name;
        this.vorname = vorname;
        this.email = email;
        this.passwort = passwort;
    }
    public UserTO() {}

    public User toUser() {
        User user = new User();
        user.setId(userID);
        user.setName(name);
        user.setVorname(vorname);
        user.setEmail(email);
        user.setPassword(passwort);
        return user;
    }

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
