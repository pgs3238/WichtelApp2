package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.User;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
//import jakarta.validation.constraints.Email;
import java.io.Serializable;

//TODO clean up unused getters and setters - constraint email needs to be modified with a regex
// new jakarta constraint does not work with quarkus 2.x
// create branch, test what happens if upgrading project to quarkus 3.x

/*
TO for User
Note: TO=Transfer Object
 */
public class UserTO implements Serializable {

    //Integer userID;
    @NotNull(message = "Der Name muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "Der Name muss zwischen 5 und 256 Zeichen lang sein.")
    @Length(min = 2, max = 60, message = "Der Name muss mindestens 2  Zeichen lang sein.")
    String name;
    @NotNull(message = "Der Vorname muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "Der Vorname muss zwischen 5 und 256 Zeichen lang sein.")
    @Length(min = 2, max = 50, message = "Der Vorname muss mindestens 2 Zeichen lang sein. ")
    String vorname;
    @NotNull(message = "E-Mail-Adresse muss zwischen 5 und 256 Zeichen lang sein.")
    @NotBlank(message = "E-Mail-Adresse muss zwischen 5 und 256 Zeichen lang sein.")
    @Email(message = "Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    @Size(min = 5, max = 256, message = "E-Mail-Adresse muss zwischen 5 und 256 Zeichen lang sein.")
    String email;
    @NotNull(message = "Das Passwort muss mindestens 5 Zeichen lang sein.")
    @NotBlank(message = "Das Passwort muss mindestens 5 Zeichen lang sein.")
    @Length(min = 5, max = 128, message = "Das Passwort muss mindestens 5 Zeichen lang sein.")
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
