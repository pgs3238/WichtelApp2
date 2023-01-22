package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.User;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import java.io.Serializable;

public class UserTO implements Serializable {

    //Integer userID;
    @Length(min = 3)
    String name;
    @Length(min = 3)
    String vorname;
    @Email
    String email;
    @Length(min = 3)
    String passwort;

    public UserTO() {}

    public UserTO(String email){
        this.email = email;
    }

    public UserTO (String name, String vorname, String email, String passwort) {
        this.name = name;
        this.vorname = vorname;
        this.email = email;
        this.passwort = passwort;
    }




    public User toUser() {
        User user = new User();
        user.setName(name);
        user.setVorname(vorname);
        user.setEmail(email);
        user.setPassword(passwort);
        return user;
    }

   /* public int getUserID() { return userID; }

    public void setUserID(int userID) { this.userID = userID; }*/

    public String getName() { return  name; }

    public void setName(String name) { this.name = name; }

    public String getVorname() { return  vorname; }

    public void setVorname(String vorname) { this.vorname = vorname; }

    public String getEmail() { return  email; }

    public void setEmail(String email) { this.email = email; }

    public String getPasswort() { return passwort; }

    public void setPasswort(String passwort) { this.passwort = passwort; }
}
