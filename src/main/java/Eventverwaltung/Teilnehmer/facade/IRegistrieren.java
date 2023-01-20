package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.UserTO;

public interface IRegistrieren {

    public boolean userLoeschen (int nummer);
    public boolean userAnlegen(UserTO userTO);
    public boolean userSpeichern(UserTO userTO);
}
