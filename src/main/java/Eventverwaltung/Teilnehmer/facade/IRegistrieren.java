package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.UserTO;

import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

public interface IRegistrieren {

    public boolean userLoeschen (String email);
    public Response userAnlegen(@Valid UserTO userTO);
    public boolean userSpeichern(@Valid UserTO userTO);
}

