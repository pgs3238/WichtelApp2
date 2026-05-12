package Eventverwaltung.Teilnehmer.entity;

import Eventverwaltung.Teilnehmer.entity.internal.UnregisteredUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.io.Serializable;

public class UnregisteredUserTO implements Serializable {

    @Email(message = "Bitte geben Sie eine gültige E-Mail-Adresse ein.")
    @NotBlank(message = "E-Mail-Adresse darf nicht leer sein.")
    private String email;

    public UnregisteredUserTO() {}

    public UnregisteredUserTO(String email) {
        this.email = email;
    }

    public UnregisteredUser toUnregisteredUser() {
        UnregisteredUser entity = new UnregisteredUser();
        entity.setEmail(this.email);
        return entity;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
