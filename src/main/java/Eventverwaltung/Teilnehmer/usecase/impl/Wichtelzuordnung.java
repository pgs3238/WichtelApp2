package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.User_EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.internal.User_Event;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.usecase.IWichtelzuordnung;

import javax.inject.Inject;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

public class Wichtelzuordnung implements IWichtelzuordnung{

    @Inject
    User_EventDAO user_eventDAO;

    @Override
    public Map<UserTO,UserTO> WichtelZulosen(EventTO event){
        Collection<User_Event> teilnehmerByEvent = user_eventDAO.findUserEventByEvent(event);
        Collection<User_Event> wichtelListe = user_eventDAO.findUserEventByEvent(event);
        for (User_Event ue: teilnehmerByEvent) {
            Optional<User_Event> neuWichtel = teilnehmerByEvent.stream().skip(new Random().nextInt(teilnehmerByEvent.size())).findFirst();
            if (neuWichtel.get().equals(ue) || neuWichtel.get().getSubgruppe().equals(ue.getSubgruppe())){

            }
        }
        return null;
    }
}
