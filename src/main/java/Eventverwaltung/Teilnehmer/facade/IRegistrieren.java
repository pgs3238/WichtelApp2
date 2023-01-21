package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.UserTO;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.ws.rs.core.Response;

public interface IRegistrieren {

    public boolean userLoeschen (@Positive int nummer);
    public Response userAnlegen(@Valid UserTO userTO);
    public boolean userSpeichern(@Valid UserTO userTO);
}
