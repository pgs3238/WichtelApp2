package Eventverwaltung.Event.usecase;

import Eventverwaltung.Event.entity.SubgruppeTO;

import jakarta.ws.rs.core.Response;

public interface ISubgruppePflegen {
    Response subgruppeAnlegen(SubgruppeTO subgruppeTO);
}

