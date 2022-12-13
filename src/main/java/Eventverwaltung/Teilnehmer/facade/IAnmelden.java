package Eventverwaltung.Teilnehmer.facade;

import Eventverwaltung.Teilnehmer.entity.internal.User;

//@Local
public interface IAnmelden {
    public User findUserByEmail(String email);
}
