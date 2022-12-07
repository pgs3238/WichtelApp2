package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.User;

public interface IUserFacade {
    public User findUserByEmail(String email);
}
