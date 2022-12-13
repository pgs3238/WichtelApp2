package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.UserTO;

public interface IRegistrieren {

    public boolean userLoeschen (String email);
    public void userAnlegen(UserTO userTO);
    public void userSpeichern(UserTO userTO);
}
