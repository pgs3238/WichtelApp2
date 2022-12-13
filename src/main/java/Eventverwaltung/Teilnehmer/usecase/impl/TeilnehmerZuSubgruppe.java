package Eventverwaltung.Teilnehmer.usecase.impl;

import Eventverwaltung.Event.dao.User_EventDAO;
import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Event.entity.internal.User_Event;
import Eventverwaltung.Teilnehmer.entity.UserTO;
import Eventverwaltung.Teilnehmer.usecase.ITeilnehmerZuSubgruppe;

import javax.inject.Inject;

public class TeilnehmerZuSubgruppe implements ITeilnehmerZuSubgruppe {

    @Inject
    User_EventDAO user_eventDAO;

    @Override
    public void TeilnehmerZuSubgruppe(UserTO user, EventTO event, SubgruppeTO subgruppe){
        User_Event user_event = user_eventDAO.findOneResult(user,event);

        user_event.setSubgruppe(subgruppe.toSubgruppe());

        user_eventDAO.update(user_event);
    }
}
