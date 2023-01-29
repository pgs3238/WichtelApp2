package Eventverwaltung.Teilnehmer.usecase;

import javax.ws.rs.core.Response;

public interface ITeilnehmerZuSubgruppe {

    Response TeilnehmerZuSubgruppeHinz(String email, int subgruppeId);

    boolean TeilnehmerAusSubgruppe(String email, int subgruppeId);
}
