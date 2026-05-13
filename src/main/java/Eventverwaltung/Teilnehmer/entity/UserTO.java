package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.User;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.Length;
import java.io.Serializable;

/*
TO for User
Note: TO=Transfer Object
 */
public class UserTO implements Serializable {

    public interface OnCreate {}
    public interface OnPartCreate{}

    @NotBlank(groups = OnCreate.class, message = "Der Name muss zwischen 2 und 60 Zeichen lang sein.")
    @Length(groups = OnCreate.class, min = 2, max = 60, message = "Der Name muss mindestens 2 Zeichen lang sein.")
    String name;
    @NotBlank(groups = OnCreate.class, message = "Der Vorname muss zwischen 2 und 60 Zeichen lang sein.")
    @Length(groups = OnCreate.class, min = 2, max = 60, message = "Der Vorname muss mindestens 2 Zeichen lang sein. ")
    String vorname;
    @NotBlank(
            groups = {OnCreate.class, OnPartCreate.class},
            message = "E-Mail-Adresse muss zwischen 5 und 256 Zeichen lang sein.")
    @Email(
            groups = {OnCreate.class, OnPartCreate.class},
            message = "Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    @Pattern(
            groups = {OnCreate.class, OnPartCreate.class},
            regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
            message = "Bitte eine Email wie bsp: @domaine.com eingeben"
    )
    @Size(
            groups = {OnCreate.class, OnPartCreate.class},
            min = 5, max = 256, message = "E-Mail-Adresse muss zwischen 5 und 256 Zeichen lang sein.")
    String email;
    @NotBlank(groups = OnCreate.class, message = "Das Passwort muss mindestens 5 Zeichen lang sein.")
    @Length(groups = OnCreate.class, min = 5, max = 128, message = "Das Passwort muss mindestens 5 Zeichen lang sein.")
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

    public String getName() { return  name; }

    public void setName(String name) { this.name = name; }

    public String getVorname() { return  vorname; }

    public void setVorname(String vorname) { this.vorname = vorname; }

    public String getEmail() { return  email; }

    public void setEmail(String email) { this.email = email; }

    public String getPasswort() { return passwort; }

    public void setPasswort(String passwort) { this.passwort = passwort; }
}

