package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.SubgruppeTO;

import javax.ws.rs.core.Response;

public interface ISubgruppePflegen {
    Response subgruppeAnlegen(SubgruppeTO subgruppeTO);
}
