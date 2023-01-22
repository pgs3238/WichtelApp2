package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.User_EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.User_Event;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerPflegen;

import javax.inject.Inject;

public class TeilnehmerPflegen implements ITeilnehmerPflegen {

    @Inject
    User_EventDAO user_eventDAO;

    @Override
    public void teilnehmerAusEventEntfernen(UserTO teilnehmer, EventTO event){
        User_Event user_event = user_eventDAO.findOneResult(teilnehmer, event);
        user_eventDAO.delete(user_event);
    }

    @Override
    public void teilnehmerInEvent(UserTO teilnehmer, EventTO event){
        User_Event user_event = new User_Event(teilnehmer.toUser(), event.toEvent());
        user_eventDAO.save(user_event);
    }
}
