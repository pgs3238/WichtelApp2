package Eventverwaltung.Event.usecase.impl;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.usecase.ITeilnehmerFuerEvent;
import Eventverwaltung.Teilnehmer.dao.UserDAO;
import Eventverwaltung.Teilnehmer.entity.User;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;

public class TeilnehmerFuerEvent implements ITeilnehmerFuerEvent {

    @Inject
    UserDAO userDAO;

    @Override
    public Collection<User> teilnehmerFuerEventId(EventTO event){
        Collection<User> teilnehmer = new ArrayList<>();
        teilnehmer = event.getMitglieder();
        return teilnehmer;
    }
}
