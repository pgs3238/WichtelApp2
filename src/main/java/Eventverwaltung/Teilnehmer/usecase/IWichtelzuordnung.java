package Eventverwaltung.Teilnehmer.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Teilnehmer.entity.UserTO;

import java.util.Map;

public interface IWichtelzuordnung {

    Map<UserTO,UserTO> WichtelZulosen(EventTO event);
}
