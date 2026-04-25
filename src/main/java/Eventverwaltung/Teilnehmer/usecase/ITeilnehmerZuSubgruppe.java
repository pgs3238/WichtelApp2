package Eventverwaltung.Teilnehmer.usecase;

import jakarta.ws.rs.core.Response;

public interface ITeilnehmerZuSubgruppe {

    Response TeilnehmerZuSubgruppeHinz(String email, int subgruppeId);

    boolean TeilnehmerAusSubgruppe(String email, int subgruppeId);
}

