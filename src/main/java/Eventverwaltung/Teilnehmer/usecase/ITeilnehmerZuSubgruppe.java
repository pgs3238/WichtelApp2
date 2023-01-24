package Eventverwaltung.Teilnehmer.usecase;

import Eventverwaltung.Event.entity.EventTO;
import Eventverwaltung.Event.entity.SubgruppeTO;
import Eventverwaltung.Teilnehmer.entity.UserTO;

public interface ITeilnehmerZuSubgruppe {
    void TeilnehmerZuSubgruppe(UserTO user, EventTO event, SubgruppeTO subgruppe);

    boolean TeilnehmerZuSubgruppeHinz(String email, int subgruppeId);

    boolean TeilnehmerAusSubgruppe(String email, int subgruppeId);
}
