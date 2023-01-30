package Eventverwaltung.Teilnehmer.usecase;

import java.util.Map;

public interface IWichtelzuordnung {

    Map<String, String> WichtelLosen(int eventID);

}
